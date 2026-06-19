// The 31 physical hazards from the Physical Risk module (Module 2).
// `available: false` mirrors the hazards marked with * (limited availability) in the source spec.

export const HAZARDS = [
  { id: 'extreme_heat', name: 'Extreme Heat', category: 'Chronic', metric: 'Days above 30°C', available: true },
  { id: 'extreme_cold', name: 'Extreme Cold', category: 'Chronic', metric: 'Days below 0°C', available: true },
  { id: 'extreme_wind', name: 'Extreme Wind', category: 'Acute', metric: 'Days above 24 m/s', available: true },
  { id: 'extreme_precip', name: 'Extreme Precipitation', category: 'Acute', metric: 'Days above 20 mm', available: true },
  { id: 'extreme_snowfall', name: 'Extreme Snowfall', category: 'Acute', metric: 'Days above 5 cm', available: true },
  { id: 'water_scarcity', name: 'Water Scarcity', category: 'Chronic', metric: 'Days above 60% stress', available: true },
  { id: 'tropical_cyclones', name: 'Tropical Cyclones', category: 'Acute', metric: '100-Year Wind Speed', available: true },
  { id: 'coastal_flooding', name: 'Coastal Flooding', category: 'Acute', metric: '100-Year Flood Height', available: true },
  { id: 'fluvial_flooding', name: 'Fluvial Flooding', category: 'Acute', metric: '100-Year Flood Height', available: true },
  { id: 'pluvial_flooding', name: 'Pluvial Flooding', category: 'Acute', metric: '100-Year Flood Height', available: true },
  { id: 'river_low_flow', name: 'River Low Flow', category: 'Chronic', metric: '100-Year Low Flow Days', available: true },
  { id: 'wildfire', name: 'Wildfire', category: 'Acute', metric: 'Annual Fire Probability', available: true },
  { id: 'hail', name: 'Hail', category: 'Acute', metric: 'Days > 2.5 cm diameter', available: false },
  { id: 'tornado', name: 'Tornado', category: 'Acute', metric: 'Event Count Per Year', available: false },
  { id: 'eq_bedrock', name: 'Earthquake Bedrock Conditions', category: 'Acute', metric: '475-Year PGA', available: false },
  { id: 'eq_soil', name: 'Earthquake Local Soil Conditions', category: 'Acute', metric: '475-Year PGA', available: false },
  { id: 'landslide', name: 'Landslide', category: 'Acute', metric: 'Intensity Value', available: false },
  { id: 'lightning', name: 'Lightning', category: 'Acute', metric: 'Flash Rate', available: false },
  { id: 'volcano', name: 'Volcano', category: 'Acute', metric: '475-Year Ashfall Thickness', available: false },
  { id: 'heat_wave', name: 'Heat Wave', category: 'Acute', metric: 'Intensity Value', available: false },
  { id: 'subsidence', name: 'Subsidence', category: 'Chronic', metric: 'Intensity Value', available: false },
  { id: 'tsunami', name: 'Tsunami', category: 'Acute', metric: 'Return Period 1cm Inundation', available: false },
  { id: 'avalanche', name: 'Avalanche', category: 'Acute', metric: 'Intensity Value', available: false },
  { id: 'glacial_lake', name: 'Glacial Lake Outburst', category: 'Acute', metric: 'Intensity Value', available: false },
  { id: 'groundwater_decline', name: 'Groundwater Table Decline', category: 'Chronic', metric: 'Intensity Value', available: false },
  { id: 'solifluction', name: 'Solifluction', category: 'Chronic', metric: 'Intensity Value', available: false },
  { id: 'saline_intrusion', name: 'Saline Intrusion', category: 'Chronic', metric: 'Intensity Value', available: false },
  { id: 'ocean_acidification', name: 'Ocean Acidification', category: 'Chronic', metric: 'pH Value', available: false },
  { id: 'permafrost_thawing', name: 'Permafrost Thawing', category: 'Chronic', metric: 'Intensity Value', available: false },
  { id: 'convective_storms', name: 'Convective Storms', category: 'Acute', metric: 'Asset Damage AAL', available: false },
  { id: 'windstorms', name: 'Windstorms', category: 'Acute', metric: 'Asset Damage AAL', available: false },
]

export const SCENARIOS = [
  { id: 'current', name: 'Current (2024)' },
  { id: 'ngfs_3c', name: '3°C NGFS REMIND — Current Policies' },
  { id: 'ipcc_15', name: 'IPCC 1.5°C' },
  { id: 'ipcc_5', name: 'IPCC 5°C' },
]

export const TIMESTEPS = ['2024', '2030', '2050', '2100']

// Risk band helper (0-100 score)
export function riskBand(score) {
  if (score >= 75) return { label: 'Severe', color: '#b91c1c' }
  if (score >= 55) return { label: 'High', color: '#ea580c' }
  if (score >= 35) return { label: 'Moderate', color: '#d4a017' }
  if (score >= 18) return { label: 'Low', color: '#65a30d' }
  return { label: 'Minimal', color: '#0d9488' }
}
