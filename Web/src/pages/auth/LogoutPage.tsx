import React from 'react'
import { Grid, Paper, CircularProgress } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'

const LogoutPage = () => {
    let navigate = useNavigate();
    let auth = useAuth();

    React.useEffect(() => {
        setTimeout(() => {
            auth.signOut();
            navigate("/", { replace: true });
        }, 1500);

    }, [auth, navigate]);

    return(
        <Grid>
            <Paper elevation={10} style={{padding:16, margin: 'auto', width: 'fit-content', transform: 'translate(50%, 50%)'}}>
                <CircularProgress />
            </Paper>
        </Grid>
    )
}

export default LogoutPage;
