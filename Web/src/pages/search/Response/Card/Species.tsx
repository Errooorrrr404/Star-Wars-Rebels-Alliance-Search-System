import { Button, Grid, Typography } from '@mui/material'
import { type SearchResult, pageState } from '../../SearchPage'
import { type Key } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../../../tools/instance'
import { useRecoilState } from 'recoil'
import { StyledAvatar, StyledButton, StyledCard, StyledImage } from './styles'

interface Props {
  results: SearchResult | null
}

const DisplayAnswerSpecies = (props: Props) => {
  const [, setPage] = useRecoilState(pageState)

  const navigate = useNavigate()
  if (props.results == null) {
    return null
  }

  const updatePage = (mode: string) => {
    let url = ''

    if (props.results === null) {
      return
    }

    if (mode === 'prev' && props.results.previous !== null) {
      url = props.results.previous
    } else if (mode === 'next' && props.results.next !== null) {
      url = props.results.next
    } else {
      return
    }
    const newPage = new URL(url).searchParams.get('page')

    if (newPage !== null) {
      setPage(newPage)
    }
  }
  return (
       <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={4}>
            {props.results.previous !== null
              ? <Button variant="contained" color="primary" onClick={() => { updatePage('prev') }}>
                    Résultats Précédents
                </Button>
              : null}
            </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
            {props.results.next !== null &&
                <Button variant="contained" color="primary" onClick={() => { updatePage('next') }}>
                Résultats Suivants
                </Button>
            }
        </Grid>
              {
                (props.results.results != null) && props.results.results.map((result: any, index: Key) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <StyledCard>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <StyledAvatar alt={result.name} src={`https://starwars-visualguide.com/assets/img/${result.url.replace(baseURL, '')}.jpg`}>
                                        <StyledImage src={'https://starwars-visualguide.com/assets/img/placeholder.jpg'} alt={result.name} />
                                    </StyledAvatar>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        {result.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom>
                                        Classification : {result.classification}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom>
                                        Langue : {result.language}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledButton variant="contained" color="primary" onClick={() => { navigate(result.url.replace(baseURL, ''), { replace: true }) }}>
                                        Voir plus
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>
                ))
                }
       </Grid>
  )
}

export default DisplayAnswerSpecies
