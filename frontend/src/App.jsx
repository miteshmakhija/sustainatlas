import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Consultancy from './pages/Consultancy.jsx'
import Products from './pages/Products.jsx'
import GeospatialDataset from './pages/GeospatialDataset.jsx'
import PortfolioRiskAtlas from './pages/PortfolioRiskAtlas.jsx'
import CarbonScope from './pages/CarbonScope.jsx'
import Sfdr from './pages/Sfdr.jsx'
import CarbonTrading from './pages/CarbonTrading.jsx'
import Brsr from './pages/Brsr.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/geospatial-dataset" element={<GeospatialDataset />} />
          <Route path="/products/portfolio-risk-atlas" element={<PortfolioRiskAtlas />} />
          {/* Old hazard pages consolidated into the Portfolio Risk Atlas */}
          <Route path="/products/physical-hazard" element={<Navigate to="/products/portfolio-risk-atlas" replace />} />
          <Route path="/products/technology-hazard" element={<Navigate to="/products/portfolio-risk-atlas" replace />} />
          <Route path="/products/carbon-scope" element={<CarbonScope />} />
          <Route path="/products/sfdr-regulatory" element={<Sfdr />} />
          <Route path="/products/carbon-trading" element={<CarbonTrading />} />
          <Route path="/products/brsr" element={<Brsr />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
