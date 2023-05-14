import React, { useEffect, useState } from 'react';
import { Typography, TextField, Card, CardContent } from '@mui/material';
import { apiAuth } from '../../tools/instance';
import DisplayResponse from './Response/Response';
import { ResultsFilmsEntity } from '../../interfaces/Films';
import { ResultsPeopleEntity } from '../../interfaces/People';
import { ResultPlanetsEntity } from '../../interfaces/Planets';
import { ResultsSpeciesEntity } from '../../interfaces/Species';
import { ResultsStarshipsEntity } from '../../interfaces/Starships';
import { ResultsVehiclesEntity } from '../../interfaces/Vehicles';
import { debounce } from 'lodash';
import { atom, useRecoilState } from 'recoil';
import Loader from '../../components/Loader/Loader';


export interface SearchResult {
  count: number;
  next: string | null;
  previous: null;
  results?: Array<ResultsPeopleEntity> | Array<ResultsFilmsEntity> | Array<ResultsSpeciesEntity> | Array<ResultsStarshipsEntity> | Array<ResultsVehiclesEntity> | Array<ResultPlanetsEntity>;
}

interface Props {
    type: 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';
}


export const pageState = atom({
  key: 'page', // unique ID (with respect to other atoms/selectors)
  default: '1', // valeur par défaut (alias valeur initials)
});


const SearchPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [page, setPage] = useRecoilState(pageState);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function getData(searchTerm: string) {
      try {
        setLoading(true);
        const response = await apiAuth.get(`/${props.type}/search?q=${searchTerm}&page=${page}`);
        setSearchResults(response.data);
      } catch (error) {
        if (page !== '1') {
          setPage('1');
          setSearchResults(null);
        } else {
          await getData(searchTerm);
        }
      } finally {
        setLoading(false);
      }
    }
    const delayDebounceFn = debounce(async (term: string) => {
      const searchItem = term.trim();
      if (searchItem.length === 0) {
          setSearchResults(null);
          return;
      }
      getData(searchItem)
    }, 700);

    if (searchTerm) {
      delayDebounceFn(searchTerm);
    }

    return () => {
      delayDebounceFn.cancel();
    };
  }, [searchTerm, page, props.type, setPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <TextField
            label="Rechercher"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
          {
            searchResults !== null && (
              <Typography variant="body2" color="text.secondary" style={{marginTop: 16}}>
                {searchResults.count} résultat(s) trouvé(s)
              </Typography>
            )
          }
        </CardContent>
      </Card>
      <div style={{marginTop: 16}}>
        {loading ? (
          <Loader />
        ) : (
          <DisplayResponse results={searchResults} type={props.type} />
        )}
        </div>
    </div>
  );
};

export default SearchPage;
