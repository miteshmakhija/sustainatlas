// ------------------------------------------------------------------
// Sample asset-level dataset for the Physical Hazard demo map.
// Realistic but illustrative. Hazard physical-risk values are derived
// deterministically from each asset's location & climate so filters,
// scoring and popups behave consistently across reloads.
//
//   Hazard Risk Score = Physical Risk × Vulnerability × Exposure
//      physicalRisk : 0–100  (hazard intensity at the location)
//      vulnerability: 0–1     (asset fragility to that hazard)
//      exposure     : 0–1     (value-at-stake weight from investment)
//   => score range 0–100
// ------------------------------------------------------------------

export const ASSETS = [
  // --- Flagship scenario examples from the brief ---
  { id: 'a-msft-pune', issuer: 'Microsoft', parent: 'Microsoft Corp', name: 'Microsoft Cloud Region — Pune', city: 'Pune', country: 'India',
    lat: 18.5204, lng: 73.8567, gics: 'Application Software', activity: 'Data Centre', investmentUSD: 2_000_000_000,
    vulnerability: 0.55, climate: 'tropical_wet_dry', coastal: false, flagship: true },
  { id: 'a-googl-vizag', issuer: 'Alphabet (Google)', parent: 'Alphabet Inc', name: 'Google Data Centre — Visakhapatnam', city: 'Visakhapatnam', country: 'India',
    lat: 17.6868, lng: 83.2185, gics: 'Interactive Media & Services', activity: 'Data Centre', investmentUSD: 2_000_000_000,
    vulnerability: 0.62, climate: 'tropical_coastal', coastal: true, flagship: true },

  // --- Technology / data centres ---
  { id: 'a-amzn-mum', issuer: 'Amazon', parent: 'Amazon.com Inc', name: 'AWS Region — Mumbai', city: 'Mumbai', country: 'India',
    lat: 19.0760, lng: 72.8777, gics: 'Broadline Retail', activity: 'Data Centre', investmentUSD: 1_600_000_000, vulnerability: 0.6, climate: 'tropical_coastal', coastal: true },
  { id: 'a-meta-sg', issuer: 'Meta Platforms', parent: 'Meta Platforms Inc', name: 'Meta Data Centre — Singapore', city: 'Singapore', country: 'Singapore',
    lat: 1.3521, lng: 103.8198, gics: 'Interactive Media & Services', activity: 'Data Centre', investmentUSD: 1_400_000_000, vulnerability: 0.5, climate: 'equatorial', coastal: true },
  { id: 'a-intel-phx', issuer: 'Intel', parent: 'Intel Corp', name: 'Intel Fab — Phoenix', city: 'Phoenix', country: 'United States',
    lat: 33.4484, lng: -112.0740, gics: 'Semiconductors', activity: 'Manufacturing', investmentUSD: 20_000_000_000, vulnerability: 0.7, climate: 'arid', coastal: false },
  { id: 'a-tsmc-hsin', issuer: 'TSMC', parent: 'Taiwan Semiconductor', name: 'TSMC Fab — Hsinchu', city: 'Hsinchu', country: 'Taiwan',
    lat: 24.8138, lng: 120.9675, gics: 'Semiconductors', activity: 'Manufacturing', investmentUSD: 18_000_000_000, vulnerability: 0.72, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-samsung-suwon', issuer: 'Samsung Electronics', parent: 'Samsung Group', name: 'Samsung Campus — Suwon', city: 'Suwon', country: 'South Korea',
    lat: 37.2636, lng: 127.0286, gics: 'Technology Hardware', activity: 'Manufacturing', investmentUSD: 9_000_000_000, vulnerability: 0.58, climate: 'temperate', coastal: false },
  { id: 'a-foxconn-shenzhen', issuer: 'Foxconn', parent: 'Hon Hai Precision', name: 'Foxconn Plant — Shenzhen', city: 'Shenzhen', country: 'China',
    lat: 22.5431, lng: 114.0579, gics: 'Electronic Manufacturing', activity: 'Manufacturing', investmentUSD: 6_000_000_000, vulnerability: 0.66, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-apple-cup', issuer: 'Apple', parent: 'Apple Inc', name: 'Apple Park — Cupertino', city: 'Cupertino', country: 'United States',
    lat: 37.3349, lng: -122.0090, gics: 'Technology Hardware', activity: 'Headquarters', investmentUSD: 5_000_000_000, vulnerability: 0.45, climate: 'mediterranean', coastal: false },
  { id: 'a-infy-blr', issuer: 'Infosys', parent: 'Infosys Ltd', name: 'Infosys Campus — Bengaluru', city: 'Bengaluru', country: 'India',
    lat: 12.9716, lng: 77.5946, gics: 'IT Consulting', activity: 'Office Campus', investmentUSD: 800_000_000, vulnerability: 0.4, climate: 'tropical_wet_dry', coastal: false },

  // --- Energy / industrials ---
  { id: 'a-aramco-dhahran', issuer: 'Saudi Aramco', parent: 'Saudi Aramco', name: 'Aramco Complex — Dhahran', city: 'Dhahran', country: 'Saudi Arabia',
    lat: 26.2886, lng: 50.1150, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 12_000_000_000, vulnerability: 0.75, climate: 'arid', coastal: true },
  { id: 'a-reliance-jam', issuer: 'Reliance Industries', parent: 'Reliance Industries', name: 'Jamnagar Refinery', city: 'Jamnagar', country: 'India',
    lat: 22.4707, lng: 70.0577, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 15_000_000_000, vulnerability: 0.78, climate: 'arid_coastal', coastal: true },
  { id: 'a-shell-rotterdam', issuer: 'Shell', parent: 'Shell plc', name: 'Shell Refinery — Rotterdam', city: 'Rotterdam', country: 'Netherlands',
    lat: 51.9244, lng: 4.4777, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 8_000_000_000, vulnerability: 0.8, climate: 'temperate_coastal', coastal: true },
  { id: 'a-equinor-bergen', issuer: 'Equinor', parent: 'Equinor ASA', name: 'Equinor Terminal — Bergen', city: 'Bergen', country: 'Norway',
    lat: 60.3913, lng: 5.3221, gics: 'Integrated Oil & Gas', activity: 'Terminal', investmentUSD: 4_000_000_000, vulnerability: 0.6, climate: 'subpolar_coastal', coastal: true },
  { id: 'a-petrobras-rio', issuer: 'Petrobras', parent: 'Petrobras SA', name: 'Petrobras Terminal — Rio de Janeiro', city: 'Rio de Janeiro', country: 'Brazil',
    lat: -22.9068, lng: -43.1729, gics: 'Integrated Oil & Gas', activity: 'Terminal', investmentUSD: 5_000_000_000, vulnerability: 0.7, climate: 'tropical_coastal', coastal: true },
  { id: 'a-adani-mundra', issuer: 'Adani Group', parent: 'Adani Enterprises', name: 'Mundra Port & SEZ', city: 'Mundra', country: 'India',
    lat: 22.8390, lng: 69.7219, gics: 'Marine Ports & Services', activity: 'Port', investmentUSD: 7_000_000_000, vulnerability: 0.82, climate: 'arid_coastal', coastal: true },

  // --- Autos / manufacturing ---
  { id: 'a-tesla-berlin', issuer: 'Tesla', parent: 'Tesla Inc', name: 'Gigafactory — Berlin-Brandenburg', city: 'Grünheide', country: 'Germany',
    lat: 52.3950, lng: 13.8000, gics: 'Automobile Manufacturers', activity: 'Manufacturing', investmentUSD: 5_500_000_000, vulnerability: 0.55, climate: 'temperate', coastal: false },
  { id: 'a-vw-wolfsburg', issuer: 'Volkswagen', parent: 'Volkswagen AG', name: 'VW Plant — Wolfsburg', city: 'Wolfsburg', country: 'Germany',
    lat: 52.4227, lng: 10.7865, gics: 'Automobile Manufacturers', activity: 'Manufacturing', investmentUSD: 6_000_000_000, vulnerability: 0.5, climate: 'temperate', coastal: false },
  { id: 'a-toyota-nagoya', issuer: 'Toyota', parent: 'Toyota Motor Corp', name: 'Toyota Plant — Toyota City', city: 'Toyota', country: 'Japan',
    lat: 35.0823, lng: 137.1560, gics: 'Automobile Manufacturers', activity: 'Manufacturing', investmentUSD: 6_500_000_000, vulnerability: 0.6, climate: 'subtropical_coastal', coastal: true },

  // --- Financials / offices ---
  { id: 'a-jpm-nyc', issuer: 'JPMorgan Chase', parent: 'JPMorgan Chase & Co', name: 'JPMorgan HQ — New York', city: 'New York', country: 'United States',
    lat: 40.7128, lng: -74.0060, gics: 'Diversified Banks', activity: 'Headquarters', investmentUSD: 3_000_000_000, vulnerability: 0.5, climate: 'temperate_coastal', coastal: true },
  { id: 'a-hsbc-hk', issuer: 'HSBC', parent: 'HSBC Holdings', name: 'HSBC HQ — Hong Kong', city: 'Hong Kong', country: 'China',
    lat: 22.2796, lng: 114.1626, gics: 'Diversified Banks', activity: 'Headquarters', investmentUSD: 2_500_000_000, vulnerability: 0.52, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-db-frankfurt', issuer: 'Deutsche Bank', parent: 'Deutsche Bank AG', name: 'Deutsche Bank Towers — Frankfurt', city: 'Frankfurt', country: 'Germany',
    lat: 50.1109, lng: 8.6821, gics: 'Diversified Banks', activity: 'Headquarters', investmentUSD: 1_500_000_000, vulnerability: 0.4, climate: 'temperate', coastal: false },

  // --- Mining / resources ---
  { id: 'a-bhp-perth', issuer: 'BHP', parent: 'BHP Group', name: 'BHP Iron Ore — Pilbara (Perth hub)', city: 'Perth', country: 'Australia',
    lat: -31.9523, lng: 115.8613, gics: 'Diversified Metals & Mining', activity: 'Mining', investmentUSD: 9_000_000_000, vulnerability: 0.68, climate: 'arid', coastal: true },
  { id: 'a-vale-belo', issuer: 'Vale', parent: 'Vale SA', name: 'Vale Operations — Minas Gerais', city: 'Belo Horizonte', country: 'Brazil',
    lat: -19.9167, lng: -43.9345, gics: 'Steel', activity: 'Mining', investmentUSD: 5_000_000_000, vulnerability: 0.72, climate: 'tropical_wet_dry', coastal: false },

  // --- Consumer / other geographies ---
  { id: 'a-nestle-vevey', issuer: 'Nestlé', parent: 'Nestlé SA', name: 'Nestlé HQ — Vevey', city: 'Vevey', country: 'Switzerland',
    lat: 46.4628, lng: 6.8419, gics: 'Packaged Foods', activity: 'Headquarters', investmentUSD: 1_200_000_000, vulnerability: 0.45, climate: 'alpine', coastal: false },
  { id: 'a-unilever-mum', issuer: 'Hindustan Unilever', parent: 'Unilever plc', name: 'HUL Plant — Mumbai', city: 'Mumbai', country: 'India',
    lat: 19.0330, lng: 72.8500, gics: 'Household Products', activity: 'Manufacturing', investmentUSD: 900_000_000, vulnerability: 0.6, climate: 'tropical_coastal', coastal: true },
  { id: 'a-aramco-houston', issuer: 'ExxonMobil', parent: 'Exxon Mobil Corp', name: 'ExxonMobil Complex — Houston', city: 'Houston', country: 'United States',
    lat: 29.7604, lng: -95.3698, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 10_000_000_000, vulnerability: 0.8, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-maersk-cph', issuer: 'Maersk', parent: 'A.P. Møller-Maersk', name: 'Maersk Terminal — Copenhagen', city: 'Copenhagen', country: 'Denmark',
    lat: 55.6761, lng: 12.5683, gics: 'Marine Transportation', activity: 'Port', investmentUSD: 2_000_000_000, vulnerability: 0.62, climate: 'temperate_coastal', coastal: true },
  { id: 'a-sasol-jhb', issuer: 'Sasol', parent: 'Sasol Ltd', name: 'Sasol Plant — Secunda', city: 'Johannesburg', country: 'South Africa',
    lat: -26.2041, lng: 28.0473, gics: 'Specialty Chemicals', activity: 'Manufacturing', investmentUSD: 4_000_000_000, vulnerability: 0.7, climate: 'semi_arid', coastal: false },
  { id: 'a-pemex-mexico', issuer: 'Pemex', parent: 'Petróleos Mexicanos', name: 'Pemex Refinery — Veracruz', city: 'Veracruz', country: 'Mexico',
    lat: 19.1738, lng: -96.1342, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 3_500_000_000, vulnerability: 0.76, climate: 'tropical_coastal', coastal: true },

  // --- Technology / data centres (expanded) ---
  { id: 'a-msft-dublin', issuer: 'Microsoft', parent: 'Microsoft Corp', name: 'Microsoft Data Centre — Dublin', city: 'Dublin', country: 'Ireland',
    lat: 53.3498, lng: -6.2603, gics: 'Application Software', activity: 'Data Centre', investmentUSD: 1_000_000_000, vulnerability: 0.48, climate: 'temperate_coastal', coastal: true },
  { id: 'a-googl-stlucia', issuer: 'Alphabet (Google)', parent: 'Alphabet Inc', name: 'Google Data Centre — The Dalles', city: 'The Dalles', country: 'United States',
    lat: 45.5946, lng: -121.1787, gics: 'Interactive Media & Services', activity: 'Data Centre', investmentUSD: 1_200_000_000, vulnerability: 0.5, climate: 'semi_arid', coastal: false },
  { id: 'a-amzn-frankfurt', issuer: 'Amazon', parent: 'Amazon.com Inc', name: 'AWS Region — Frankfurt', city: 'Frankfurt', country: 'Germany',
    lat: 50.1109, lng: 8.6821, gics: 'Broadline Retail', activity: 'Data Centre', investmentUSD: 1_300_000_000, vulnerability: 0.45, climate: 'temperate', coastal: false },
  { id: 'a-oracle-hyd', issuer: 'Oracle', parent: 'Oracle Corp', name: 'Oracle Cloud Region — Hyderabad', city: 'Hyderabad', country: 'India',
    lat: 17.3850, lng: 78.4867, gics: 'Systems Software', activity: 'Data Centre', investmentUSD: 700_000_000, vulnerability: 0.55, climate: 'tropical_wet_dry', coastal: false },
  { id: 'a-meta-lulea', issuer: 'Meta Platforms', parent: 'Meta Platforms Inc', name: 'Meta Data Centre — Luleå', city: 'Luleå', country: 'Sweden',
    lat: 65.5848, lng: 22.1567, gics: 'Interactive Media & Services', activity: 'Data Centre', investmentUSD: 900_000_000, vulnerability: 0.5, climate: 'subpolar_coastal', coastal: true },
  { id: 'a-nvidia-sc', issuer: 'NVIDIA', parent: 'NVIDIA Corp', name: 'NVIDIA Campus — Santa Clara', city: 'Santa Clara', country: 'United States',
    lat: 37.3541, lng: -121.9552, gics: 'Semiconductors', activity: 'Headquarters', investmentUSD: 3_000_000_000, vulnerability: 0.5, climate: 'mediterranean', coastal: false },
  { id: 'a-tcs-chennai', issuer: 'Tata Consultancy Services', parent: 'Tata Group', name: 'TCS Campus — Chennai', city: 'Chennai', country: 'India',
    lat: 13.0827, lng: 80.2707, gics: 'IT Consulting', activity: 'Office Campus', investmentUSD: 600_000_000, vulnerability: 0.58, climate: 'tropical_coastal', coastal: true },

  // --- Energy & utilities (expanded) ---
  { id: 'a-bp-azeri', issuer: 'BP', parent: 'BP plc', name: 'BP Terminal — Baku', city: 'Baku', country: 'Azerbaijan',
    lat: 40.4093, lng: 49.8671, gics: 'Integrated Oil & Gas', activity: 'Terminal', investmentUSD: 4_500_000_000, vulnerability: 0.72, climate: 'semi_arid', coastal: true },
  { id: 'a-totalenergies-pau', issuer: 'TotalEnergies', parent: 'TotalEnergies SE', name: 'TotalEnergies Hub — Marseille', city: 'Marseille', country: 'France',
    lat: 43.2965, lng: 5.3698, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 5_000_000_000, vulnerability: 0.74, climate: 'mediterranean', coastal: true },
  { id: 'a-enel-rome', issuer: 'Enel', parent: 'Enel SpA', name: 'Enel Power Plant — Civitavecchia', city: 'Civitavecchia', country: 'Italy',
    lat: 42.0924, lng: 11.7957, gics: 'Electric Utilities', activity: 'Power Generation', investmentUSD: 2_800_000_000, vulnerability: 0.66, climate: 'mediterranean', coastal: true },
  { id: 'a-ntpc-singrauli', issuer: 'NTPC', parent: 'NTPC Ltd', name: 'NTPC Thermal Plant — Singrauli', city: 'Singrauli', country: 'India',
    lat: 24.1996, lng: 82.6739, gics: 'Independent Power Producers', activity: 'Power Generation', investmentUSD: 3_200_000_000, vulnerability: 0.7, climate: 'tropical_wet_dry', coastal: false },
  { id: 'a-petrochina-daqing', issuer: 'PetroChina', parent: 'China National Petroleum', name: 'PetroChina Field — Daqing', city: 'Daqing', country: 'China',
    lat: 46.5907, lng: 125.1039, gics: 'Integrated Oil & Gas', activity: 'Oil Field', investmentUSD: 6_500_000_000, vulnerability: 0.68, climate: 'temperate', coastal: false },
  { id: 'a-orsted-northsea', issuer: 'Ørsted', parent: 'Ørsted A/S', name: 'Ørsted Offshore Wind — Grimsby', city: 'Grimsby', country: 'United Kingdom',
    lat: 53.5675, lng: -0.0807, gics: 'Renewable Electricity', activity: 'Power Generation', investmentUSD: 4_000_000_000, vulnerability: 0.6, climate: 'temperate_coastal', coastal: true },

  // --- Industrials, mining & materials (expanded) ---
  { id: 'a-rio-pilbara', issuer: 'Rio Tinto', parent: 'Rio Tinto Group', name: 'Rio Tinto Iron Ore — Pilbara', city: 'Karratha', country: 'Australia',
    lat: -20.7364, lng: 116.8460, gics: 'Diversified Metals & Mining', activity: 'Mining', investmentUSD: 8_000_000_000, vulnerability: 0.7, climate: 'arid_coastal', coastal: true },
  { id: 'a-codelco-chuqui', issuer: 'Codelco', parent: 'Codelco', name: 'Codelco Copper Mine — Chuquicamata', city: 'Calama', country: 'Chile',
    lat: -22.3196, lng: -68.9009, gics: 'Copper', activity: 'Mining', investmentUSD: 7_500_000_000, vulnerability: 0.72, climate: 'arid', coastal: false },
  { id: 'a-arcelor-gent', issuer: 'ArcelorMittal', parent: 'ArcelorMittal SA', name: 'ArcelorMittal Steelworks — Ghent', city: 'Ghent', country: 'Belgium',
    lat: 51.0543, lng: 3.7174, gics: 'Steel', activity: 'Manufacturing', investmentUSD: 5_500_000_000, vulnerability: 0.74, climate: 'temperate_coastal', coastal: true },
  { id: 'a-cemex-monterrey', issuer: 'Cemex', parent: 'Cemex SAB', name: 'Cemex Plant — Monterrey', city: 'Monterrey', country: 'Mexico',
    lat: 25.6866, lng: -100.3161, gics: 'Construction Materials', activity: 'Manufacturing', investmentUSD: 2_200_000_000, vulnerability: 0.68, climate: 'semi_arid', coastal: false },
  { id: 'a-basf-ludwigshafen', issuer: 'BASF', parent: 'BASF SE', name: 'BASF Verbund Site — Ludwigshafen', city: 'Ludwigshafen', country: 'Germany',
    lat: 49.4875, lng: 8.4660, gics: 'Diversified Chemicals', activity: 'Manufacturing', investmentUSD: 9_500_000_000, vulnerability: 0.72, climate: 'temperate', coastal: false },

  // --- Consumer, autos & logistics (expanded) ---
  { id: 'a-byd-shenzhen', issuer: 'BYD', parent: 'BYD Company', name: 'BYD Gigafactory — Shenzhen', city: 'Shenzhen', country: 'China',
    lat: 22.6170, lng: 114.0700, gics: 'Automobile Manufacturers', activity: 'Manufacturing', investmentUSD: 6_000_000_000, vulnerability: 0.6, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-maruti-gurgaon', issuer: 'Maruti Suzuki', parent: 'Suzuki Motor Corp', name: 'Maruti Plant — Manesar', city: 'Gurugram', country: 'India',
    lat: 28.3596, lng: 76.9374, gics: 'Automobile Manufacturers', activity: 'Manufacturing', investmentUSD: 2_500_000_000, vulnerability: 0.62, climate: 'semi_arid', coastal: false },
  { id: 'a-nestle-saopaulo', issuer: 'Nestlé', parent: 'Nestlé SA', name: 'Nestlé Factory — São Paulo', city: 'São Paulo', country: 'Brazil',
    lat: -23.5505, lng: -46.6333, gics: 'Packaged Foods', activity: 'Manufacturing', investmentUSD: 1_100_000_000, vulnerability: 0.55, climate: 'tropical_wet_dry', coastal: false },
  { id: 'a-psa-singapore', issuer: 'PSA International', parent: 'Temasek Holdings', name: 'PSA Container Terminal — Singapore', city: 'Singapore', country: 'Singapore',
    lat: 1.2644, lng: 103.8200, gics: 'Marine Ports & Services', activity: 'Port', investmentUSD: 5_000_000_000, vulnerability: 0.7, climate: 'equatorial', coastal: true },
  { id: 'a-dpworld-jebelali', issuer: 'DP World', parent: 'DP World', name: 'DP World — Jebel Ali Port', city: 'Dubai', country: 'United Arab Emirates',
    lat: 25.0110, lng: 55.0610, gics: 'Marine Ports & Services', activity: 'Port', investmentUSD: 6_000_000_000, vulnerability: 0.74, climate: 'arid_coastal', coastal: true },

  // --- Financials & offices (expanded) ---
  { id: 'a-mufg-tokyo', issuer: 'MUFG', parent: 'Mitsubishi UFJ Financial', name: 'MUFG HQ — Tokyo', city: 'Tokyo', country: 'Japan',
    lat: 35.6762, lng: 139.6503, gics: 'Diversified Banks', activity: 'Headquarters', investmentUSD: 2_500_000_000, vulnerability: 0.55, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-dbs-singapore', issuer: 'DBS Bank', parent: 'DBS Group', name: 'DBS HQ — Singapore', city: 'Singapore', country: 'Singapore',
    lat: 1.2789, lng: 103.8536, gics: 'Diversified Banks', activity: 'Headquarters', investmentUSD: 1_800_000_000, vulnerability: 0.5, climate: 'equatorial', coastal: true },
  { id: 'a-itau-saopaulo', issuer: 'Itaú Unibanco', parent: 'Itaú Unibanco Holding', name: 'Itaú HQ — São Paulo', city: 'São Paulo', country: 'Brazil',
    lat: -23.6100, lng: -46.6970, gics: 'Diversified Banks', activity: 'Headquarters', investmentUSD: 1_400_000_000, vulnerability: 0.45, climate: 'tropical_wet_dry', coastal: false },

  // --- Other geographies ---
  { id: 'a-aramco-yanbu', issuer: 'Saudi Aramco', parent: 'Saudi Aramco', name: 'Aramco Refinery — Yanbu', city: 'Yanbu', country: 'Saudi Arabia',
    lat: 24.0890, lng: 38.0618, gics: 'Integrated Oil & Gas', activity: 'Refinery', investmentUSD: 10_000_000_000, vulnerability: 0.76, climate: 'arid_coastal', coastal: true },
  { id: 'a-naturgy-canary', issuer: 'Naturgy', parent: 'Naturgy Energy Group', name: 'Naturgy LNG Terminal — Las Palmas', city: 'Las Palmas', country: 'Spain',
    lat: 28.1235, lng: -15.4363, gics: 'Gas Utilities', activity: 'Terminal', investmentUSD: 2_000_000_000, vulnerability: 0.64, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-fortescue-perth', issuer: 'Fortescue', parent: 'Fortescue Metals', name: 'Fortescue Green Hydrogen — Gladstone', city: 'Gladstone', country: 'Australia',
    lat: -23.8430, lng: 151.2560, gics: 'Diversified Metals & Mining', activity: 'Manufacturing', investmentUSD: 4_500_000_000, vulnerability: 0.66, climate: 'subtropical_coastal', coastal: true },
  { id: 'a-saudiagri-nile', issuer: 'Olam Agri', parent: 'Olam Group', name: 'Olam Agri Processing — Cairo', city: 'Cairo', country: 'Egypt',
    lat: 30.0444, lng: 31.2357, gics: 'Agricultural Products', activity: 'Manufacturing', investmentUSD: 800_000_000, vulnerability: 0.72, climate: 'arid', coastal: false },
  { id: 'a-lng-novatek', issuer: 'Novatek', parent: 'PAO Novatek', name: 'Yamal LNG — Sabetta', city: 'Sabetta', country: 'Russia',
    lat: 71.2700, lng: 72.0600, gics: 'Oil & Gas Exploration', activity: 'Terminal', investmentUSD: 12_000_000_000, vulnerability: 0.8, climate: 'subpolar_coastal', coastal: true },
  { id: 'a-stcorp-vancouver', issuer: 'Teck Resources', parent: 'Teck Resources Ltd', name: 'Teck Coal Terminal — Vancouver', city: 'Vancouver', country: 'Canada',
    lat: 49.2827, lng: -123.1207, gics: 'Diversified Metals & Mining', activity: 'Port', investmentUSD: 2_600_000_000, vulnerability: 0.62, climate: 'temperate_coastal', coastal: true },
]

