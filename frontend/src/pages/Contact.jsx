import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { offerings } from '../data/offerings.js'

const ADDRESS = 'WeWork Futura, Magarpatta Road, Kirtane Baugh, Magarpatta, Hadapsar, Pune, Maharashtra 411028, India'
// Google Maps embed (no API key required)
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`

const initial = { name: '', email: '', company: '', interest: 'Physical Hazard', message: '' }

// Web3Forms access key (override locally with VITE_WEB3FORMS_KEY in a .env file)
const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || '6b578877-1a2a-41e8-ba7c-3176643084a0'

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setStatus({ state: 'sending', msg: '' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New SustainAtlas enquiry: ${form.interest} — ${form.name}`,
          from_name: 'SustainAtlas Website',
          name: form.name,
          email: form.email,
          company: form.company || '—',
          interest: form.interest,
          message: form.message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!data.success) throw new Error(data.message || 'Something went wrong. Please try again.')
      setStatus({ state: 'success', msg: 'Thanks — your enquiry has been sent. We’ll be in touch shortly.' })
      setForm(initial)
    } catch (err) {
      setStatus({ state: 'error', msg: err.message || 'Could not send your enquiry. Please email connect@sustainatlas.com directly.' })
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        breadcrumb="Contact"
        title="Contact SustainAtlas"
        lead="Tell us about your portfolio, project or reporting need — we’ll get back to you quickly."
      />

      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'start', gap: 36 }}>
          {/* Form */}
          <div className="card">
            <h3>Send an enquiry</h3>
            {status.state === 'success' && <div className="alert alert-success">{status.msg}</div>}
            {status.state === 'error' && <div className="alert alert-error">{status.msg}</div>}

            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="name">Full name *</label>
                <input id="name" required value={form.name} onChange={set('name')} placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label htmlFor="email">Work email *</label>
                <input id="email" type="email" required value={form.email} onChange={set('email')} placeholder="jane@company.com" />
              </div>
              <div className="field">
                <label htmlFor="company">Company</label>
                <input id="company" value={form.company} onChange={set('company')} placeholder="Company name" />
              </div>
              <div className="field">
                <label htmlFor="interest">I'm interested in</label>
                <select id="interest" value={form.interest} onChange={set('interest')}>
                  <option>Consultancy</option>
                  {offerings.filter((o) => o.type === 'Product').map((o) => (
                    <option key={o.slug}>{o.title}</option>
                  ))}
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Message *</label>
                <textarea id="message" required value={form.message} onChange={set('message')} placeholder="Tell us a little about what you need…" />
              </div>
              <button className="btn btn-primary" type="submit" disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
              <p className="form-note" style={{ marginTop: 12 }}>
                Prefer email? Write to{' '}
                <a href="mailto:connect@sustainatlas.com">connect@sustainatlas.com</a>.
              </p>
            </form>
          </div>

          {/* Address + Map */}
          <div>
            <h3>Visit or write to us</h3>
            <p style={{ marginBottom: 6 }}><strong>Email</strong></p>
            <p style={{ marginTop: 0 }}><a href="mailto:connect@sustainatlas.com">connect@sustainatlas.com</a></p>

            <p style={{ marginBottom: 6 }}><strong>Office</strong></p>
            <p style={{ marginTop: 0 }}>
              WeWork Futura, Magarpatta Road,<br />
              Kirtane Baugh, Magarpatta, Hadapsar,<br />
              Pune, Maharashtra 411028, India
            </p>

            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <iframe
                title="SustainAtlas office location"
                src={MAP_SRC}
                width="100%"
                height="320"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="form-note" style={{ marginTop: 10 }}>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">
                Open in Google Maps →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
