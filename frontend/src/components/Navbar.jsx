import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const productLinks = [
  { to: '/products/geospatial-dataset', label: 'Geospatial Dataset', desc: 'Asset-level geospatial intelligence' },
  { to: '/products/physical-hazard', label: 'Physical Hazard', desc: '31 hazards · risk scoring & map' },
  { to: '/products/technology-hazard', label: 'Technology Hazard', desc: 'AI technical debt & security risk' },
  { to: '/products/carbon-scope', label: 'Carbon Scope 1/2/3', desc: 'Emissions accounting to net zero' },
  { to: '/products/sfdr-regulatory', label: 'SFDR & Regulatory', desc: 'EU/US disclosure reporting' },
  { to: '/products/carbon-trading', label: 'Carbon Trading & Offset', desc: 'Offset & compliance management' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={close} aria-label="SustainAtlas home">
          <img src="/logo-nav.svg" alt="SustainAtlas — Charting Climate-Smart Investment" />
          <span className="nav-tagline">Charting Climate-Smart Investment</span>
        </Link>

        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${open ? '' : 'closed'}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/consultancy" onClick={close}>Consultancy</NavLink>

          <div className="dropdown">
            <NavLink to="/products" onClick={close}>Products ▾</NavLink>
            <div className="dropdown-menu">
              {productLinks.map((p) => (
                <Link key={p.to} to={p.to} onClick={close}>
                  {p.label}
                  <small>{p.desc}</small>
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/products/physical-hazard" onClick={close}>Hazard Map</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
