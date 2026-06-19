import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { offerings } from '../data/offerings.js'

export default function Products() {
  const products = offerings.filter((o) => o.type === 'Product')

  return (
    <>
      <PageHeader
        eyebrow="Offering · Data Products"
        breadcrumb="Products"
        title="Products"
        lead="A connected suite of climate and sustainability data products — from geospatial intelligence to regulatory reporting."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {products.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card card-hover" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <div className="chip" style={{ marginBottom: 0 }}>{p.icon}</div>
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                </div>
                <p style={{ color: 'var(--brand-teal)', fontWeight: 600, margin: '0 0 8px' }}>{p.tagline}</p>
                <p>{p.summary}</p>
                <span style={{ color: 'var(--brand-blue)', fontWeight: 600, fontSize: '0.9rem' }}>View product →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)' }}>
        <div className="container center" style={{ maxWidth: 680 }}>
          <span className="eyebrow">Built to connect</span>
          <h2>One geospatial backbone, many layers</h2>
          <p className="muted">
            Every product shares the same asset-level geospatial foundation, so hazard, carbon and
            regulatory insights line up against the same coordinates — no reconciliation required.
          </p>
          <Link to="/contact" className="btn btn-primary">Request a demo</Link>
        </div>
      </section>
    </>
  )
}
