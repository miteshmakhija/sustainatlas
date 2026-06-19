import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const scopes = [
  { tag: 'Scope 1', color: 'badge-red', title: 'Direct emissions', desc: 'Owned/controlled sources — on-site fuel combustion, company vehicles, process & fugitive emissions.', method: 'Activity data × emission factor (e.g. litres of fuel × IPCC/DEFRA factor).' },
  { tag: 'Scope 2', color: 'badge-amber', title: 'Purchased energy', desc: 'Indirect emissions from purchased electricity, steam, heating & cooling.', method: 'Location-based (grid average factor) and market-based (supplier/REC factors).' },
  { tag: 'Scope 3', color: 'badge-blue', title: 'Value-chain emissions', desc: '15 categories — purchased goods, transport, business travel, use of sold products, investments.', method: 'Spend-based, average-data, supplier-specific or hybrid methods per GHG Protocol.' },
]

// Tool-capability metrics
const metrics = [
  ['7,500+', 'Emission factors in library', 'IPCC, DEFRA, EPA, IEA, ecoinvent'],
  ['15', 'Scope 3 categories modelled', 'Full GHG-Protocol value chain'],
  ['4', 'Calculation methods', 'Spend, average-data, supplier-specific, hybrid'],
  ['190+', 'Country grid factors', 'Location & market-based Scope 2'],
  ['6', 'GHGs covered', 'CO₂, CH₄, N₂O, HFCs, PFCs, SF₆ (GWP-weighted)'],
  ['100%', 'Audit traceability', 'Source & vintage tracked per factor'],
]

// Embodied / lifecycle product carbon footprint (PCF) of common electronics.
// Figures are representative lifecycle estimates (kg CO2e) for illustration.
// When YOU buy these, the supplier's manufacturing emissions become part of
// your Scope 3 (Category 1 — Purchased Goods); running them is your Scope 2.
const products = [
  { item: 'Desktop PC + tower', vendor: 'Dell / HP', mfg: 430, use: 320, transport: 25, total: 775 },
  { item: 'Business laptop', vendor: 'Lenovo / Dell', mfg: 240, use: 90, transport: 15, total: 345 },
  { item: 'MacBook Pro 14"', vendor: 'Apple', mfg: 215, use: 60, transport: 25, total: 300 },
  { item: '27" monitor', vendor: 'Dell / LG', mfg: 360, use: 130, transport: 20, total: 510 },
  { item: 'Mechanical keyboard', vendor: 'Logitech', mfg: 13, use: 1, transport: 3, total: 17 },
  { item: 'Wireless mouse', vendor: 'Logitech', mfg: 7, use: 1, transport: 2, total: 10 },
  { item: 'Smartphone', vendor: 'Apple / Samsung', mfg: 58, use: 9, transport: 3, total: 70 },
  { item: 'Rack server (1U)', vendor: 'Dell / HPE', mfg: 1320, use: 2600, transport: 80, total: 4000 },
]

