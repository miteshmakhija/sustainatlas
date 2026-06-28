// Central catalogue of SustainAtlas offerings used by nav, home and product pages.

export const offerings = [
  {
    slug: 'consultancy',
    type: 'Consultancy',
    title: 'Consultancy',
    icon: '🧭',
    tagline: 'Advisory across climate risk, ESG strategy and regulatory readiness.',
    summary:
      'Expert-led engagements that translate climate and sustainability data into board-ready decisions — from physical-risk due diligence on capital projects to net-zero transition planning.',
  },
  {
    slug: 'geospatial-dataset',
    type: 'Product',
    title: 'Geospatial Dataset',
    icon: '🛰️',
    tagline: 'Asset-level geospatial intelligence at global scale.',
    summary:
      'A curated, georeferenced dataset of corporate assets — coordinates, activity, ownership and GICS classification — ready to be joined with hazard, carbon and regulatory layers.',
  },
  {
    slug: 'portfolio-risk-atlas',
    type: 'Product',
    title: 'Portfolio Risk Atlas',
    icon: '🧭',
    tagline: 'Physical, Technological & Geopolitical risk on one geospatial backbone.',
    summary:
      'One atlas that scores Physical, Technological and Geopolitical risk together — showing how they will impact future portfolios, enabling smarter decisions today, and translating into the socio-economic conditions that matter to retail clients.',
  },
  {
    slug: 'carbon-scope',
    type: 'Product',
    title: 'Carbon Scope 1 / 2 / 3',
    icon: '🏭',
    tagline: 'Scope 1, 2 and 3 emissions accounting toward net zero.',
    summary:
      'Calculate organisational emissions across all three scopes using GHG-Protocol methodologies, identify hotspots and build a credible path to net zero.',
  },
  {
    slug: 'sfdr-regulatory',
    type: 'Product',
    title: 'SFDR & EU/US Regulatory',
    icon: '📋',
    tagline: 'Record, validate and submit EU SFDR & US disclosures.',
    summary:
      'Compliance tooling that helps firms capture PAI indicators, build SFDR templates and file regulatory reports aligned to EU and US standards.',
  },
  {
    slug: 'carbon-trading',
    type: 'Product',
    title: 'Carbon Trading & Offset',
    icon: '♻️',
    tagline: 'Quantify, trade and retire offsets to reach compliance.',
    summary:
      'Calculate residual emissions, source high-integrity offsets, and manage trading and retirement to move organisations toward verified carbon compliance.',
  },
  {
    slug: 'brsr',
    type: 'Product',
    title: 'BRSR ESG Intelligence & Assurance',
    icon: '📑',
    tagline: 'From SEBI BRSR compliance to measurable sustainability performance.',
    summary:
      'An ESG intelligence platform for India’s BRSR mandate — automated KPI collection, BRSR Core assurance readiness, performance analytics and supplier scoring, anchored by a proprietary Sustainability Maturity Index.',
  },
]

export const getOffering = (slug) => offerings.find((o) => o.slug === slug)
