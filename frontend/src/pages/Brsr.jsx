import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

// SEBI's phased BRSR / BRSR Core assurance mandate.
const mandate = [
  ['FY 2022-23', 'BRSR reporting', 'Top 1,000 listed entities', 'badge-blue'],
  ['FY 2023-24', 'BRSR Core assurance', 'Top 150 companies', 'badge-amber'],
  ['FY 2024-25', 'BRSR Core assurance', 'Top 250 companies', 'badge-amber'],
  ['FY 2025-26', 'BRSR Core assurance', 'Top 500 companies', 'badge-amber'],
  ['FY 2026-27', 'BRSR Core assurance', 'Top 1,000 companies', 'badge-red'],
]

// Four product modules.
const modules = [
  {
    icon: '🗂️',
    title: 'BRSR Data Management',
    desc: 'Automated KPI collection with department-wise workflows.',
    points: ['Automated KPI collection', 'Department-wise workflows', 'Evidence repository', 'BRSR report generation', 'XBRL-ready exports'],
  },
  {
    icon: '✅',
    title: 'BRSR Core Assurance Readiness',
    desc: 'Build the controls and evidence trails auditors require.',
    points: ['Evidence tracking', 'Audit trails', 'Gap assessment', 'Assurance score', 'Third-party auditor collaboration'],
  },
  {
    icon: '📊',
    title: 'ESG Performance Analytics',
    desc: 'Move beyond disclosure to measurable performance.',
    points: ['Carbon footprint tracking', 'Water intensity monitoring', 'Waste diversion analysis', 'Diversity metrics', 'Benchmarking against industry peers'],
  },
  {
    icon: '🔗',
    title: 'Supplier ESG Assessment',
    desc: 'Extend disclosure across the value chain.',
    points: ['Vendor ESG questionnaires', 'Supply-chain sustainability scoring', 'Risk heatmaps', 'Automated reminders'],
  },
]

// Sustainability Maturity Index rating bands.
const smiBands = [
  ['85 +', 'Leader', 'badge-green'],
  ['70 – 85', 'Advanced', 'badge-blue'],
  ['50 – 70', 'Developing', 'badge-amber'],
  ['< 50', 'At Risk', 'badge-red'],
]

// Worked example for the BRSR Compliance Readiness Score (CRS).
// CRS = Σ(KPIᵢ × Wᵢ) / ΣWᵢ
const crsRows = [
  ['Energy', 100, 10],
  ['Water', 80, 8],
  ['Waste', 60, 7],
  ['Diversity', 90, 5],
]
const crsNum = crsRows.reduce((s, [, kpi, w]) => s + (kpi * w), 0)
const crsDen = crsRows.reduce((s, [, , w]) => s + w, 0)
const crs = (crsNum / crsDen).toFixed(1)

