import { CssBaseline, Typography, Button, Grid, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {

  window?: () => Window
}

const categories = [
  {
    title: 'Rechercher un véhicule',
    image: 'https://starwars-visualguide.com/assets/img/vehicles/8.jpg',
    link: '/vehicles'
  },
  {
    title: 'Rechercher un personnage',
    image: 'https://starwars-visualguide.com/assets/img/characters/10.jpg',
    link: '/people'
  },
  {
    title: 'Rechercher une planète',
    image: 'https://starwars-visualguide.com/assets/img/planets/10.jpg',
    link: '/planets'
  },
  {
    title: 'Rechercher une espèce',
    image: 'https://starwars-visualguide.com/assets/img/species/1.jpg',
    link: '/species'
  },
  {
    title: 'Rechercher un film',
    image: 'https://starwars-visualguide.com/assets/img/films/1.jpg',
    link: '/films'
  },
  {
    title: 'Rechercher un vaisseau',
    image: 'https://starwars-visualguide.com/assets/img/starships/10.jpg',
    link: '/starships'
  }
]

function HomePage(props: Props) {
  const navigate = useNavigate()
  return (
    <>
      <CssBaseline />
      <h1>Bienvenue sur Star Wars Search</h1>
      <h2>Que souhaitez-vous faire ?</h2>
      <Grid container spacing={2} rowSpacing={2}>
        {categories.map((category, index) => (<Grid item xs={4}>
          <Card key={index}>
            <CardContent>
              <Typography variant="h5" component="div" textAlign={'center'}>
                {category.title}
              </Typography>
              <CardMedia
                component="img"
                height={250}
                image={category.image}
                alt="Véhicule"
                style={{ borderRadius: 6, objectFit: 'cover' }}
              />
            </CardContent>
            <CardActions>
              <Button type="button" variant="contained" onClick={() => { navigate(category.link, { replace: true }) }} size="small"
                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>Accéder à la base</Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomePage
