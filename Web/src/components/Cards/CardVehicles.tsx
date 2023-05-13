import { useEffect, useState } from "react";
import { apiAuthEmpty, baseURL } from "../../tools/instance";
import dayjs from "dayjs";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { ResultsVehiclesEntity } from "../../interfaces/Vehicles";
import Loader from "../Loader/Loader";

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)


interface Props {
    query: string;
}

function CardVehicles(props: Props) {
    const { query } = props;
    const [results, setResults] = useState<ResultsVehiclesEntity | null>(null);
    const [img, setImg] = useState<string>('');

    useEffect(() => {
        async function getFilm() {
            try {
                const response = await apiAuthEmpty.get(`${query}`);
                setResults(response.data);
                setImg(`https://starwars-visualguide.com/assets/img/vehicles/${response.data.url.replace(baseURL + '/vehicles', '').replace('/', '')}.jpg`)
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
                        <img src={img} alt={results.name} style={{width: '100%'}} onError={() => setImg('/404.png')} />
                        <Typography variant="h6" fontWeight={"bold"}>{results.name}</Typography>
                        <Typography>Modèle: {results.model}</Typography>
                        <Typography>Fabricant: {results.manufacturer}</Typography>
                        <Typography>Coût: {results.cost_in_credits} crédits</Typography>
                        <Typography>Longueur: {results.length}m</Typography>
                        <Button variant="contained" color="primary" href={query.replace(baseURL, '')} style={{display: 'block', margin: 'auto', textAlign: 'center'}}>
                            En savoir plus
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default CardVehicles;