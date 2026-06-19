import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const frameworks = [
  ['SFDR', 'EU', 'Sustainable Finance Disclosure Regulation — Articles 6, 8 & 9 product classification and PAI reporting.'],
  ['EU Taxonomy', 'EU', 'Alignment & eligibility reporting for environmentally sustainable economic activities.'],
  ['CSRD / ESRS', 'EU', 'Corporate Sustainability Reporting Directive with European Sustainability Reporting Standards.'],
  ['SEC Climate Rule', 'US', 'US climate-related disclosure requirements for registrants.'],
  ['ISSB / IFRS S1·S2', 'Global', 'Baseline sustainability & climate disclosure used across jurisdictions including the US.'],
]

const pai = [
  'GHG emissions (Scope 1, 2, 3) & carbon footprint',
  'GHG intensity of investee companies',
  'Exposure to fossil-fuel sector',
  'Share of non-renewable energy consumption',
  'Energy consumption intensity by high-impact sector',
  'Activities negatively affecting biodiversity-sensitive areas',
  'Emissions to water & hazardous waste ratio',
  'Violations of UN Global Compact / OECD guidelines',
  'Gender pay gap & board gender diversity',
  'Exposure to controversial weapons',
]

export default function Sfdr() {
  return (
    <>
      <PageHeader
        eyebrow="Product · Compliance"
        breadcrumb="Products / SFDR & EU/US Regulatory"
        title="SFDR & EU/US Regulatory Reporting"
        lead="Record, validate and submit your sustainability disclosures. We help firms capture the data, build the templates and file regulatory reports aligned to EU and US standards."
      />

      <section className="section-sm" style={{ background: 'var(--bg-warm)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-4">
            {[
              ['18', 'Mandatory PAI indicators tracked'],
              ['3', 'SFDR product categories (Art. 6/8/9)'],
              ['EU + US', 'Standards supported'],
              ['Audit', 'Full data lineage & evidence trail'],
            ].map(([n, l]) => (
              <div className="stat" key={l}><div className="num">{n}</div><div className="lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Coverage</span>
          <h2>Frameworks we support</h2>
          <div style={{ overflowX: 'auto', marginTop: 18 }}>
            <table className="tbl">
              <thead><tr><th>Framework</th><th>Jurisdiction</th><th>What we help with</th></tr></thead>
              <tbody>
                {frameworks.map(([f, j, d]) => (
                  <tr key={f}><td><strong>{f}</strong></td><td><span className="badge badge-blue">{j}</span></td><td>{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">Data-driven</span>
            <h2>Principal Adverse Impact (PAI) indicators</h2>
            <p>
              SFDR requires firms to disclose how investment decisions affect sustainability factors.
              We capture the mandatory PAI indicators and connect them straight to your carbon and
              geospatial data — no manual reconciliation.
            </p>
            <ul className="feature-list">
              {pai.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3>How the workflow runs</h3>
            <div className="grid" style={{ gap: 14, marginTop: 10 }}>
              {[
                ['01 Capture', 'Ingest portfolio, entity and emissions data; map to indicator definitions.'],
                ['02 Validate', 'Automated quality checks, coverage flags and estimation where data is missing.'],
                ['03 Template', 'Generate SFDR pre-contractual & periodic templates and EU Taxonomy tables.'],
                ['04 Submit', 'Produce filing-ready outputs with an evidence trail for assurance.'],
              ].map(([t, d]) => (
                <div key={t} style={{ borderLeft: '3px solid var(--brand-teal)', paddingLeft: 14 }}>
                  <strong>{t}</strong>
                  <p style={{ margin: '2px 0 0' }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="container" style={{ maxWidth: 640 }}>
          <h2>Reduce reporting burden, raise confidence</h2>
          <p className="muted">See how SustainAtlas turns scattered ESG data into filing-ready regulatory reports.</p>
          <Link to="/contact" className="btn btn-primary">Book a compliance walkthrough</Link>
        </div>
      </section>
    </>
  )
}
