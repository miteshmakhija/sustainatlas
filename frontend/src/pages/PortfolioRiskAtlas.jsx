import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { HAZARDS, SCENARIOS, TIMESTEPS, riskBand } from '../data/hazards.js'
import { ASSETS, hazardRisk, uniqueValues } from '../data/assets.js'

// climate scenario / time-horizon multiplier on physical risk
function scenarioFactor(scenarioId, timestep) {
  const base = { current: 1, ngfs_3c: 1, ipcc_15: 0.95, ipcc_5: 1.15 }[scenarioId] ?? 1
  const t = { 2024: 1, 2030: 1.08, 2050: 1.22, 2100: 1.45 }[timestep] ?? 1
  if (scenarioId === 'current') return 1 // Current is pinned to 2024
  return base * t
}

const ALL = 'All'

// The three risk families this product unifies.
const pillars = [
  {
    icon: '🌍',
    name: 'Physical Risk',
    tag: 'Climate & nature',
    desc: 'Chronic and acute climate hazards — heat, water stress, flooding, cyclones, wildfire — scored against the geospatial location of every asset across scenarios and time horizons.',
    formula: ['Physical Risk', '×', 'Vulnerability', '×', 'Exposure'],
  },
  {
    icon: '🛡️',
    name: 'Technological Risk',
    tag: 'AI, cyber & systems',
    desc: 'AI technical debt, model decay, cyber and supply-chain exposure turned into measurable financial impact — so digital fragility shows up in capital decisions, not just incident reports.',
    formula: ['Debt Principal', '×', 'Interest Rate', '+', 'Breach Loss'],
  },
  {
    icon: '⚖️',
    name: 'Geopolitical Risk',
    tag: 'Conflict, policy & trade',
    desc: 'Conflict, sanctions, resource nationalism, chokepoints and policy shocks mapped to the countries, suppliers and currencies a portfolio actually touches.',
    formula: ['Event Probability', '×', 'Portfolio Exposure', '×', 'Severity'],
  },
]

// Technological risk categories (condensed taxonomy)
const techCategories = [
  { name: 'AI Technical Debt', sev: 'High', impact: 'Slows iteration, raises change-failure rate, inflates run-cost' },
  { name: 'Security & Cyber Risk', sev: 'Severe', impact: 'Breach loss, IP leakage, regulatory penalty, reputational damage' },
  { name: 'Model Drift & Decay', sev: 'High', impact: 'Silent accuracy loss, mispriced risk, bad automated decisions' },
  { name: 'Data Quality & Lineage Debt', sev: 'High', impact: 'Unreliable outputs, audit failure, costly reprocessing' },
  { name: 'Regulatory / AI-Act Risk', sev: 'Medium', impact: 'Fines up to 7% of global turnover (EU AI Act), forced shutdown' },
  { name: 'Vendor & Supply-chain Risk', sev: 'Medium', impact: 'Continuity risk, sudden re-platforming cost' },
]

// Geopolitical risk categories (new)
const geoCategories = [
  { name: 'Conflict & War', sev: 'Severe', impact: 'Asset destruction, forced exit, insurance withdrawal, total loss of capital in-country' },
  { name: 'Sanctions & Trade Controls', sev: 'Severe', impact: 'Frozen positions, blocked counterparties, forced divestment at distressed prices' },
  { name: 'Supply-chain Chokepoints', sev: 'High', impact: 'Strait, canal and semiconductor concentration — sudden cost spikes and stockouts' },
  { name: 'Resource & Energy Nationalism', sev: 'High', impact: 'Expropriation, export bans, windfall taxes, energy and commodity price shocks' },
  { name: 'Political Instability', sev: 'Medium', impact: 'Regime change, civil unrest, contract repudiation, regulatory whiplash' },
  { name: 'Currency & Capital Controls', sev: 'Medium', impact: 'Devaluation, repatriation limits, sovereign-default contagion' },
]

const sevBadge = (s) =>
  s === 'Severe' ? 'badge-red' : s === 'High' ? 'badge-amber' : 'badge-blue'

// How the three risks reshape tomorrow's portfolios
const portfolioImpacts = [
  ['Repricing', 'Risks that markets ignore today get priced in tomorrow. Assets exposed to heat, cyber fragility or sanctioned supply chains re-rate downward as the risk becomes consensus.'],
  ['Stranded assets', 'Refineries in flood zones, AI platforms built on deprecated models, factories behind a closing trade border — capital can be trapped long before the accounting catches up.'],
  ['Hidden correlation', 'A drought, an outage and a sanction can hit the same names at once. Risks that look independent share underlying drivers, so diversification quietly fails when it is needed most.'],
  ['Fat-tail drawdowns', 'Each family carries low-probability, high-severity tails. Scored together, they reveal the scenarios that turn a bad quarter into a permanent impairment.'],
]

