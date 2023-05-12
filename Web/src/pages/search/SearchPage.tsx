import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, CircularProgress } from '@mui/material';
import { apiAuth } from '../../tools/instance';
import DisplayResponse from './Components/Response';

interface SearchResult {
  id: number;
  title: string;
}

interface Props {
    type: 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';
}


const SearchPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);
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
        setSearchResults([]);
        return;
    }
    try {
      setLoading(true);
      const response = await apiAuth.get(`/${props.type}/search?q=${searchItem}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la recherche.', error);
      setSearchResults([]);
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
