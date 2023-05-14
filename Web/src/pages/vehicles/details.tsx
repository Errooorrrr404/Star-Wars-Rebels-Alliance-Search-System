import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiAuth } from '../../tools/instance'
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from '@mui/material'
import GridFilm from '../../components/Grid/GridFilms'
import { type ResultsVehiclesEntity } from '../../interfaces/Vehicles'
import GridPeople from '../../components/Grid/GridPeople'
import { toast } from 'react-toastify'
import { StyledImage } from '../../css/stylesDetailsPage'
import { useRecoilState } from 'recoil'
import { responseTypeState } from '../search/SearchPage'

function VehiclesDetailPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [people, setPeople] = useState<ResultsVehiclesEntity | null>(null)
  const [format, setFormat] = useRecoilState(responseTypeState)

  useEffect(() => {
    async function getPeople () {
      try {
        const response = await apiAuth.get(`/vehicles/${id}`)
        if (typeof response.data === 'string') {
          toast.warning('Impossible de récupérer les données en ' + format + '.')
          setFormat('json')
          return
        }
        setPeople(response.data)
      } catch (error) {
        toast.error('Une erreur s\'est produite lors de la recherche.')
        navigate('/vehicles', { replace: true })
      }
    }
    getPeople()
  }, [id, format, setFormat, navigate])

  if (people == null) {
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
                            <Typography variant="h4" fontWeight={'bold'} textAlign={'center'}>{people.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledImage src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`} alt={people.name} onError={(e: any) => { e.currentTarget.src = '/404.png' }}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Modèle: {people.model}</p>
                            <p>Fabricant: {people.manufacturer}</p>
                            <p>Coût: {people.cost_in_credits}crédits</p>
                            <p>Longueur: {people.length}m</p>
                            <p>Vitesse maximale atmosphérique: {people.max_atmosphering_speed}km/h</p>
                            <p>Équipage: {people.crew}</p>
                            <p>Passagers: {people.passengers}</p>
                            <p>Capacité de chargement: {people.cargo_capacity}kg</p>
                            <p>Consommables: {people.consumables}</p>
                            <p>Classe de véhicule: {people.vehicle_class}</p>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} rowSpacing={2}>
                        {people.films?.length && people.films?.length > 0
                          ? (
                            <GridFilm films={people.films} />
                            )
                          : null}
                    </Grid>
                    <Grid container spacing={2} rowSpacing={2}>
                        {people.pilots?.length && people.pilots?.length > 0
                          ? (
                            <GridPeople people={people.pilots} />
                            )
                          : null}
                    </Grid>
                </CardContent>
            </Card>
        </div>
  )
}

export default VehiclesDetailPage
