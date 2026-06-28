# SustainAtlas — Charting Climate-Smart Investment

A React (Vite) website with a Python (FastAPI) backend for SustainAtlas — covering
consultancy plus a suite of climate & sustainability data products: Geospatial Dataset,
the Portfolio Risk Atlas (Physical, Technological & Geopolitical risk), Carbon Scope 1/2/3,
SFDR & EU/US regulatory reporting, and Carbon Trading & Offset.

Design follows a clean, Claude.ai-style white theme using the SustainAtlas brand
(blue `#1A3FD6`, teal `#00A798`).

---

## Project structure

```
SustainAtlas/
├── Logo/                     # Source brand assets (logo + tagline lockup)
├── frontend/                 # Vite + React app
│   ├── public/               # logo.svg, logo.png, thumbnail.svg, thumbnail.png
│   └── src/
│       ├── components/       # Navbar, Footer, PageHeader
│       ├── data/             # offerings, 31 hazards, sample asset dataset + scoring
│       ├── pages/            # Home, Consultancy, Products, 6 product pages, Contact
│       └── styles/theme.css  # Claude.ai-style white theme + brand tokens
└── backend/                  # FastAPI enquiry-email service
    ├── app.py
    ├── requirements.txt
    └── .env.example
```

---

## 1) Run the frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Build for production:

```bash
npm run build      # outputs to frontend/dist
npm run preview
```

The dev server proxies `/api/*` to the backend at `http://localhost:8000`
(see `vite.config.js`), so the contact form works locally with both running.

---

> **Email delivery:** the contact form now submits directly to **Web3Forms**
> (client-side, no server required). Set your recipient inbox in the Web3Forms
> dashboard, and optionally override the key with `VITE_WEB3FORMS_KEY` in
> `frontend/.env`. The Python backend below is now **optional**.

## 2) Optional backend (alternative enquiry email path)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # then fill in SMTP credentials
uvicorn app:app --reload --port 8000
```

Endpoints:

- `GET  /api/health`  — status + whether running in dry-run mode
- `POST /api/enquiry` — `{ name, email, company, interest, message }` → emails `connect@sustainatlas.com`

### Email configuration

Edit `backend/.env`:

| Variable | Purpose |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USE_TLS` | Your SMTP server (e.g. Gmail `smtp.gmail.com:587`) |
| `SMTP_USER`, `SMTP_PASSWORD` | SMTP login (Gmail: use an **App Password**) |
| `MAIL_FROM` | Sender address shown on the email |
| `MAIL_TO` | Recipient — defaults to `connect@sustainatlas.com` |
| `ALLOWED_ORIGINS` | Comma-separated frontend origins for CORS |

**Dry-run mode:** if `SMTP_USER`/`SMTP_PASSWORD` are blank, the API still accepts
submissions and logs them to the console instead of sending — handy for local dev.
Fill in credentials to deliver real email. The submitter's address is set as
`Reply-To`, so you can reply directly from your inbox.

---

## Highlights

- **Portfolio Risk Atlas** (`/products/portfolio-risk-atlas`) — one page unifying Physical,
  Technological and Geopolitical risk. Includes an interactive Leaflet world map for physical
  risk: filter by hazard (all 31, with limited-availability ones marked `*`), climate scenario,
  time horizon (2024–2100), issuer, country, GICS® sub-industry and activity. Each asset
  is scored and colour-coded:

  **Hazard Risk Score = Physical Risk × Vulnerability × Exposure**

  Adds Technological and Geopolitical risk taxonomies, a shared risk-scoring framework, and
  sections on how the three risks reshape future portfolios and their socio-economic impact
  for retail clients. The old `/products/physical-hazard` and `/products/technology-hazard`
  routes redirect here. Worked examples included (Microsoft data centre in Pune, Google in
  Visakhapatnam).
- **Carbon Scope 1/2/3** — GHG-Protocol methodologies and where the data is used on the
  path to net zero.
- **SFDR & Regulatory** — EU/US frameworks, the 18 PAI indicators and the capture →
  validate → template → submit workflow.
- **Contact** — enquiry form wired to the Python backend, with the Pune office address
  pinned via a Google Maps embed (no API key required).

> The hazard dataset is realistic **sample data** for demonstration. Replace the contents
> of `frontend/src/data/assets.js` with your production dataset to go live.
