import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

export default function CarbonTrading() {
  return (
    <>
      <PageHeader
        eyebrow="Product · Markets"
        breadcrumb="Products / Carbon Trading & Offset"
        title="Carbon Trading & Offset"
        lead="Quantify residual emissions, source high-integrity offsets, and manage trading and retirement to move your organisation toward verified carbon compliance."
      />

      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">The flow</span>
            <h2>Reduce first, then offset what remains</h2>
            <p>
              Offsetting is the last step, not the first. After Scope 1·2·3 measurement and reduction,
              we quantify your residual footprint and help you neutralise it with credible credits —
              tracked through to retirement so your claims hold up.
            </p>
            <ul className="feature-list">
              <li>Residual-emissions quantification from your carbon inventory</li>
              <li>Compliance markets (EU ETS, UK ETS) and voluntary markets</li>
              <li>Credit screening for additionality, permanence &amp; verification standard</li>
              <li>Portfolio construction across avoidance &amp; removal credits</li>
              <li>Retirement tracking &amp; registry reconciliation for audit-proof claims</li>
            </ul>
          </div>
          <div className="formula" style={{ alignSelf: 'center' }}>
            Offsets&nbsp;Required ={' '}
            <span className="blue">Residual&nbsp;Emissions</span>
            <br /><span style={{ fontSize: '0.85rem', opacity: 0.85 }}>= Gross&nbsp;Emissions − Verified&nbsp;Reductions</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Credit quality</span>
          <h2>What we screen for</h2>
          <div className="grid grid-4" style={{ marginTop: 22 }}>
            {[
              ['➕', 'Additionality', 'The reduction would not have happened without the credit revenue.'],
              ['🔒', 'Permanence', 'Low reversal risk, with buffer pools for removal projects.'],
              ['✅', 'Verification', 'Issued under recognised standards (Verra, Gold Standard, ART).'],
              ['👁️', 'No double-count', 'Corresponding adjustments and registry-tracked retirement.'],
            ].map(([i, t, d]) => (
              <div className="card" key={t}><div className="chip teal">{i}</div><h3>{t}</h3><p style={{ marginBottom: 0 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="container" style={{ maxWidth: 640 }}>
          <h2>Get to verified carbon compliance</h2>
          <p className="muted">From residual footprint to retired credits — managed end to end.</p>
          <Link to="/contact" className="btn btn-primary">Talk offsets with us</Link>
        </div>
      </section>
    </>
  )
}
