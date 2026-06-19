import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const engagements = [
  { icon: '🔎', title: 'Physical-risk due diligence', text: 'Hazard screening for M&A, project finance and greenfield siting — is this billion-dollar location resilient over 25 years?' },
  { icon: '🌱', title: 'Net-zero transition planning', text: 'Build a credible decarbonisation pathway across Scope 1, 2 and 3 with interim targets and abatement levers.' },
  { icon: '📊', title: 'ESG strategy & ratings readiness', text: 'Materiality assessment, KPI design and preparation for ESG rating agencies and investor scrutiny.' },
  { icon: '📋', title: 'Regulatory readiness', text: 'Gap analysis and operating-model design for SFDR, CSRD, EU Taxonomy and US climate disclosure.' },
  { icon: '🧮', title: 'Climate scenario analysis', text: 'NGFS and IPCC scenario modelling of physical and transition risk for stress testing and TCFD/ISSB reporting.' },
  { icon: '🤝', title: 'Embedded advisory', text: 'Fractional climate-risk and sustainability expertise to stand up capabilities inside your team.' },
]

export default function Consultancy() {
  return (
    <>
      <PageHeader
        eyebrow="Offering · Advisory"
        breadcrumb="Consultancy"
        title="Consultancy"
        lead="Expert-led engagements that translate climate and sustainability data into board-ready decisions."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {engagements.map((e) => (
              <div className="card card-hover" key={e.title}>
                <div className="chip">{e.icon}</div>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">How we engage</span>
          <h2>A clear, four-step path</h2>
          <div className="grid grid-4" style={{ marginTop: 28 }}>
            {[
              ['01', 'Discover', 'Understand your assets, portfolio and decisions at stake.'],
              ['02', 'Diagnose', 'Score exposure with our data products and scenario models.'],
              ['03', 'Design', 'Build the strategy, targets and reporting operating model.'],
              ['04', 'Deliver', 'Implement, train your team and hand over living dashboards.'],
            ].map(([n, t, d]) => (
              <div className="card" key={n}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-teal)' }}>{n}</div>
                <h3 style={{ marginTop: 8 }}>{t}</h3>
                <p style={{ marginBottom: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="container" style={{ maxWidth: 640 }}>
          <h2>Have a decision on the line?</h2>
          <p className="muted">Bring us your project or portfolio question and we'll scope an engagement.</p>
          <Link to="/contact" className="btn btn-primary">Start a conversation</Link>
        </div>
      </section>
    </>
  )
}
