import { Grid, Typography } from '@mui/material'
import { type Key } from 'react'
import CardPlanet from '../Cards/CardPlanet'

interface Props {
  planets: (string)[] | null
}

function GridPlanets(props: Props) {
  const { planets } = props
  if (planets == null) {
    return null
  }
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Typography variant="h6" fontWeight={'bold'} textAlign={'center'}>Planètes</Typography>
      <Grid container spacing={2} rowSpacing={2}>
        {planets?.map((planet: string, index: Key) => (
          <Grid item xs={12} sm={6} key={index}>
            <CardPlanet query={planet} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default GridPlanets
