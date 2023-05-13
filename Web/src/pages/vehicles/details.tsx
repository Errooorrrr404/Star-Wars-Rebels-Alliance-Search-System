import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiAuth } from "../../tools/instance";
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from "@mui/material";
import GridFilm from "../../components/Grid/GridFilms";
import { ResultsVehiclesEntity } from "../../interfaces/Vehicles";
import GridPeople from "../../components/Grid/GridPeople";

function VehiclesDetailPage() {
    const { id } = useParams()
    const [people, setPeople] = useState<ResultsVehiclesEntity | null>(null)


    useEffect(() => {
        async function getPeople() {
            try {
            const response = await apiAuth.get(`/vehicles/${id}`)
            console.log(response.data)
            setPeople(response.data)
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la recherche.', error);
            }
        }
        getPeople()
    }, [id])

    if (!people) {
        return <>
            <Toolbar />
            <CircularProgress style={{display: 'block', margin: 'auto'}}/>
        </>
    }
    return (
        <div>
            <Toolbar />
            <Card>
                <CardContent>
                    <Grid container spacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" fontWeight={"bold"} textAlign={'center'}>{people.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`} alt={people.name} style={{height: 300, display: 'block', margin: 'auto'}} />
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
                        {people.films?.length && people.films?.length > 0 ? (
                            <GridFilm films={people.films} />
                        ) : null}
                    </Grid>
                    <Grid container spacing={2} rowSpacing={2}>
                        {people.pilots?.length && people.pilots?.length > 0 ? (
                            <GridPeople people={people.pilots} />
                        ) : null}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default VehiclesDetailPage;