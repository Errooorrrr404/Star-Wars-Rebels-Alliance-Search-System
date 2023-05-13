import React, { useState } from 'react';
import { Typography, TextField, CircularProgress } from '@mui/material';
import { apiAuth } from '../../tools/instance';
import DisplayResponse from './Response/Response';
import { ResultsFilmsEntity } from '../../interfaces/Films';
import { ResultsPeopleEntity } from '../../interfaces/People';
import { ResultPlanetsEntity } from '../../interfaces/Planets';
import { ResultsSpeciesEntity } from '../../interfaces/Species';
import { ResultsStarshipsEntity } from '../../interfaces/Starships';
import { ResultsVehiclesEntity } from '../../interfaces/Vehicles';


export interface SearchResult {
  count: number;
  next?: null;
  previous?: null;
  results?: Array<ResultsPeopleEntity> | Array<ResultsFilmsEntity> | Array<ResultsSpeciesEntity> | Array<ResultsStarshipsEntity> | Array<ResultsVehiclesEntity> | Array<ResultPlanetsEntity>;
}

interface Props {
    type: 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';
}


const SearchPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = debounce(async (value: string) => {
    const searchItem = value.trim();
    if (searchItem.length === 0) {
        setSearchResults(null);
        return;
    }
    try {
      setLoading(true);
      const response = await apiAuth.get(`/${props.type}/search?q=${searchItem}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la recherche.', error);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  }, 700);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div>
      <TextField
        label="Rechercher"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
      {loading ? (
        <>
            <Typography variant="h5" gutterBottom>
                Chargement...
            </Typography>
            <CircularProgress />
        </>
      ) : (
        <DisplayResponse results={searchResults} type={props.type} />
      )}
    </div>
  );
};

export default SearchPage;
