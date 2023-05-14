import React from 'react'
import { Grid, Paper, TextField, Typography, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [nbInvalid, setNbInvalid] = React.useState(1)
  const [success, setSuccess] = React.useState(false)

  const handleSignIn = async () => {
    return await signIn(login, password)
  }

  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const response = await handleSignIn()
    setTimeout(() => {
      if (response) {
        setSuccess(true)
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 2000)
      } else {
        setSuccess(false)
        setNbInvalid(nbInvalid + 1)
        if (nbInvalid >= 3) {
          toast.error("Un membre de la Rébellion ne peut pas se tromper autant de fois. Tu es un espion de l'Empire. Tu vas être déconnecté.")
          setTimeout(() => {
            navigate('/locked', { replace: true })
          }
            , 5000)
        } else {
          toast.error("Mauvais identifiants. Serais-tu un espion de l'Empire ?")
        }
      }
      setLoading(false)
    }, 1000)
  }
  const paperStyle = { width: '100%', maxWidth: 700, padding: 16, margin: 'auto' }
  const btnstyle = { margin: '8px 0' }
  const inputStyle = { margin: '8px 0' }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh">
      <Box textAlign="center">
        {
          success
            ? (
              <>
                <Typography variant="h4" component="h2" gutterBottom>
                  Tu es maintenant connecté. Redirection en cours...
                </Typography>
                <img src="https://static.wixstatic.com/media/209473_b076ac597b3445bfac8829c4034899e4~mv2.gif" alt="Star Wars GIF" style={{ maxWidth: '100%', marginTop: '20px', borderRadius: '6px', objectFit: 'cover' }} />
              </>
            )
            : (
              <Grid>
                <Paper elevation={10} style={paperStyle}>
                  <Grid>
                    <h2>Connecte-toi Rebelle !</h2>
                  </Grid>
                  <form onSubmit={handleSubmit}>
                    <TextField label='Login' placeholder='Obi Wan' variant="outlined" fullWidth required style={inputStyle} onChange={(e) => { setLogin(e.target.value) }} />
                    <TextField label='Mot de passe' placeholder='Meilleur-Jedi-De-La-Galaxie' type='password' variant="outlined" fullWidth required style={inputStyle} onChange={(e) => { setPassword(e.target.value) }} />
                    <LoadingButton type='submit' color='primary' variant="contained" style={btnstyle} fullWidth loading={loading} disabled={nbInvalid > 3}>Rejoindre la Rébellion</LoadingButton>
                  </form>
                </Paper>
              </Grid>
            )
        }
      </Box>
    </Box>
  )
}

export default LoginPage
