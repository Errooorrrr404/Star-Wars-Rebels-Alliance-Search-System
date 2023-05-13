import { useEffect, useState } from "react";
import { apiAuthEmpty, baseURL } from "../../tools/instance";
import dayjs from "dayjs";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { ResultsSpeciesEntity } from "../../interfaces/Species";
import Loader from "../Loader/Loader";

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)


interface Props {
    query: string;
}

function CardSpecies(props: Props) {
    const { query } = props;
    const [results, setResults] = useState<ResultsSpeciesEntity | null>(null);

    useEffect(() => {
        async function getFilm() {
            try {
                const response = await apiAuthEmpty.get(`${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la recherche.', error);
                setResults(null);
            }
        }
        getFilm();
    }, [query]);

    if (!results) {
        return <Loader />;
    }
    return (
        <div>
            {results && (
                <Card>
                    <CardContent>
                        <img src={`https://starwars-visualguide.com/assets/img/species/${results.url.replace(baseURL + '/species', '').replace('/', '')}.jpg`} alt={results.name} style={{width: '100%'}} onError={(e) => {e.currentTarget.src = '/404.png'}} />
                        <Typography variant="h6" fontWeight={"bold"}>{results.name}</Typography>
                        <Typography>Classification: {results.classification}</Typography>
                        <Typography>Désignation: {results.designation}</Typography>
                        <Typography>Langue: {results.language}</Typography>
                        <Button variant="contained" color="primary" href={query.replace(baseURL, '')} style={{display: 'block', margin: 'auto', textAlign: 'center'}}>
                            En savoir plus
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default CardSpecies;