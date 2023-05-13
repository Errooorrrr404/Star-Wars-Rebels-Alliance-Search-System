import { useEffect, useState } from "react";
import { apiAuthEmpty } from "../../tools/instance";
import dayjs from "dayjs";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { ResultsPeopleEntity } from "../../interfaces/People";
import Loader from "../Loader/Loader";

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)


interface Props {
    query: string;
}

function CardPeople(props: Props) {
    const { query } = props;
    const [results, setResults] = useState<ResultsPeopleEntity | null>(null);

    useEffect(() => {
        async function getPeople() {
            try {
                const response = await apiAuthEmpty.get(`${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la recherche.', error);
                setResults(null);
            }
        }
        getPeople();
    }, [query]);

    if (!results) {
        return <Loader />;
    }

    return (
        <div>
            {results && (
                <Card>
                    <CardContent>
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${query.split('/')[4]}.jpg`} alt={results.name} style={{width: '100%'}} onError={(e) => e.currentTarget.src = '/404.png'} />
                        <Typography variant="h6" fontWeight={"bold"}>{results.name}</Typography>
                        <Typography>Date d&apos;anniversaire: {results.birth_year}</Typography>
                        <Typography>Taille: {results.height}</Typography>
                        <Typography>Masse: {results.mass}</Typography>
                        <Button variant="contained" color="primary" href={`/people/${query.split('/')[4]}`} style={{display: 'block', margin: 'auto', textAlign: 'center'}}>
                            En savoir plus
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default CardPeople;