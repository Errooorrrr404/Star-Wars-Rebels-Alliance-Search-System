import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#000000"
      color="#ffffff"
    >
      <Box textAlign="center">
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Ce ne sont pas les droids que vous recherchez.
        </Typography>
        <Typography variant="body1">
          La page que vous cherchez n'existe pas dans cette galaxie.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => { navigate('/', { replace: true }) }} style={{ margin: 'auto', marginTop: '26px', display: 'block' }}>
            Retour à l'accueil
        </Button>
        <img
          src="https://milnersblog.files.wordpress.com/2014/11/star-wars-at-at-walkers-gif-by-dkng.gif?w=474"
          alt="Star Wars GIF"
          style={{ maxWidth: '100%', marginTop: '20px', borderRadius: '6px', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  )
}

export default NotFoundPage
