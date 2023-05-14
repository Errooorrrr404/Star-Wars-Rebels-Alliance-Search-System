import { useEffect, useState } from 'react'
import { apiAuthEmpty, baseURL } from '../../tools/instance'
import dayjs from 'dayjs'
import { CardContent, Typography } from '@mui/material'
import { type ResultsStarshipsEntity } from '../../interfaces/Starships'
import Loader from '../Loader/Loader'
import { StyledCard, StyledImage, StyledButton } from './styles'
import { toast } from 'react-toastify'

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)

interface Props {
  query: string
}

function CardStarShip(props: Props) {
  const { query } = props
  const [results, setResults] = useState<ResultsStarshipsEntity | null>(null)

  useEffect(() => {
    async function getFilm() {
      try {
        const response = await apiAuthEmpty.get(`${query}`)
        setResults(response.data)
      } catch (error) {
        toast.error('Une erreur s\'est produite lors de la recherche.')
        setResults(null)
      }
    }
    getFilm()
  }, [query])

  if (results == null) {
    return <Loader />
  }
  return (
    <div>
      {results && (
        <StyledCard>
          <CardContent>
            <StyledImage src={`https://starwars-visualguide.com/assets/img/starships/${results.url.replace(baseURL + '/starships', '').replace('/', '')}.jpg`} alt={results.name} onError={(e: any) => { e.currentTarget.src = '/404.png' }} />
            <Typography variant="h6" fontWeight={'bold'}>{results.name}</Typography>
            <Typography>Modèle: {results.model}</Typography>
            <Typography>Fabricant: {results.manufacturer}</Typography>
            <Typography>Coût: {results.cost_in_credits} crédits</Typography>
            <Typography>Longueur: {results.length}m</Typography>
            <StyledButton variant="contained" color="primary" href={query.replace(baseURL, '')}>
              En savoir plus
            </StyledButton>
          </CardContent>
        </StyledCard>
      )}
    </div>
  )
}

export default CardStarShip
