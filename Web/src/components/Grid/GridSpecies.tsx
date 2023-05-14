import { Grid, Typography } from '@mui/material'
import { type Key } from 'react'
import CardSpecies from '../Cards/CardSpecies'

interface Props {
  species: (string)[] | null
}

function GridSpecies(props: Props) {
  const { species } = props
  if (species == null) {
    return null
  }
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Typography variant="h6" fontWeight={'bold'} textAlign={'center'}>Espèces</Typography>
      <Grid container spacing={2} rowSpacing={2}>
        {species?.map((species: string, index: Key) => (
          <Grid item xs={12} sm={6} key={index}>
            <CardSpecies query={species} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default GridSpecies
