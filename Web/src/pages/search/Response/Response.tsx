import { type SearchResult } from '../SearchPage'
import DisplayAnswerFilms from './Card/Films'
import DisplayAnswerPeople from './Card/People'
import DisplayAnswerPlanets from './Card/Planets'
import DisplayAnswerSpecies from './Card/Species'
import DisplayAnswerStarships from './Card/Starships'
import DisplayAnswerVehicles from './Card/Vehicles'

interface Props {
  type: 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets'
  results: SearchResult | null
}

const DisplayResponse = (props: Props) => {
  const { results } = props
  switch (props.type) {
    case 'people':
      return <DisplayAnswerPeople results={results} />
    case 'films':
      return <DisplayAnswerFilms results={results} />
    case 'starships':
      return <DisplayAnswerStarships results={results} />
    case 'vehicles':
      return <DisplayAnswerVehicles results={results} />
    case 'species':
      return <DisplayAnswerSpecies results={results} />
    case 'planets':
      return <DisplayAnswerPlanets results={results} />
    default:
      return null
  }
}

export default DisplayResponse
