"""
SustainAtlas - enquiry email backend (FastAPI).

Receives contact-form submissions from the React frontend at POST /api/enquiry
and emails them to connect@sustainatlas.com via SMTP.

Run:
    pip install -r requirements.txt
    cp .env.example .env   # then fill in your SMTP credentials
    uvicorn app:app --reload --port 8000
"""

from __future__ import annotations

import os
import smtplib
import ssl
from email.message import EmailMessage
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

# ---------------------------------------------------------------------------
# Configuration (from environment / .env)
# ---------------------------------------------------------------------------
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER or "no-reply@sustainatlas.com")
MAIL_TO = os.getenv("MAIL_TO", "connect@sustainatlas.com")
CONTACT_EMAIL = "connect@sustainatlas.com"

# Comma-separated list of allowed origins for CORS
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")

# If no SMTP credentials are configured, run in "dry-run" mode: the endpoint
# still works and logs the message instead of failing - handy for local dev.
DRY_RUN = not (SMTP_USER and SMTP_PASSWORD)

app = FastAPI(title="SustainAtlas Enquiry API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Schema
# ---------------------------------------------------------------------------
class Enquiry(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: str = Field("", max_length=160)
    interest: str = Field("General", max_length=120)
    message: str = Field(..., min_length=1, max_length=5000)


# ---------------------------------------------------------------------------
# Email helpers
# ---------------------------------------------------------------------------
def build_message(enq: Enquiry) -> EmailMessage:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    msg = EmailMessage()
    msg["Subject"] = f"[SustainAtlas Enquiry] {enq.interest} - {enq.name}"
    msg["From"] = MAIL_FROM
    msg["To"] = MAIL_TO
    msg["Reply-To"] = enq.email

    text = (
        "New enquiry from the SustainAtlas website\n"
        + ("-" * 44)
        + "\n"
        + f"Name:     {enq.name}\n"
        + f"Email:    {enq.email}\n"
        + f"Company:  {enq.company or '-'}\n"
        + f"Interest: {enq.interest}\n"
        + f"Received: {ts}\n\n"
        + f"Message:\n{enq.message}\n"
    )
    msg.set_content(text)

    company = enq.company or "-"
    html = (
        '<div style="font-family:Inter,Arial,sans-serif;color:#1f1e1c;max-width:560px">'
        '<h2 style="color:#1A3FD6;margin:0 0 4px">New SustainAtlas enquiry</h2>'
        f'<p style="color:#6b6a67;margin:0 0 16px">{ts}</p>'
        '<table style="border-collapse:collapse;width:100%;font-size:14px">'
        f'<tr><td style="padding:6px 10px;background:#f6f6f4"><b>Name</b></td><td style="padding:6px 10px">{enq.name}</td></tr>'
        f'<tr><td style="padding:6px 10px;background:#f6f6f4"><b>Email</b></td><td style="padding:6px 10px"><a href="mailto:{enq.email}">{enq.email}</a></td></tr>'
        f'<tr><td style="padding:6px 10px;background:#f6f6f4"><b>Company</b></td><td style="padding:6px 10px">{company}</td></tr>'
        f'<tr><td style="padding:6px 10px;background:#f6f6f4"><b>Interest</b></td><td style="padding:6px 10px">{enq.interest}</td></tr>'
        "</table>"
        '<p style="margin:16px 0 4px"><b>Message</b></p>'
        f'<p style="white-space:pre-wrap;background:#faf9f7;border:1px solid #ececec;border-radius:8px;padding:12px">{enq.message}</p>'
        "</div>"
    )
    msg.add_alternative(html, subtype="html")
    return msg


def send_email(msg: EmailMessage) -> None:
    if SMTP_USE_TLS:
        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
            server.starttls(context=context)
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
    else:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.get("/api/health")
def health():
    return {"status": "ok", "dry_run": DRY_RUN, "mail_to": MAIL_TO}


@app.post("/api/enquiry")
def create_enquiry(enq: Enquiry):
    msg = build_message(enq)

    if DRY_RUN:
        # No SMTP configured - log instead of failing so the form still works.
        print("=" * 60)
        print("DRY RUN - SMTP not configured. Enquiry would be emailed to", MAIL_TO)
        print("Subject:", msg["Subject"], "| Reply-To:", enq.email)
        print(f"From {enq.name} | {enq.company or '-'} | {enq.interest}")
        print(enq.message)
        print("=" * 60)
        return {
            "ok": True,
            "message": "Thanks - your enquiry has been received. (Server in dry-run mode: configure SMTP to deliver email.)",
        }

    try:
        send_email(msg)
    except Exception as exc:  # noqa: BLE001
        detail = "We could not send your enquiry right now. Please email " + CONTACT_EMAIL + " directly."
        raise HTTPException(status_code=502, detail=detail) from exc

    return {"ok": True, "message": "Thanks - your enquiry has been sent. We will be in touch shortly."}
