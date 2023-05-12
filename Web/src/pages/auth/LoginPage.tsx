import React from 'react'
import { LockOutlined } from '@mui/icons-material'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'

const LoginPage = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const { signIn } = useAuth();

    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSignIn = async () => {
      return await signIn(login, password);
    };

    let from = location.state?.from?.pathname || "/";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const response = await handleSignIn();
        setTimeout(() => {
            if (response) {
                navigate(from, { replace: true });
            }
            setLoading(false);
        }, 1000);

    }
    const paperStyle={width:'90%', maxWidth: 700, padding:16, margin: 'auto'}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const inputStyle={margin:'8px 0'}

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                     <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required style={inputStyle} onChange={(e) => setLogin(e.target.value)}/>
                    <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required style={inputStyle} onChange={(e) => setPassword(e.target.value)}/>
                    <LoadingButton type='submit' color='primary' variant="contained" style={btnstyle} fullWidth loading={loading}>Sign in</LoadingButton>
                </form>
            </Paper>
        </Grid>
    )
}

export default LoginPage;
