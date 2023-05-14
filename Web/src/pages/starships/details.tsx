import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiAuth } from '../../tools/instance'
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from '@mui/material'
import GridFilm from '../../components/Grid/GridFilms'
import { type ResultsStarshipsEntity } from '../../interfaces/Starships'
import GridPeople from '../../components/Grid/GridPeople'
import { toast } from 'react-toastify'
import { StyledImage } from '../../css/stylesDetailsPage'
import { responseTypeState } from '../search/SearchPage'
import { useRecoilState } from 'recoil'

function StarshipDetailsPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [starship, setStarship] = useState<ResultsStarshipsEntity | null>(null)
  const [format, setFormat] = useRecoilState(responseTypeState)

  useEffect(() => {
    async function getStarship () {
      try {
        const response = await apiAuth().get(`/starships/${id}`)
        if (typeof response.data === 'string') {
          toast.warning('Impossible de récupérer les données en ' + format + '.')
          setFormat('json')
          return
        }
        setStarship(response.data)
      } catch (error: any) {
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          window.location.reload()
        } else {
          toast.error('Une erreur s\'est produite lors de la recherche.')
          navigate('/starships', { replace: true })
        }
      }
    }
    getStarship()
  }, [id, format, setFormat, navigate])

  if (starship == null) {
    return <>
            <Toolbar />
            <CircularProgress style={{ display: 'block', margin: 'auto' }}/>
        </>
  }
  return (
        <div>
            <Toolbar />
            <Card>
                <CardContent>
                    <Grid container spacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" fontWeight={'bold'} textAlign={'center'}>{starship.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledImage src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`} alt={starship.name} onError={(e: any) => { e.currentTarget.src = '/404.png' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" fontWeight={'bold'}>Informations</Typography>
                            <Typography>Modele: {starship.model}</Typography>
                            <Typography>Classe: {starship.starship_class}</Typography>
                            <Typography>Constructeur: {starship.manufacturer}</Typography>
                            <Typography>Longueur: {starship.length}</Typography>
                            <Typography>Equipage: {starship.crew}</Typography>
                            <Typography>Passagers: {starship.passengers}</Typography>
                            <Typography>Vitesse atmosphérique max: {starship.max_atmosphering_speed}</Typography>
                            <Typography>Capacité de chargement: {starship.cargo_capacity}</Typography>
                            <Typography>Consommation: {starship.consumables}</Typography>
                            <Typography>MGLT: {starship.MGLT}</Typography>
                            <Typography>Coût: {starship.cost_in_credits}</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} rowSpacing={2}>
                        {starship.films?.length && starship.films?.length > 0
                          ? (
                            <GridFilm films={starship.films} />
                            )
                          : null}
                        {starship.pilots?.length && starship.pilots?.length > 0
                          ? (
                            <GridPeople people={starship.pilots} />
                            )
                          : null}
                    </Grid>
                </CardContent>
            </Card>
        </div>
  )
}

export default StarshipDetailsPage