// ---- deterministic pseudo-random in [0,1) seeded by a string ----
function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  // xorshift to spread bits
  h ^= h << 13; h ^= h >>> 17; h ^= h << 5
  return ((h >>> 0) % 100000) / 100000
}

// climate → multipliers (0–1) that bias each hazard's physical-risk
const CLIMATE_BIAS = {
  tropical_wet_dry:   { extreme_heat: 0.9, water_scarcity: 0.55, fluvial_flooding: 0.6, pluvial_flooding: 0.65, wildfire: 0.4 },
  tropical_coastal:   { extreme_heat: 0.85, tropical_cyclones: 0.85, coastal_flooding: 0.9, pluvial_flooding: 0.8, fluvial_flooding: 0.6 },
  equatorial:         { extreme_heat: 0.95, extreme_precip: 0.85, coastal_flooding: 0.8, pluvial_flooding: 0.85 },
  arid:               { extreme_heat: 0.95, water_scarcity: 0.95, wildfire: 0.6, river_low_flow: 0.85 },
  arid_coastal:       { extreme_heat: 0.9, water_scarcity: 0.85, coastal_flooding: 0.7, tropical_cyclones: 0.6 },
  semi_arid:          { extreme_heat: 0.75, water_scarcity: 0.8, wildfire: 0.7, river_low_flow: 0.7 },
  mediterranean:      { extreme_heat: 0.7, wildfire: 0.85, water_scarcity: 0.7 },
  subtropical_coastal:{ extreme_heat: 0.7, tropical_cyclones: 0.8, coastal_flooding: 0.75, extreme_precip: 0.7 },
  temperate:          { extreme_cold: 0.55, extreme_precip: 0.5, fluvial_flooding: 0.5, extreme_wind: 0.5 },
  temperate_coastal:  { coastal_flooding: 0.7, extreme_wind: 0.6, extreme_precip: 0.6, fluvial_flooding: 0.55 },
  subpolar_coastal:   { extreme_cold: 0.8, extreme_snowfall: 0.8, extreme_wind: 0.7, coastal_flooding: 0.55 },
  alpine:             { extreme_cold: 0.7, extreme_snowfall: 0.85, fluvial_flooding: 0.5 },
}

