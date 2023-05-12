import React from 'react'
import { LockOutlined } from '@mui/icons-material'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, FormControl, FormHelperText, Input, InputLabel, CircularProgress } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'

const LogoutPage = () => {
    let navigate = useNavigate();
    let auth = useAuth();

    React.useEffect(() => {
        setTimeout(() => {
            auth.signOut();
            navigate("/", { replace: true });
        }, 1500);

    }, []);

    return(
        <Grid>
            <Paper elevation={10} style={{padding:16, margin: 'auto', width: 'fit-content', transform: 'translate(50%, 50%)'}}>
                <CircularProgress />
            </Paper>
        </Grid>
    )
}

export default LogoutPage;
