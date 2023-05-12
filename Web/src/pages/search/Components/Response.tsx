import DisplayAnswerFilms from "./Films";
import DisplayAnswerPeople from "./People";
import DisplayAnswerPlanets from "./Planets";
import DisplayAnswerSpecies from "./Species";
import DisplayAnswerStarships from "./Starships";
import DisplayAnswerVehicles from "./Vehicles";

interface Props {
    type: 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';
    results: any;
}

const DisplayResponse = (props: Props) => {
  const { results } = props;
  switch (props.type) {
    case 'people':
        return <DisplayAnswerPeople results={results} />;
    case 'films':
        return <DisplayAnswerFilms results={results} />;
    case 'starships':
        return <DisplayAnswerStarships results={results} />;
    case 'vehicles':
        return <DisplayAnswerVehicles results={results} />;
    case 'species':
        return <DisplayAnswerSpecies results={results} />;
    case 'planets':
        return <DisplayAnswerPlanets results={results} />;
    default:
        return null;
    }
};

export default DisplayResponse;