// Decision dimensions retail-facing advisers can score 1–5
const decisionDimensions = [
  ['Exposure', 'How directly is the portfolio exposed to this risk?'],
  ['Probability', 'How likely is it over the holding period?'],
  ['Impact', 'If it happens, how much capital is at stake?'],
  ['Velocity', 'Will the damage arrive suddenly or gradually?'],
  ['Resilience', 'Can the asset or company adapt and survive?'],
  ['Compensation', 'Is the expected return enough to be paid for this risk?'],
]

// Socio-economic read-through for everyday / retail clients
const retailImpacts = [
  ['💼', 'Jobs & local economy', 'Plants, ports and data centres that fail a risk screen are the same ones that employ a town. Exposure scoring flags where livelihoods, not just balance sheets, are vulnerable.'],
  ['🛒', 'Cost of living', 'Climate-stressed supply, chokepoint shocks and energy nationalism feed straight into food, fuel and insurance prices that retail households pay.'],
  ['🏦', 'Savings & pensions', 'Most retail capital sits in funds holding these very assets. Surfacing the risk early protects long-horizon savings from sudden, permanent repricing.'],
  ['🛟', 'Insurance & credit access', 'As physical and geopolitical risk rises, cover gets costlier or withdrawn and credit tightens — hitting the least-resilient households first.'],
]

