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

export default function PhysicalHazard() {
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

  // compute scored, filtered assets
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
        eyebrow="Product · Interactive"
        breadcrumb="Products / Physical Hazard"
        title="Physical Risk Hazard Exposure & Financial Impact"
        lead="Explore asset-level exposure to 31 physical hazards across climate scenarios and time horizons. Select a hazard to see how it impacts assets worldwide."
      />

      {/* formula reminder */}
      <section className="section-sm" style={{ background: 'var(--bg-warm)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div className="formula" style={{ padding: '14px 20px', fontSize: '0.98rem' }}>
            Hazard Risk Score = <span className="blue">Physical&nbsp;Risk</span> × <b>Vulnerability</b> × <span className="blue">Exposure</span>
          </div>
          <p className="form-note" style={{ margin: 0, maxWidth: 460 }}>
            Sample dataset for demonstration. Each point is a corporate asset; colour reflects its
            score for the selected hazard, scenario and time horizon.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="map-shell">
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

      {/* Scenario walk-through */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Worked examples</span>
          <h2>Is the investment resilient over the long term?</h2>
          <div className="grid grid-2" style={{ marginTop: 22 }}>
            <div className="card">
              <span className="badge badge-blue">Microsoft · Pune</span>
              <h3 style={{ marginTop: 10 }}>A $2B data centre in Pune</h3>
              <p>
                Filter to <strong>Microsoft</strong> and toggle <strong>Extreme Heat</strong> and{' '}
                <strong>Water Scarcity</strong>. Data centres are cooling- and water-intensive, so a
                hot, water-stressed inland site raises long-run operating risk — switch the scenario
                to <strong>2050</strong> to see how exposure escalates.
              </p>
            </div>
            <div className="card">
              <span className="badge badge-teal">Google · Visakhapatnam</span>
              <h3 style={{ marginTop: 10 }}>Which location suits Google?</h3>
              <p>
                Compare <strong>Visakhapatnam</strong> (coastal) against an inland option. The coastal
                site scores higher on <strong>Tropical Cyclones</strong> and <strong>Coastal
                Flooding</strong> — informing whether the siting decision supports a resilient,
                long-term investment strategy.
              </p>
            </div>
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            Use the <strong>Spatial filter</strong> concept by zooming into a region and reading the KPI strip —
            it summarises assets, issuers and risk for what's in view.
          </p>
          <div style={{ marginTop: 18 }}>
            <Link to="/contact" className="btn btn-primary">Get hazard scoring for your assets</Link>
          </div>
        </div>
      </section>
    </>
  )
}
