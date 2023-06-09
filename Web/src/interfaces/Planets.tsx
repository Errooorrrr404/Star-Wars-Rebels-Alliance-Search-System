export interface ResultPlanetsEntity {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents?: (string)[] | null
  films?: (string)[] | null
  created: string
  edited: string
  url: string
}