export default function Brsr() {
  return (
    <>
      <PageHeader
        eyebrow="Product · Regulatory · India"
        breadcrumb="Products / BRSR ESG Intelligence & Assurance"
        title="BRSR ESG Intelligence & Assurance Platform"
        lead="From compliance to sustainability performance. We help companies improve their Sustainability Maturity Score, achieve BRSR Core assurance readiness, and reduce ESG risk across operations and supply chains."
      />

      <section className="section-sm" style={{ background: 'var(--bg-warm)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-4">
            {[
              ['1,000', 'Listed entities under BRSR since FY 2022-23'],
              ['FY 2026-27', 'BRSR Core assurance reaches top 1,000'],
              ['9', 'BRSR Core KPIs requiring assurance'],
              ['Value chain', 'Disclosures extending to suppliers'],
            ].map(([n, l]) => (
              <div className="stat" key={l}><div className="num">{n}</div><div className="lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Why now — the regulatory shift */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Why now</span>
          <h2>The market is shifting from disclosure to assurance</h2>
          <p className="muted" style={{ maxWidth: 820 }}>
            BRSR reporting has been mandatory for India’s top 1,000 listed companies since FY 2022-23.
            The frontier is no longer report generation — it is <strong>assurance, auditability and
            performance improvement</strong>. SEBI’s phased BRSR Core assurance mandate reaches all
            top 1,000 listed entities by FY 2026-27, and value-chain disclosures are pulling suppliers,
            MSMEs and service partners into the ESG reporting ecosystem.
          </p>
          <div style={{ overflowX: 'auto', marginTop: 20 }}>
            <table className="tbl">
              <thead><tr><th>Financial year</th><th>Requirement</th><th>Who it applies to</th></tr></thead>
              <tbody>
                {mandate.map(([fy, req, who, color]) => (
                  <tr key={fy}>
                    <td><strong>{fy}</strong></td>
                    <td>{req}</td>
                    <td><span className={`badge ${color}`}>{who}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="form-note" style={{ marginTop: 14 }}>
            Compliance reporting (2022-24) → assurance readiness (2024-26) → audited ESG metrics and
            value-chain reporting at scale (2026 onward).
          </p>
        </div>
      </section>

      {/* The four modules */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Platform</span>
          <h2>Four modules, one ESG backbone</h2>
          <div className="grid grid-2" style={{ marginTop: 22 }}>
            {modules.map((m) => (
              <div className="card card-hover" key={m.title}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <div className="chip teal" style={{ marginBottom: 0 }}>{m.icon}</div>
                  <h3 style={{ margin: 0 }}>{m.title}</h3>
                </div>
                <p style={{ color: 'var(--brand-teal)', fontWeight: 600, margin: '0 0 8px' }}>{m.desc}</p>
                <ul className="feature-list">
                  {m.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Maturity Index — flagship KPI */}
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Proprietary KPI</span>
            <h2>Sustainability Maturity Index (SMI)</h2>
            <p>
              Most ESG tools only collect data. SustainAtlas turns it into a single, board-ready score
              that blends environmental, social and governance performance with assurance readiness —
              a measurable business outcome rather than a compliance artefact.
            </p>
            <ul className="feature-list">
              <li><strong>E</strong> — Environmental score (0–100)</li>
              <li><strong>S</strong> — Social score (0–100)</li>
              <li><strong>G</strong> — Governance score (0–100)</li>
              <li><strong>A</strong> — Assurance readiness score (0–100)</li>
            </ul>
            <div className="tag-row" style={{ marginTop: 18 }}>
              {smiBands.map(([range, label, color]) => (
                <span className={`badge ${color}`} key={label}>{label} · {range}</span>
              ))}
            </div>
          </div>
          <div className="formula">
            SMI ={' '}
            <span className="blue">0.35·E</span> + <span className="blue">0.30·S</span> +{' '}
            <span className="blue">0.25·G</span> + <b>0.10·A</b>
            <br />
            <span style={{ fontSize: '0.82rem', opacity: 0.85 }}>Weighted 0–100 maturity score · displayed as the headline dashboard KPI</span>
          </div>
        </div>
      </section>

      {/* Supporting models */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">The maths behind the platform</span>
          <h2>Models that differentiate</h2>
          <div className="grid grid-2" style={{ marginTop: 22 }}>
            <div className="card">
              <h3>BRSR Compliance Readiness Score</h3>
              <p>How BRSR-ready you are, weighted by each KPI’s regulatory importance.</p>
              <div className="formula" style={{ fontSize: '0.95rem' }}>
                CRS = <span className="blue">Σ(KPIᵢ × Wᵢ)</span> / <b>ΣWᵢ</b>
              </div>
            </div>
            <div className="card">
              <h3>ESG Risk Exposure Index</h3>
              <p>For CFOs and investors — lower is better. Probability × business impact, summed across risks.</p>
              <div className="formula" style={{ fontSize: '0.95rem' }}>
                ERI = <span className="blue">Σ(Probability × Impact)</span>
              </div>
            </div>
            <div className="card">
              <h3>Carbon Efficiency Index</h3>
              <p>Emissions intensity per unit of revenue — attractive for manufacturing. Track yearly improvement.</p>
              <div className="formula" style={{ fontSize: '0.95rem' }}>
                CEI = <span className="blue">tCO₂e Emissions</span> / <b>Revenue</b>
              </div>
            </div>
            <div className="card">
              <h3>Supplier Sustainability Score</h3>
              <p>Rank vendors for value-chain reporting: &gt;80 preferred · 60–80 approved · &lt;60 high risk.</p>
              <div className="formula" style={{ fontSize: '0.95rem' }}>
                SSS = <span className="blue">0.4·E</span> + <span className="blue">0.3·S</span> + <b>0.3·G</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Worked example — CRS */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Worked example · Compliance Readiness</span>
          <h2>“Your company is {crs}% BRSR-ready.”</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            The Compliance Readiness Score weights each KPI’s completion by its regulatory importance,
            so partial progress on a high-weight indicator counts for more than a finished low-weight one.
          </p>
          <div style={{ overflowX: 'auto', marginTop: 20 }}>
            <table className="tbl">
              <thead>
                <tr><th>KPI</th><th>Completion (KPIᵢ)</th><th>Weight (Wᵢ)</th><th>KPIᵢ × Wᵢ</th></tr>
              </thead>
              <tbody>
                {crsRows.map(([kpi, completion, weight]) => (
                  <tr key={kpi}>
                    <td><strong>{kpi}</strong></td>
                    <td>{completion}%</td>
                    <td>{weight}</td>
                    <td>{completion * weight}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}><strong>Totals</strong></td>
                  <td><strong>{crsDen}</strong></td>
                  <td><strong>{crsNum}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="kpi" style={{ marginTop: 20 }}>
            <div className="card">
              <div className="num" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-blue)' }}>{crs}%</div>
              <div className="lbl">BRSR Compliance Readiness Score<br />= {crsNum} / {crsDen}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="container" style={{ maxWidth: 640 }}>
          <h2>Turn the BRSR mandate into a performance advantage</h2>
          <p className="muted">
            See how SustainAtlas moves your organisation from scattered ESG data to an audited
            Sustainability Maturity Score and assurance-ready disclosures.
          </p>
          <Link to="/contact" className="btn btn-primary">Book a BRSR readiness walkthrough</Link>
        </div>
      </section>
    </>
  )
}
