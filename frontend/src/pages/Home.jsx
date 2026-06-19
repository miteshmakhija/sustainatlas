import { Link } from 'react-router-dom'
import { offerings } from '../data/offerings.js'

export default function Home() {
  const products = offerings.filter((o) => o.type === 'Product')

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">Charting Climate-Smart Investment</span>
          <h1>
            Turn climate &amp; sustainability data into <span>resilient capital decisions</span>
          </h1>
          <p className="lead">
            SustainAtlas maps your assets and investments against physical climate hazards,
            quantifies carbon and technology risk, and keeps you compliant with EU &amp; US
            regulation — so every dollar deployed is climate-smart.
          </p>
          <div className="hero-actions">
            <Link to="/products/physical-hazard" className="btn btn-primary">Explore the Hazard Map →</Link>
            <Link to="/contact" className="btn btn-ghost">Talk to us</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-4">
            {[
              ['31', 'Physical hazards modelled'],
              ['11', 'Climate scenarios'],
              ['4', 'Time horizons (2024–2100)'],
              ['S1/S2/S3', 'Carbon scopes covered'],
            ].map(([num, lbl]) => (
              <div className="stat" key={lbl}>
                <div className="num">{num}</div>
                <div className="lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="center" style={{ maxWidth: 700, margin: '0 auto 44px' }}>
            <span className="eyebrow">What we do</span>
            <h2>Two ways to work with us</h2>
            <p className="muted">Strategic advisory, plus a suite of data products you can plug into your own risk and reporting workflows.</p>
          </div>

          <div className="grid grid-2">
            <Link to="/consultancy" className="card card-hover" style={{ textDecoration: 'none' }}>
              <div className="chip">🧭</div>
              <h3>Consultancy</h3>
              <p>Advisory across climate-risk due diligence, ESG strategy, net-zero transition planning and regulatory readiness — led by domain experts.</p>
              <span className="badge badge-blue">Advisory</span>
            </Link>
            <Link to="/products" className="card card-hover" style={{ textDecoration: 'none' }}>
              <div className="chip teal">🧩</div>
              <h3>Products</h3>
              <p>Geospatial datasets, physical-hazard scoring, carbon accounting, regulatory reporting and carbon-trading tools — built to integrate.</p>
              <span className="badge badge-teal">Data products</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: 700, margin: '0 auto 44px' }}>
            <span className="eyebrow">The product suite</span>
            <h2>One atlas, six capabilities</h2>
          </div>
          <div className="grid grid-3">
            {products.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card card-hover" style={{ textDecoration: 'none' }}>
                <div className="chip">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span style={{ color: 'var(--brand-blue)', fontWeight: 600, fontSize: '0.9rem' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured: Hazard Risk formula */}
      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)' }}>
        <div className="container grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Physical Hazard scoring</span>
            <h2>A single, decision-ready risk score</h2>
            <p>
              We join every corporate asset's geospatial coordinates with 31 physical hazards,
              then distil exposure into one number you can act on — for siting decisions,
              due diligence and portfolio screening.
            </p>
            <p className="muted">
              Example: <strong>Microsoft's planned data centre in Pune</strong> or{' '}
              <strong>Google's in Visakhapatnam</strong> — we score whether a billion-dollar
              investment is resilient over the long term, and compare candidate locations.
            </p>
            <Link to="/products/physical-hazard" className="btn btn-primary">Open the interactive map →</Link>
          </div>
          <div className="formula">
            Hazard Risk Score ={' '}
            <span className="blue">Physical&nbsp;Risk</span> &nbsp;×&nbsp;{' '}
            <b>Vulnerability</b> &nbsp;×&nbsp;{' '}
            <span className="blue">Exposure</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section center">
        <div className="container" style={{ maxWidth: 640 }}>
          <h2>Make your next investment climate-smart</h2>
          <p className="muted">Tell us about your portfolio or capital project and we'll show you the risk picture.</p>
          <Link to="/contact" className="btn btn-primary">Send an enquiry</Link>
        </div>
      </section>
    </>
  )
}
