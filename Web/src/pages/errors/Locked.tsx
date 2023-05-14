import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Locked: React.FC = () => {
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
          403
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Accès refusé aux membres de l'Empire
        </Typography>

        <Button variant="contained" color="primary" onClick={() => { navigate('/', { replace: true }) }} style={{ margin: 'auto', marginTop: '26px', display: 'block' }}>
          Retour à l'accueil
        </Button>
        <img
          src="https://mickeyblog.com/wp-content/uploads/2020/06/b6018dfa07dfe4a7c975d3cae0746a552c3adeda_hq-1.gif"
          alt="Star Wars GIF"
          style={{ maxWidth: '100%', marginTop: '20px', borderRadius: '6px', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  )
}

export default Locked
