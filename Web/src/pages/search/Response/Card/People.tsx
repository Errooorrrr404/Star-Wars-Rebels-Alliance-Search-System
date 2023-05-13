import { Button, Card, Grid, Typography } from "@mui/material";
import { SearchResult } from "../../SearchPage";
import { Key } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../tools/instance";

interface Props {
    results: SearchResult | null;
}

const DisplayAnswerPeople = (props: Props) => {
    const navigate = useNavigate();
    if (!props.results) {
        return null;
    }
    return (
       <Grid container spacing={2} rowSpacing={2}>
         <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom>
                Nombre de résultats : {props.results.count}
            </Typography>
         </Grid>
        <Grid item xs={4}>
            {props.results.previous !== null &&
                <Button variant="contained" color="primary">
                    Résultats Précédents
                </Button>
            }
            </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
            {props.results.next !== null &&
                <Button variant="contained" color="primary">
                    Résultats Suivants
                </Button>
            }
        </Grid>
              {
                props.results.results && props.results.results.map((result: any, index: Key) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card style={{padding: 6, width: "100%"}}>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        {result.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Taille : {result.height}cm
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Poids : {result.mass}kg
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={() => {navigate(result.url.replace(baseURL, ''), {replace: true})}}>
                                        Voir plus
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))
                }
       </Grid>
    );
};

export default DisplayAnswerPeople;