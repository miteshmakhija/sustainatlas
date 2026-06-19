import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const stats = [
  ['~40%', 'of an AI system’s lifetime cost is rework driven by accumulated technical debt'],
  ['10–15×', 'more expensive to fix a security flaw in production than at design time'],
  ['60%+', 'of ML failures in production trace back to data & pipeline debt, not the model'],
  ['277 days', 'average time to identify and contain a data breach — each day compounds loss'],
]

const categories = [
  { name: 'AI Technical Debt', sev: 'High', driver: 'Glue code, dead experiments, undocumented features, entangled pipelines', impact: 'Slows iteration, raises change-failure rate, inflates run-cost' },
  { name: 'Security & Cyber Risk', sev: 'Severe', driver: 'Model/prompt injection, data poisoning, exposed endpoints, secrets in code', impact: 'Breach loss, IP leakage, regulatory penalty, reputational damage' },
  { name: 'Model Drift & Decay', sev: 'High', driver: 'Data distribution shift, stale features, missing retraining cadence', impact: 'Silent accuracy loss, mispriced risk, bad automated decisions' },
  { name: 'Data Quality & Lineage Debt', sev: 'High', driver: 'Untracked sources, schema drift, no lineage, label noise', impact: 'Unreliable outputs, audit failure, costly reprocessing' },
  { name: 'Regulatory / AI-Act Risk', sev: 'Medium', driver: 'Unclassified high-risk systems, no documentation, missing human oversight', impact: 'Fines up to 7% of global turnover (EU AI Act), forced shutdown' },
  { name: 'Vendor & Supply-chain Risk', sev: 'Medium', driver: 'Closed model dependencies, licence changes, deprecation, lock-in', impact: 'Continuity risk, sudden re-platforming cost' },
  { name: 'Infrastructure & Cloud Concentration', sev: 'Medium', driver: 'Single-region GPU dependence, opaque cost scaling', impact: 'Outage exposure, runaway inference spend' },
]

const sevBadge = (s) =>
  s === 'Severe' ? 'badge-red' : s === 'High' ? 'badge-amber' : 'badge-blue'

const riskDimensions = [
  ['Exposure', 'How directly is the investment exposed to the risk?'],
  ['Probability', 'How likely is the risk over my holding period?'],
  ['Impact', 'If it happens, how much capital can be lost?'],
  ['Velocity', 'Will the damage happen suddenly or gradually?'],
  ['Resilience', 'Can the company / asset survive and adapt?'],
  ['Compensation', 'Am I being paid enough expected return for this risk?'],
  ['Liquidity', 'Can I exit if my view changes?'],
  ['Diversification', 'Does this risk overlap with other portfolio holdings?'],
]

const mitigations = [
  ['Debt register & SLOs', 'Treat AI tech debt like financial debt: log it, assign an owner, set a payback budget each sprint (target 15–20% capacity).'],
  ['Shift-left security', 'Threat-model models and pipelines at design; scan for injection, poisoning and secret leakage in CI before deploy.'],
  ['Continuous evaluation', 'Automated drift detection, golden datasets and canary releases so decay is caught before it hits decisions.'],
  ['Lineage & governance', 'End-to-end data lineage, model cards and an approval gate mapped to EU AI Act risk tiers.'],
  ['Resilience by design', 'Multi-region inference, vendor-abstraction layers and cost guardrails to remove single points of failure.'],
]

