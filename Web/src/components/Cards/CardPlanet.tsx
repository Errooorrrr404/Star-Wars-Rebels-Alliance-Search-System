import { useEffect, useState } from 'react'
import { apiAuthEmpty } from '../../tools/instance'
import dayjs from 'dayjs'
import { CardContent, Typography } from '@mui/material'
import { type ResultPlanetsEntity } from '../../interfaces/Planets'
import Loader from '../Loader/Loader'
import { StyledCard, StyledImage, StyledButton } from './styles'
import { toast } from 'react-toastify'

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)

interface Props {
  query: string
}

function CardPlanet (props: Props) {
  const { query } = props
  const [results, setResults] = useState<ResultPlanetsEntity | null>(null)

  useEffect(() => {
    async function getPlanet () {
      try {
        const response = await apiAuthEmpty.get(`${query}`)
        setResults(response.data)
      } catch (error) {
        toast.error('Une erreur s\'est produite lors de la recherche.')
        setResults(null)
      }
    }
    getPlanet()
  }, [query])

  if (results == null) {
    return <Loader />
  }

  return (
        <div>
            {results && (
                <StyledCard>
                    <CardContent>
                        <StyledImage src={`https://starwars-visualguide.com/assets/img/planets/${query.split('/')[4]}.jpg`} alt={results.name} onError={(e: any) => e.currentTarget.src = '/404.png'} />
                        <Typography variant="h6" fontWeight={'bold'}>{results.name}</Typography>
                        <Typography>Population: {results.population}</Typography>
                        <Typography>Climat: {results.climate}</Typography>
                        <Typography>Diamètre: {results.diameter}</Typography>
                        <StyledButton variant="contained" color="primary" href={`/planets/${query.split('/')[4]}`}>
                            En savoir plus
                        </StyledButton>
                    </CardContent>
                </StyledCard>
            )}
        </div>
  )
}

export default CardPlanet
