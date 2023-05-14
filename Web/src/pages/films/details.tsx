import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiAuth } from '../../tools/instance'
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from '@mui/material'
import GridSpecies from '../../components/Grid/GridSpecies'
import GridStarShip from '../../components/Grid/GridStarShip'
import GridVehicles from '../../components/Grid/GridVehicles'
import GridPeople from '../../components/Grid/GridPeople'
import dayjs from 'dayjs'
import { type ResultsFilmsEntity } from '../../interfaces/Films'
import GridPlanets from '../../components/Grid/GridPlanets'
import { toast } from 'react-toastify'
import { StyledImage } from '../../css/stylesDetailsPage'
import { useRecoilState } from 'recoil'
import { responseTypeState } from '../search/SearchPage'

function FilmsDetailPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [format, setFormat] = useRecoilState(responseTypeState)
  const [film, setFilm] = useState<ResultsFilmsEntity | null>(null)
  const [episode, setEpisode] = useState<number>(1)

  useEffect(() => {
    async function getFilm () {
      try {
        const response = await apiAuth.get(`/films/${id}?format=${format}`)
        if (typeof response.data === 'string') {
          toast.warning('Impossible de récupérer les données en ' + format + '.')
          setFormat('json')
          return
        }
        setFilm(response.data)
        const episode = response.data.episode_id
        if (episode <= 3) {
          setEpisode(episode + 3)
        } else if (episode <= 6) {
          setEpisode(episode - 3)
        } else {
          setEpisode(episode)
        }
      } catch (error) {
        toast.error('Une erreur s\'est produite lors de la recherche.')
        navigate('/films', { replace: true })
      }
    }
    getFilm()
  }, [id, format, setFormat, navigate])

  if (film == null) {
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
                            <Typography variant="h4" fontWeight={'bold'} textAlign={'center'}>{film.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledImage src={`https://starwars-visualguide.com/assets/img/films/${episode}.jpg`} alt={film.title} onError={(e: any) => { e.currentTarget.src = '/404.png' }}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" fontWeight={'bold'}>Informations</Typography>
                            <Typography>Episode: {film.episode_id}</Typography>
                            <Typography>Date de sortie: {dayjs(film.release_date).locale('fr').format('LL')}</Typography>
                            <Typography>Réalisateur: {film.director}</Typography>
                            <Typography>Producteur: {film.producer}</Typography>
                            <Typography>Nombre de personnages: {film.characters?.length}</Typography>
                            <Typography>Nombre de planètes: {film.planets?.length}</Typography>
                            <Typography>Nombre de vaisseaux: {film.starships?.length}</Typography>
                            <Typography>Nombre de véhicules: {film.vehicles?.length}</Typography>
                            <Typography>Nombre d'espèces: {film.species?.length}</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} rowSpacing={2}>
                        {film.characters?.length && film.characters?.length > 0
                          ? (
                            <GridPeople people={film.characters} />
                            )
                          : null}
                        {film.starships?.length && film.starships?.length > 0
                          ? (
                            <GridStarShip starships={film.starships} />
                            )
                          : null}
                        {film.species?.length && film.species?.length > 0
                          ? (
                            <GridSpecies species={film.species} />
                            )
                          : null}
                        {film.vehicles?.length && film.vehicles?.length > 0
                          ? (
                            <GridVehicles vehicles={film.vehicles} />
                            )
                          : null}
                        {film.planets?.length && film.planets?.length > 0
                          ? (
                            <GridPlanets planets={film.planets} />
                            )
                          : null}
                    </Grid>
                </CardContent>
            </Card>
        </div>
  )
}

export default FilmsDetailPage