export default function PortfolioRiskAtlas() {
  const [hazardId, setHazardId] = useState('extreme_heat')
  const [scenario, setScenario] = useState('current')
  const [timestep, setTimestep] = useState('2024')
  const [country, setCountry] = useState(ALL)
  const [gics, setGics] = useState(ALL)
  const [activity, setActivity] = useState(ALL)
  const [issuer, setIssuer] = useState(ALL)
  const [minScore, setMinScore] = useState(0)

  const hazard = HAZARDS.find((h) => h.id === hazardId)
  const factor = scenarioFactor(scenario, timestep)

  const countries = useMemo(() => [ALL, ...uniqueValues('country')], [])
  const gicsList = useMemo(() => [ALL, ...uniqueValues('gics')], [])
  const activities = useMemo(() => [ALL, ...uniqueValues('activity')], [])
  const issuers = useMemo(() => [ALL, ...uniqueValues('issuer')], [])

  const scored = useMemo(() => {
    return ASSETS.map((a) => {
      const r = hazardRisk(a, hazardId)
      const adjPhysical = Math.min(100, Math.round(r.physicalRisk * factor))
      const adjScore = Math.min(100, Math.round(adjPhysical * a.vulnerability * r.exposure))
      return { ...a, ...r, adjPhysical, adjScore }
    })
      .filter((a) => (country === ALL || a.country === country))
      .filter((a) => (gics === ALL || a.gics === gics))
      .filter((a) => (activity === ALL || a.activity === activity))
      .filter((a) => (issuer === ALL || a.issuer === issuer))
      .filter((a) => a.adjScore >= minScore)
  }, [hazardId, factor, country, gics, activity, issuer, minScore])

  const stats = useMemo(() => {
    const n = scored.length
    const issuerCount = new Set(scored.map((a) => a.issuer)).size
    const avg = n ? Math.round(scored.reduce((s, a) => s + a.adjScore, 0) / n) : 0
    const max = n ? Math.max(...scored.map((a) => a.adjScore)) : 0
    return { n, issuerCount, avg, max }
  }, [scored])

  const fmt$ = (v) => v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : `$${(v / 1e6).toFixed(0)}M`

  const resetFilters = () => {
    setCountry(ALL); setGics(ALL); setActivity(ALL); setIssuer(ALL); setMinScore(0)
  }

  return (
    <>
      <PageHeader
        eyebrow="Product · Risk Intelligence"
        breadcrumb="Products / Portfolio Risk Atlas"
        title="Portfolio Risk Atlas"
        lead="One atlas for the three risks reshaping capital — Physical, Technological and Geopolitical. See how they will hit tomorrow's portfolios, make smarter decisions today, and understand what it means for everyday investors."
      />

      {/* Three risk pillars */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">One atlas, three risks</span>
          <h2>Physical, Technological &amp; Geopolitical Risk — scored together</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            These risks used to live in separate silos. The Portfolio Risk Atlas joins them onto the
            same asset-level, geospatial backbone so they can be compared, combined and acted on as
            one decision.
          </p>
          <div className="grid grid-3" style={{ marginTop: 26 }}>
            {pillars.map((p) => (
              <div className="card" key={p.name}>
                <div className="chip">{p.icon}</div>
                <span className="badge badge-teal" style={{ marginBottom: 8 }}>{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="formula" style={{ padding: '10px 14px', fontSize: '0.82rem', marginTop: 6 }}>
                  {p.formula.map((part, i) =>
                    ['×', '+'].includes(part)
                      ? <b key={i}>&nbsp;{part}&nbsp;</b>
                      : <span key={i} className={i % 2 === 0 ? 'blue' : undefined}>{part}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Physical Risk map (folded in) */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Physical Risk · Interactive</span>
          <h2>Asset-level physical hazard exposure</h2>
          <div className="formula" style={{ padding: '12px 18px', fontSize: '0.95rem', margin: '14px 0 4px', display: 'inline-block' }}>
            Hazard Risk Score = <span className="blue">Physical&nbsp;Risk</span> × <b>Vulnerability</b> × <span className="blue">Exposure</span>
          </div>
          <p className="form-note" style={{ maxWidth: 560 }}>
            Sample dataset for demonstration. Each point is a corporate asset; colour reflects its
            score for the selected hazard, scenario and time horizon.
          </p>

          <div className="map-shell" style={{ marginTop: 18 }}>
            {/* Sidebar filters */}
            <aside className="map-sidebar">
              <div className="field">
                <label>Hazard</label>
                <select value={hazardId} onChange={(e) => setHazardId(e.target.value)}>
                  <optgroup label="Available">
                    {HAZARDS.filter((h) => h.available).map((h) => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Limited availability (*)">
                    {HAZARDS.filter((h) => !h.available).map((h) => (
                      <option key={h.id} value={h.id}>{h.name} *</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <div className="field" style={{ flex: 1 }}>
                  <label>Scenario</label>
                  <select value={scenario} onChange={(e) => { const v = e.target.value; setScenario(v); if (v === 'current') setTimestep('2024'); else if (timestep === '2024') setTimestep('2030') }}>
                    {SCENARIOS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Time horizon</label>
                <select value={timestep} onChange={(e) => setTimestep(e.target.value)} disabled={scenario === 'current'}>
                  {(scenario === 'current' ? ['2024'] : TIMESTEPS).map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <hr className="soft" style={{ margin: '14px 0' }} />

              <div className="field"><label>Issuer</label>
                <select value={issuer} onChange={(e) => setIssuer(e.target.value)}>
                  {issuers.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="field"><label>Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  {countries.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="field"><label>GICS® sub-industry</label>
                <select value={gics} onChange={(e) => setGics(e.target.value)}>
                  {gicsList.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="field"><label>Activity at asset</label>
                <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                  {activities.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Minimum score: {minScore}</label>
                <input type="range" min="0" max="100" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} />
              </div>

              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={resetFilters}>Reset filters</button>

              <hr className="soft" style={{ margin: '16px 0' }} />
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-soft)' }}>Legend — {hazard?.name}</h4>
              {[
                ['Severe (75–100)', '#b91c1c'],
                ['High (55–74)', '#ea580c'],
                ['Moderate (35–54)', '#d4a017'],
                ['Low (18–34)', '#65a30d'],
                ['Minimal (0–17)', '#0d9488'],
              ].map(([l, c]) => (
                <div className="legend-row" key={l}><span className="legend-dot" style={{ background: c }} />{l}</div>
              ))}
            </aside>

            {/* Map */}
            <div className="map-canvas">
              <MapContainer center={[20, 30]} zoom={2} minZoom={2} scrollWheelZoom style={{ height: '100%', width: '100%' }} worldCopyJump>
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors · SustainAtlas (sample data)'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {scored.map((a) => {
                  const band = riskBand(a.adjScore)
                  const radius = 6 + (a.exposure * 10)
                  return (
                    <CircleMarker
                      key={a.id}
                      center={[a.lat, a.lng]}
                      radius={radius}
                      pathOptions={{ color: '#ffffff', weight: 1.5, fillColor: band.color, fillOpacity: 0.85 }}
                    >
                      <Tooltip direction="top" offset={[0, -4]}>
                        <strong>{a.issuer}</strong> — {a.adjScore} ({band.label})
                      </Tooltip>
                      <Popup>
                        <div style={{ minWidth: 230 }}>
                          <strong style={{ fontSize: '0.95rem' }}>{a.issuer}</strong>
                          {a.flagship && <span className="badge badge-teal" style={{ marginLeft: 6 }}>Scenario</span>}
                          <div style={{ color: '#666', fontSize: '0.82rem', marginBottom: 8 }}>{a.name}</div>
                          <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
                            <tbody>
                              <tr><td>Hazard</td><td style={{ textAlign: 'right' }}><strong>{hazard?.name}</strong></td></tr>
                              <tr><td>Physical Risk</td><td style={{ textAlign: 'right' }}>{a.adjPhysical}/100</td></tr>
                              <tr><td>Vulnerability</td><td style={{ textAlign: 'right' }}>{a.vulnerability.toFixed(2)}</td></tr>
                              <tr><td>Exposure</td><td style={{ textAlign: 'right' }}>{a.exposure.toFixed(2)} ({fmt$(a.investmentUSD)})</td></tr>
                              <tr style={{ borderTop: '1px solid #eee' }}>
                                <td><strong>Risk Score</strong></td>
                                <td style={{ textAlign: 'right' }}>
                                  <strong style={{ color: band.color }}>{a.adjScore}/100 · {band.label}</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div style={{ marginTop: 6, fontSize: '0.74rem', color: '#888' }}>
                            {a.activity} · {a.gics}<br />{a.city}, {a.country}
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  )
                })}
              </MapContainer>
            </div>
          </div>

          {/* KPI strip */}
          <div className="kpi" style={{ marginTop: 22 }}>
            <div className="card"><div className="num" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-blue)' }}>{stats.n}</div><div className="lbl">Assets shown</div></div>
            <div className="card"><div className="num" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-blue)' }}>{stats.issuerCount}</div><div className="lbl">Issuers</div></div>
            <div className="card"><div className="num" style={{ fontSize: '1.8rem', fontWeight: 800, color: riskBand(stats.avg).color }}>{stats.avg}</div><div className="lbl">Avg risk score</div></div>
            <div className="card"><div className="num" style={{ fontSize: '1.8rem', fontWeight: 800, color: riskBand(stats.max).color }}>{stats.max}</div><div className="lbl">Max risk score</div></div>
          </div>
        </div>
      </section>

      {/* Technological & Geopolitical taxonomies */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Beyond climate</span>
          <h2>Technological &amp; Geopolitical Risk</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            The same exposure-scoring logic extends to two risks balance sheets rarely capture until
            it is too late — the fragility of the technology a company runs on, and the geopolitics of
            where it operates.
          </p>
          <div className="grid grid-2" style={{ marginTop: 22, alignItems: 'start' }}>
            <div>
              <h3 style={{ marginBottom: 12 }}>🛡️ Technological Risk</h3>
              <table className="tbl">
                <thead><tr><th>Category</th><th>Severity</th><th>Financial impact</th></tr></thead>
                <tbody>
                  {techCategories.map((c) => (
                    <tr key={c.name}>
                      <td><strong>{c.name}</strong></td>
                      <td><span className={`badge ${sevBadge(c.sev)}`}>{c.sev}</span></td>
                      <td>{c.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 style={{ marginBottom: 12 }}>⚖️ Geopolitical Risk</h3>
              <table className="tbl">
                <thead><tr><th>Category</th><th>Severity</th><th>Financial impact</th></tr></thead>
                <tbody>
                  {geoCategories.map((c) => (
                    <tr key={c.name}>
                      <td><strong>{c.name}</strong></td>
                      <td><span className={`badge ${sevBadge(c.sev)}`}>{c.sev}</span></td>
                      <td>{c.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Impact on future portfolios */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">The thesis</span>
          <h2>How these risks will impact future portfolios</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            Today's prices reflect yesterday's risks. As physical, technological and geopolitical
            shocks become consensus, four forces reshape what a portfolio is actually worth.
          </p>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            {portfolioImpacts.map(([t, d]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p style={{ marginBottom: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smarter decisions framework */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Smarter decisions</span>
          <h2>A single scoring framework for every risk</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            For each holding, score these dimensions from <strong>1 = low</strong> to{' '}
            <strong>5 = high</strong> — across all three risk families — to rank what truly deserves
            attention.
          </p>
          <div style={{ overflowX: 'auto', marginTop: 20 }}>
            <table className="tbl">
              <thead><tr><th style={{ width: '22%' }}>Dimension</th><th>Question</th></tr></thead>
              <tbody>
                {decisionDimensions.map(([d, q]) => (
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
              The highest-priority risks are rarely the most obvious. A low-probability, high-impact
              geopolitical or physical shock can outrank a familiar, manageable one — which is exactly
              why velocity and resilience sit alongside probability and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Socio-economic impact for retail clients */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">For retail clients</span>
          <h2>What it means for everyday investors</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            These risks are not abstract for retail households — they flow through to jobs, prices,
            savings and the cost of staying insured. The Atlas translates institutional risk scores
            into a socio-economic read-through advisers can actually explain.
          </p>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            {retailImpacts.map(([icon, t, d]) => (
              <div className="card" key={t}>
                <div className="chip">{icon}</div>
                <h3>{t}</h3>
                <p style={{ marginBottom: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section center">
        <div className="container" style={{ maxWidth: 640 }}>
          <h2>See the full risk picture for your portfolio</h2>
          <p className="muted">Tell us about your holdings or capital project and we'll score them across physical, technological and geopolitical risk.</p>
          <Link to="/contact" className="btn btn-primary">Request a Portfolio Risk Atlas</Link>
        </div>
      </section>
    </>
  )
}
