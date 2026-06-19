import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

export default function GeospatialDataset() {
  return (
    <>
      <PageHeader
        eyebrow="Product · Foundation Layer"
        breadcrumb="Products / Geospatial Dataset"
        title="Geospatial Dataset"
        lead="Asset-level geospatial intelligence at global scale — the foundation every other SustainAtlas layer joins to."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            <div>
              <h2>What's in the dataset</h2>
              <p>
                A curated, georeferenced inventory of corporate assets — facilities, plants, data
                centres, ports, offices and more — each carrying the attributes you need to run
                hazard, carbon and regulatory analysis against a single source of truth.
              </p>
              <ul className="feature-list">
                <li>Precise latitude / longitude for each asset location</li>
                <li>Issuer &amp; parent-ultimate-issuer ownership hierarchy</li>
                <li>GICS® sub-industry classification</li>
                <li>Activity at asset (manufacturing, data centre, refinery, port…)</li>
                <li>Country &amp; city, with key-activity flags</li>
                <li>Investment / value-at-stake attributes for exposure weighting</li>
              </ul>
            </div>
            <div className="card">
              <h3>Why a geospatial backbone matters</h3>
              <p>
                Climate risk is fundamentally <em>local</em>. A portfolio average hides the fact that
                one coastal refinery drives most of the flood exposure. By anchoring everything to
                coordinates, SustainAtlas lets you drill from portfolio → issuer → individual asset.
              </p>
              <div className="kpi" style={{ marginTop: 18 }}>
                <div className="card"><div className="num" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-blue)' }}>30+</div><div className="lbl">Sample issuers</div></div>
                <div className="card"><div className="num" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-blue)' }}>Global</div><div className="lbl">Coverage</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">Mapping in action</span>
          <h2>Join coordinates to physical hazards</h2>
          <p className="muted" style={{ maxWidth: 720 }}>
            The dataset becomes powerful the moment you overlay it with hazard layers. Explore the
            relationship between geospatial coordinates and 31 physical hazards on the live map.
          </p>
          <Link to="/products/physical-hazard" className="btn btn-primary">Open the Physical Hazard map →</Link>
        </div>
      </section>
    </>
  )
}
