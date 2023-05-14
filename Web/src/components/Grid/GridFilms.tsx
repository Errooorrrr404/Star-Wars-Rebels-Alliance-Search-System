import { Grid, Typography } from '@mui/material'
import { type Key } from 'react'
import CardFilm from '../Cards/CardFilm'

interface Props {
  films: (string)[] | null
}

function GridFilm (props: Props) {
  const { films } = props
  if (films == null) {
    return null
  }
  return (
        <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" fontWeight={'bold'} textAlign={'center'}>Films</Typography>
            <Grid container spacing={2} rowSpacing={2}>
                {films?.map((film: string, index: Key) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <CardFilm query={film} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
  )
}

export default GridFilm
