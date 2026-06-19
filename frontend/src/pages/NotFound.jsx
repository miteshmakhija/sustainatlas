import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section center" style={{ padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: 520 }}>
        <span className="eyebrow">404</span>
        <h1>Off the map</h1>
        <p className="muted">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </section>
  )
}