// Build a physical-risk value (0–100) for an asset + hazard
export function physicalRisk(asset, hazardId) {
  const bias = (CLIMATE_BIAS[asset.climate] && CLIMATE_BIAS[asset.climate][hazardId]) || 0
  // latitude effects
  const absLat = Math.abs(asset.lat)
  let latFactor = 0
  if (hazardId === 'extreme_heat') latFactor = Math.max(0, (40 - absLat) / 40) * 0.6
  if (hazardId === 'extreme_cold' || hazardId === 'extreme_snowfall') latFactor = Math.max(0, (absLat - 30) / 40) * 0.6
  if ((hazardId === 'coastal_flooding' || hazardId === 'tropical_cyclones') && !asset.coastal) return Math.round(seeded(asset.id + hazardId) * 12)
  const noise = seeded(asset.id + hazardId) * 0.35
  const raw = Math.min(1, bias + latFactor + noise * (bias > 0 ? 0.5 : 1))
  // baseline floor so every hazard has some value
  return Math.round(Math.max(5, raw * 100))
}

// exposure weight (0–1) from investment, log-scaled between $0.5B and $20B
export function exposureWeight(asset) {
  const min = Math.log(500_000_000)
  const max = Math.log(20_000_000_000)
  const v = (Math.log(asset.investmentUSD) - min) / (max - min)
  return Math.max(0.25, Math.min(1, Number(v.toFixed(2))))
}

// Full hazard risk computation for one asset/hazard
export function hazardRisk(asset, hazardId) {
  const pr = physicalRisk(asset, hazardId)            // 0-100
  const vuln = asset.vulnerability                    // 0-1
  const exp = exposureWeight(asset)                   // 0-1
  const score = Math.round(pr * vuln * exp)           // 0-100
  return { physicalRisk: pr, vulnerability: vuln, exposure: exp, score }
}

// Derived filter option helpers
export const uniqueValues = (key) =>
  Array.from(new Set(ASSETS.map((a) => a[key]))).sort()