export default function CarbonScope() {
  return (
    <>
      <PageHeader
        eyebrow="Product · Carbon Accounting"
        breadcrumb="Products / Carbon Scope 1·2·3"
        title="Carbon Scope 1 / 2 / 3 Calculations"
        lead="Measure organisational emissions across all three scopes using GHG-Protocol methodologies — the foundation for a credible path to net zero."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {scopes.map((s) => (
              <div className="card card-hover" key={s.tag}>
                <span className={`badge ${s.color}`}>{s.tag}</span>
                <h3 style={{ marginTop: 12 }}>{s.title}</h3>
                <p>{s.desc}</p>
                <p className="form-note"><strong>Method:</strong> {s.method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool capability metrics */}
      <section className="section-sm" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Tool capability</span>
          <h2>Calculation engine at a glance</h2>
          <div className="grid grid-3" style={{ marginTop: 22 }}>
            {metrics.map(([num, lbl, sub]) => (
              <div className="card" key={lbl}>
                <div className="num" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-blue)' }}>{num}</div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem' }}>{lbl}</div>
                <div className="lbl" style={{ fontSize: '0.82rem' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Methodology</span>
            <h2>The core calculation</h2>
            <p>
              At its heart, emissions accounting multiplies activity data by an emission factor and
              sums across sources. We apply GHG-Protocol Corporate Standard and Scope 3 guidance,
              ISO 14064 and recognised factor sets (IPCC, DEFRA, EPA, IEA grid factors).
            </p>
            <ul className="feature-list">
              <li>Operational &amp; financial control consolidation boundaries</li>
              <li>Location-based and market-based Scope 2 dual reporting</li>
              <li>Spend-based, supplier-specific and hybrid Scope 3 methods</li>
              <li>Emission-factor library with full source &amp; vintage tracking</li>
              <li>Audit-ready data lineage for assurance</li>
            </ul>
          </div>
          <div className="formula">
            Emissions (tCO₂e) ={' '}
            <span className="blue">Activity&nbsp;Data</span> &nbsp;×&nbsp; <b>Emission&nbsp;Factor</b>
            <br /><span style={{ fontSize: '0.82rem', opacity: 0.85 }}>GWP-weighted across CO₂, CH₄, N₂O and F-gases</span>
          </div>
        </div>
      </section>

      {/* Electronics purchased-goods emissions */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Worked example · Purchased goods</span>
          <h2>What you buy carries emissions too</h2>
          <p className="muted" style={{ maxWidth: 760 }}>
            When you buy a PC, monitor or keyboard from a manufacturer, that supplier's Scope 1 &amp; 2
            (their factory emissions) become part of <strong>your Scope 3 — Category 1, Purchased
            Goods &amp; Services</strong>. Running the device on your own power is <strong>your Scope 2</strong>,
            and disposing of it is <strong>Scope 3 — Category 12</strong>. Below: representative
            lifecycle carbon footprints (kg CO₂e) for common electronics.
          </p>
          <div style={{ overflowX: 'auto', marginTop: 20 }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Typical vendor</th>
                  <th>Manufacturing<br /><small style={{ fontWeight: 400 }}>→ your Scope 3 (Cat 1)</small></th>
                  <th>Use-phase ~3 yr<br /><small style={{ fontWeight: 400 }}>→ your Scope 2</small></th>
                  <th>Transport + EOL<br /><small style={{ fontWeight: 400 }}>→ your Scope 3 (Cat 4/12)</small></th>
                  <th>Total lifecycle</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.item}>
                    <td><strong>{p.item}</strong></td>
                    <td>{p.vendor}</td>
                    <td>{p.mfg} kg</td>
                    <td>{p.use} kg</td>
                    <td>{p.transport} kg</td>
                    <td><strong>{p.total.toLocaleString()} kg CO₂e</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="form-note" style={{ marginTop: 14 }}>
            Illustrative lifecycle estimates based on published product carbon footprints (PCFs).
            Use-phase assumes ~3 years on a global-average grid; figures vary by model, usage and
            local grid intensity. Our tool maps each purchase to the correct scope automatically.
          </p>
          <div className="kpi" style={{ marginTop: 20 }}>
            <div className="card">
              <div className="num" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
                {products.reduce((s, p) => s + p.mfg + p.transport, 0).toLocaleString()} kg
              </div>
              <div className="lbl">Scope 3 added to your inventory<br />if you bought one of each</div>
            </div>
            <div className="card">
              <div className="num" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-teal)' }}>
                {products.reduce((s, p) => s + p.use, 0).toLocaleString()} kg
              </div>
              <div className="lbl">Scope 2 over ~3 years of use</div>
            </div>
            <div className="card">
              <div className="num" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)' }}>
                {products.reduce((s, p) => s + p.total, 0).toLocaleString()} kg
              </div>
              <div className="lbl">Total lifecycle CO₂e</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Where this data is used</span>
          <h2>From inventory to net zero</h2>
          <div className="grid grid-4" style={{ marginTop: 22 }}>
            {[
              ['🎯', 'Target setting', 'Establish SBTi-aligned near-term and net-zero targets from a verified baseline.'],
              ['📉', 'Hotspot reduction', 'Identify the highest-emitting activities and prioritise abatement levers.'],
              ['📄', 'Disclosure', 'Feed CDP, CSRD, ISSB/IFRS S2 and TCFD reporting with assured figures.'],
              ['♻️', 'Offset & compliance', 'Quantify residual emissions to retire via the Carbon Trading & Offset product.'],
            ].map(([i, t, d]) => (
              <div className="card" key={t}><div className="chip teal">{i}</div><h3>{t}</h3><p style={{ marginBottom: 0 }}>{d}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link to="/products/carbon-trading" className="btn btn-ghost">Next: offset residual emissions →</Link>
            <Link to="/contact" className="btn btn-primary" style={{ marginLeft: 12 }}>Calculate your footprint</Link>
          </div>
        </div>
      </section>
    </>
  )
}
