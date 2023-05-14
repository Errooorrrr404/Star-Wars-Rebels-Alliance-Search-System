import { useEffect, useState } from 'react'
import { apiAuthEmpty } from '../../tools/instance'
import dayjs from 'dayjs'
import { CardContent, Typography } from '@mui/material'
import { type ResultsPeopleEntity } from '../../interfaces/People'
import Loader from '../Loader/Loader'
import { StyledCard, StyledImage, StyledButton } from './styles'
import { toast } from 'react-toastify'

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)

interface Props {
  query: string
}

function CardPeople (props: Props) {
  const { query } = props
  const [results, setResults] = useState<ResultsPeopleEntity | null>(null)

  useEffect(() => {
    async function getPeople () {
      try {
        const response = await apiAuthEmpty.get(`${query}`)
        setResults(response.data)
      } catch (error) {
        toast.error('Une erreur s\'est produite lors de la recherche.')
        setResults(null)
      }
    }
    getPeople()
  }, [query])

  if (results == null) {
    return <Loader />
  }

  return (
        <div>
            {results && (
                <StyledCard>
                    <CardContent>
                        <StyledImage src={`https://starwars-visualguide.com/assets/img/characters/${query.split('/')[4]}.jpg`} alt={results.name} style={{ width: '100%' }} onError={(e: any) => e.currentTarget.src = '/404.png'} />
                        <Typography variant="h6" fontWeight={'bold'}>{results.name}</Typography>
                        <Typography>Date d&apos;anniversaire: {results.birth_year}</Typography>
                        <Typography>Taille: {results.height}</Typography>
                        <Typography>Masse: {results.mass}</Typography>
                        <StyledButton variant="contained" color="primary" href={`/people/${query.split('/')[4]}`}>
                            En savoir plus
                        </StyledButton>
                    </CardContent>
                </StyledCard>
            )}
        </div>
  )
}

export default CardPeople
