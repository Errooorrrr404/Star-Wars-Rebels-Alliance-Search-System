import { Grid, Typography } from "@mui/material";
import { Key } from "react";
import CardPeople from "../Cards/CardPeople";

interface Props {
    people: (string)[] | null;
}


function GridPeople(props: Props) {
    const { people } = props;
    if (!people) {
        return null
    }
    return (
        <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" fontWeight={"bold"} textAlign={'center'}>Personnages</Typography>
            <Grid container spacing={2} rowSpacing={2}>
                {people?.map((character: string, index: Key) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <CardPeople query={character} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default GridPeople;