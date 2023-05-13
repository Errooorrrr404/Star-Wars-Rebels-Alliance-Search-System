import { Grid, Typography } from "@mui/material";
import { Key } from "react";
import CardVehicles from "../Cards/CardVehicles";

interface Props {
    vehicles: (string)[] | null;
}


function GridVehicles(props: Props) {
    const { vehicles } = props;
    if (!vehicles) {
        return null
    }
    return (
        <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" fontWeight={"bold"} textAlign={'center'}>Véhicules</Typography>
            <Grid container spacing={2} rowSpacing={2}>
                {vehicles?.map((vehicles: string, index: Key) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <CardVehicles query={vehicles} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default GridVehicles;