export default function TechnologyHazard() {
  return (
    <>
      <PageHeader
        eyebrow="Product · Whitepaper"
        breadcrumb="Products / Technology Hazard"
        title="Technology Hazard"
        lead="AI models accumulate technical debt and security risk that rarely show up on a balance sheet — until they do. We quantify it as financial exposure so it informs investment and capital decisions."
      />

      {/* Headline stats */}
      <section className="section-sm" style={{ background: 'var(--bg-warm)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-4">
            {stats.map(([num, lbl]) => (
              <div className="card" key={lbl} style={{ textAlign: 'center' }}>
                <div className="num" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-blue)' }}>{num}</div>
                <div className="lbl" style={{ fontSize: '0.86rem' }}>{lbl}</div>
              </div>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 14 }}>
            Indicative figures synthesised from industry research on ML technical debt and breach economics — used here to illustrate the model.
          </p>
        </div>
      </section>

      {/* The thesis */}
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">The problem</span>
            <h2>Why AI carries hidden tech debt</h2>
            <p>
              Machine-learning systems are uniquely prone to debt: they couple code, data and models,
              so a change in any one quietly degrades the others. Security risk multiplies that debt —
              an unpatched, poorly-governed model is both a liability and an attack surface.
            </p>
            <p>
              Left unmanaged, this debt accrues "interest": slower releases, rising incident rates,
              model decay and — when a breach or compliance gap finally lands — a large, lumpy loss.
            </p>
          </div>
          <div className="formula" style={{ alignSelf: 'center' }}>
            Tech-Risk Cost ={' '}
            <span className="blue">Debt&nbsp;Principal</span> &nbsp;×&nbsp; <b>Interest&nbsp;Rate</b>
            <br /><span style={{ fontSize: '0.8rem', opacity: 0.8 }}>+ Expected&nbsp;Breach&nbsp;Loss (probability × severity)</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Risk taxonomy</span>
          <h2>Technology hazard categories</h2>
          <p className="muted" style={{ maxWidth: 720 }}>Seven categories we score and track, each with its primary drivers and financial impact.</p>
          <div style={{ overflowX: 'auto', marginTop: 20 }}>
            <table className="tbl">
              <thead>
                <tr><th>Category</th><th>Severity</th><th>Primary drivers</th><th>Financial impact</th></tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.name}>
                    <td><strong>{c.name}</strong></td>
                    <td><span className={`badge ${sevBadge(c.sev)}`}>{c.sev}</span></td>
                    <td>{c.driver}</td>
                    <td>{c.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mitigations */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">How to deal with it</span>
          <h2>Minimising &amp; managing the risk</h2>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            {mitigations.map(([t, d]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p style={{ marginBottom: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical risk-assessment framework */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Framework</span>
          <h2>Practical risk-assessment framework</h2>
          <p className="muted" style={{ maxWidth: 720 }}>
            For each investment, score these dimensions from <strong>1 = low</strong> to{' '}
            <strong>5 = high</strong>.
          </p>
          <div style={{ overflowX: 'auto', marginTop: 20 }}>
            <table className="tbl">
              <thead><tr><th style={{ width: '22%' }}>Dimension</th><th>Question</th></tr></thead>
              <tbody>
                {riskDimensions.map(([d, q]) => (
                  <tr key={d}><td><strong>{d}</strong></td><td>{q}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-2" style={{ marginTop: 24, alignItems: 'center' }}>
            <div className="formula">
              Risk Priority ={' '}
              <span className="blue">Exposure</span> × <b>Probability</b> ×{' '}
              <span className="blue">Impact</span> × <b>Velocity</b>{' '}
              ÷ <span className="blue">Resilience</span>
            </div>
            <p className="muted" style={{ margin: 0 }}>
              The highest-priority risks are not always the most obvious. A low-probability but
              high-impact risk can deserve more attention than a common but manageable one — which
              is exactly why we score velocity and resilience alongside probability and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Financial decision */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Impact on financial decisions</span>
          <h2>From engineering risk to capital allocation</h2>
          <div className="grid grid-3" style={{ marginTop: 22 }}>
            <div className="card"><h3>Diligence</h3><p>Price AI tech-debt and security posture into M&amp;A and venture diligence — discount valuations carrying unfunded remediation.</p></div>
            <div className="card"><h3>Provisioning</h3><p>Translate expected breach loss into a capital reserve, the same way credit risk is provisioned.</p></div>
            <div className="card"><h3>Prioritisation</h3><p>Rank remediation by risk-adjusted ROI so debt paydown competes fairly with new features.</p></div>
          </div>
          <div style={{ marginTop: 32 }}>
            <Link to="/contact" className="btn btn-primary">Request the full whitepaper</Link>
          </div>
        </div>
      </section>
    </>
  )
}
