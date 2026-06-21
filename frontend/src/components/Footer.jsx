import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">
              <img src="/logo.svg" alt="SustainAtlas" />
            </span>
            <p style={{ color: '#aab0c2', maxWidth: 320 }}>
              Charting climate-smart investment — geospatial physical-hazard intelligence,
              carbon accounting and regulatory reporting for resilient capital decisions.
            </p>
          </div>

          <div className="fcol">
            <h4>Products</h4>
            <Link to="/products/geospatial-dataset">Geospatial Dataset</Link>
            <Link to="/products/physical-hazard">Physical Hazard</Link>
            <Link to="/products/technology-hazard">Technology Hazard</Link>
            <Link to="/products/carbon-scope">Carbon Scope 1/2/3</Link>
            <Link to="/products/sfdr-regulatory">SFDR & Regulatory</Link>
            <Link to="/products/carbon-trading">Carbon Trading & Offset</Link>
            <Link to="/products/brsr">BRSR ESG Intelligence</Link>
          </div>

          <div className="fcol">
            <h4>Company</h4>
            <Link to="/consultancy">Consultancy</Link>
            <Link to="/products">All Products</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="fcol">
            <h4>Get in touch</h4>
            <a href="mailto:connect@sustainatlas.com">connect@sustainatlas.com</a>
            <p style={{ color: '#aab0c2', marginTop: 10, fontSize: '0.86rem' }}>
              TEN Labs Cowork, udChalo House,<br />
              10, Phoenix Boundary Road, Viman Nagar,<br />
              Pune, Maharashtra 411014
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SustainAtlas. All rights reserved.</span>
          <span>Charting Climate-Smart Investment</span>
        </div>
      </div>
    </footer>
  )
}
