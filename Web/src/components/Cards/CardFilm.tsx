import { useEffect, useState } from "react";
import { ResultsFilmsEntity } from "../../interfaces/Films";
import { apiAuthEmpty } from "../../tools/instance";
import dayjs from "dayjs";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Loader from "../Loader/Loader";

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)


interface Props {
    query: string;
}

function CardFilm(props: Props) {
    const { query } = props;
    const [results, setResults] = useState<ResultsFilmsEntity | null>(null);
    const [episode, setEpisode] = useState<number>(1);

    useEffect(() => {
        async function getFilm() {
            try {
                const response = await apiAuthEmpty.get(`${query}`);
                setResults(response.data);
                const episode = response.data.episode_id;
                if (episode <= 3) {
                    setEpisode(episode + 3);
                } else if (episode <= 6){
                    setEpisode(episode - 3);
                } else {
                    setEpisode(episode);
                }
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
                    <img src={`https://starwars-visualguide.com/assets/img/films/${episode}.jpg`} alt={results.title} style={{width: '100%'}} onError={(e) => e.currentTarget.src = '/404.png'} />
                        <Typography variant="h6" fontWeight={"bold"}>{results.episode_id}. {results.title}</Typography>
                        <Typography>Date de sortie: {dayjs(results.release_date).locale('fr').format('LL')}</Typography>
                        <Typography>Réalisateur: {results.director}</Typography>
                        <Typography>Producteur: {results.producer}</Typography>
                        <Button variant="contained" color="primary" href={`/films/${episode}`} style={{display: 'block', margin: 'auto', textAlign: 'center'}}>
                            En savoir plus
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default CardFilm;