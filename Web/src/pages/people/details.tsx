import { useParams } from "react-router-dom";
import { ResultsPeopleEntity } from "../../interfaces/People";
import { useEffect, useState } from "react";
import { apiAuth } from "../../tools/instance";
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from "@mui/material";
import GridFilm from "../../components/Grid/GridFilms";
import GridSpecies from "../../components/Grid/GridSpecies";
import GridStarShip from "../../components/Grid/GridStarShip";
import GridVehicles from "../../components/Grid/GridVehicles";

function PeopleDetailPage() {
    const { id } = useParams()
    const [people, setPeople] = useState<ResultsPeopleEntity | null>(null)


    useEffect(() => {
        async function getPeople() {
            try {
            const response = await apiAuth.get(`/people/${id}`)
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
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={people.name} style={{height: 300, display: 'block', margin: 'auto'}} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Date d&apos;anniversaire: {people.birth_year}</p>
                            <p>Couleurs des yeux: {people.eye_color}</p>
                            <p>Couleur de peaux:  {people.skin_color}</p>
                            <p>Couleurs des cheveux: {people.hair_color}</p>
                            <p>Taille: {people.height}cm</p>
                            <p>Poids: {people.mass}kg</p>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} rowSpacing={2}>
                        {people.films?.length && people.films?.length > 0 ? (
                            <GridFilm films={people.films} />
                        ) : null}
                        {people.starships?.length && people.starships?.length > 0 ? (
                            <GridStarShip starships={people.starships} />
                        ) : null}
                        {people.species?.length && people.species?.length > 0 ? (
                            <GridSpecies species={people.species} />
                        ) : null}
                        {people.vehicles?.length && people.vehicles?.length > 0 ? (
                            <GridVehicles vehicles={people.vehicles} />
                        ) : null}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default PeopleDetailPage;