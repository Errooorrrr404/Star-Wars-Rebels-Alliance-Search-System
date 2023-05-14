import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiAuth } from '../../tools/instance'
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from '@mui/material'
import GridFilm from '../../components/Grid/GridFilms'
import GridPeople from '../../components/Grid/GridPeople'
import { type ResultPlanetsEntity } from '../../interfaces/Planets'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { StyledImage } from '../../css/stylesDetailsPage'
import { useRecoilState } from 'recoil'
import { responseTypeState } from '../search/SearchPage'

function PlanetsDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [planet, setPlanet] = useState<ResultPlanetsEntity | null>(null)
  const [format, setFormat] = useRecoilState(responseTypeState)

  useEffect(() => {
    async function getPlanet() {
      try {
        const response = await apiAuth().get(`/planets/${id}`)
        if (typeof response.data === 'string') {
          toast.warning('Impossible de récupérer les données en ' + format + '.')
          setFormat('json')
          return
        }
        setPlanet(response.data)
      } catch (error: any) {
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          window.location.reload()
        } else {
          toast.error('Une erreur s\'est produite lors de la recherche.')
          navigate('/planets', { replace: true })
        }
      }
    }
    getPlanet()
  }, [id, format, setFormat, navigate])

  if (planet == null) {
    return <>
      <Toolbar />
      <CircularProgress style={{ display: 'block', margin: 'auto' }} />
    </>
  }
  return (
    <div>
      <Toolbar />
      <Card>
        <CardContent>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={'bold'} textAlign={'center'}>{planet.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledImage src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt={planet.name} onError={(e: any) => { e.currentTarget.src = '/404.png' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={'bold'}>Informations</Typography>
              <Typography>Population: {planet.population}</Typography>
              <Typography>Climat: {planet.climate}</Typography>
              <Typography>Diamètre: {planet.diameter}</Typography>
              <Typography>Période de rotation: {planet.rotation_period}</Typography>
              <Typography>Période d'orbite: {planet.orbital_period}</Typography>
              <Typography>Gravité: {planet.gravity}</Typography>
              <Typography>Surface d'eau: {planet.surface_water}</Typography>
              <Typography>Créé le: {dayjs(planet.created).format('DD/MM/YYYY')}</Typography>
              <Typography>Editer le: {dayjs(planet.edited).format('DD/MM/YYYY')}</Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} rowSpacing={2}>
            {planet.films?.length && planet.films?.length > 0
              ? (
                <GridFilm films={planet.films} />
              )
              : null}
            {planet.residents?.length && planet.residents?.length > 0
              ? (
                <GridPeople people={planet.residents} />
              )
              : null}
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default PlanetsDetailPage
