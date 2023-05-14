import { useEffect, useState } from 'react'
import { type ResultsFilmsEntity } from '../../interfaces/Films'
import { apiAuthEmpty } from '../../tools/instance'
import dayjs from 'dayjs'
import { CardContent, Typography } from '@mui/material'
import Loader from '../Loader/Loader'
import { StyledCard, StyledImage, StyledButton } from './styles'
import { toast } from 'react-toastify'

const localizedFormat = require('dayjs/plugin/localizedFormat')
require('dayjs/locale/fr')
dayjs.extend(localizedFormat)

interface Props {
  query: string
}

function CardFilm (props: Props) {
  const { query } = props
  const [results, setResults] = useState<ResultsFilmsEntity | null>(null)
  const [episode, setEpisode] = useState<number>(1)

  useEffect(() => {
    async function getFilm () {
      try {
        const response = await apiAuthEmpty.get(`${query}`)
        setResults(response.data)
        const episode = response.data.episode_id
        if (episode <= 3) {
          setEpisode(episode + 3)
        } else if (episode <= 6) {
          setEpisode(episode - 3)
        } else {
          setEpisode(episode)
        }
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
                    <StyledImage src={`https://starwars-visualguide.com/assets/img/films/${episode}.jpg`} alt={results.title} style={{ width: '100%' }} onError={(e: any) => e.currentTarget.src = '/404.png'} />
                        <Typography variant="h6" fontWeight={'bold'}>{results.episode_id}. {results.title}</Typography>
                        <Typography>Date de sortie: {dayjs(results.release_date).locale('fr').format('LL')}</Typography>
                        <Typography>Réalisateur: {results.director}</Typography>
                        <Typography>Producteur: {results.producer}</Typography>
                        <StyledButton variant="contained" color="primary" href={`/films/${episode}`}>
                            En savoir plus
                        </StyledButton>
                    </CardContent>
                </StyledCard>
            )}
        </div>
  )
}

export default CardFilm
