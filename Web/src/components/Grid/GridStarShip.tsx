import { Grid, Typography } from '@mui/material'
import { type Key } from 'react'
import CardStarShip from '../Cards/CardStarShip'

interface Props {
  starships: (string)[] | null
}

function GridStarShip(props: Props) {
  const { starships } = props
  if (starships == null) {
    return null
  }
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Typography variant="h6" fontWeight={'bold'} textAlign={'center'}>Vaisseaux</Typography>
      <Grid container spacing={2} rowSpacing={2}>
        {starships?.map((starship: string, index: Key) => (
          <Grid item xs={12} sm={6} key={index}>
            <CardStarShip query={starship} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default GridStarShip
