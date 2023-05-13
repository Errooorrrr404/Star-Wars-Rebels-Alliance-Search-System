import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiAuth } from "../../tools/instance";
import { Card, CardContent, CircularProgress, Grid, Toolbar, Typography } from "@mui/material";
import GridFilm from "../../components/Grid/GridFilms";
import { ResultsSpeciesEntity } from "../../interfaces/Species";
import GridPlanets from "../../components/Grid/GridPlanets";

function SpeciesDetailsPage() {
    const { id } = useParams()
    const [species, setSpecies] = useState<ResultsSpeciesEntity | null>(null)


    useEffect(() => {
        async function getSpecies() {
            try {
            const response = await apiAuth.get(`/species/${id}`)
            console.log(response.data)
            setSpecies(response.data)
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la recherche.', error);
            }
        }
        getSpecies()
    }, [id])

    if (!species) {
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
                            <Typography variant="h4" fontWeight={"bold"} textAlign={'center'}>{species.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img src={`https://starwars-visualguide.com/assets/img/species/${id}.jpg`} alt={species.name} style={{height: 300, display: 'block', margin: 'auto'}} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" fontWeight={"bold"}>Informations</Typography>
                            <Typography>Classification: {species.classification}</Typography>
                            <Typography>Designation: {species.designation}</Typography>
                            <Typography>Langue: {species.language}</Typography>
                            <Typography>Esperance de vie: {species.average_lifespan}</Typography>
                            <Typography>Hauteur moyenne: {species.average_height}</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} rowSpacing={2}>
                        {species.films?.length && species.films?.length > 0 ? (
                            <GridFilm films={species.films} />
                        ) : null}
                        {species.homeworld ? (
                            <GridPlanets planets={[species.homeworld]} />
                        ) : null}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default SpeciesDetailsPage;