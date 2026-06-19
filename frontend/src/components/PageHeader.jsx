import { Link } from 'react-router-dom'

export default function PageHeader({ eyebrow, title, lead, breadcrumb }) {
  return (
    <header className="page-head">
      <div className="container">
        {breadcrumb && (
          <div className="breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; {breadcrumb}
          </div>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead" style={{ maxWidth: 720 }}>{lead}</p>}
      </div>
    </header>
  )
}
