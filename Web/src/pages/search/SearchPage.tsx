import React, { useEffect, useState } from 'react'
import { Typography, TextField, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Grid, type SelectChangeEvent } from '@mui/material'
import { apiAuth } from '../../tools/instance'
import DisplayResponse from './Response/Response'
import { type ResultsFilmsEntity } from '../../interfaces/Films'
import { type ResultsPeopleEntity } from '../../interfaces/People'
import { type ResultPlanetsEntity } from '../../interfaces/Planets'
import { type ResultsSpeciesEntity } from '../../interfaces/Species'
import { type ResultsStarshipsEntity } from '../../interfaces/Starships'
import { type ResultsVehiclesEntity } from '../../interfaces/Vehicles'
import { debounce } from 'lodash'
import { atom, useRecoilState } from 'recoil'
import Loader from '../../components/Loader/Loader'
import { toast } from 'react-toastify'

export interface SearchResult {
  count: number
  next: string | null
  previous: string | null
  results?: ResultsPeopleEntity[] | ResultsFilmsEntity[] | ResultsSpeciesEntity[] | ResultsStarshipsEntity[] | ResultsVehiclesEntity[] | ResultPlanetsEntity[]
}

export interface SearchResultWookiee {
  oaoohuwhao: number
  whwokao: string | null
  akrcwohoahoohuc: string | null
  rcwochuanaoc?: null
}

interface Props {
  type: 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets'
}

export const pageState = atom({
  key: 'page',
  default: '1'
})

export const responseTypeState = atom({
  key: 'response',
  default: 'json'
})

const SearchPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null)
  const [page, setPage] = useRecoilState(pageState)
  const [responseType, setResponseType] = useRecoilState(responseTypeState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData(searchTerm: string) {
      try {
        setLoading(true)
        const response = await apiAuth().get(`/${props.type}/search?q=${searchTerm}&page=${page}&format=${responseType}`)
        if (typeof response.data === 'string') {
          toast.warning('Impossible de récupérer les données en ' + responseType + '.')
          setResponseType('json')
          return
        }
        setSearchResults(response.data)
      } catch (error: any) {
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          window.location.reload()
        } else {
          if (page !== '1') {
            setPage('1')
            setSearchResults(null)
          } else {
            await getData(searchTerm)
          }
        }
      } finally {
        setLoading(false)
      }
    }
    const delayDebounceFn = debounce(async (term: string) => {
      const searchItem = term.trim()
      if (searchItem.length === 0) {
        setSearchResults(null)
        return
      }
      getData(searchItem)
    }, 700)


    if (searchTerm.length > 0) {
      delayDebounceFn(searchTerm)
    }

    return () => {
      delayDebounceFn.cancel()
    }
  }, [searchTerm, page, props.type, setPage, responseType, setResponseType])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={2} xl={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Format</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={responseType}
                  label="Format"
                  onChange={(event: SelectChangeEvent) => { setResponseType(event.target.value) }}
                >
                  <MenuItem value={'json'}>json</MenuItem>
                  <MenuItem value={'wookiee'}>wookiee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={10} xl={11}>
              <TextField
                label="Rechercher"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
              />
            </Grid>
          </Grid>
          {
            searchResults !== null && (
              <Typography variant="body2" color="text.secondary" style={{ marginTop: 16 }}>
                {searchResults.count} résultat(s) trouvé(s)
              </Typography>
            )
          }
        </CardContent>
      </Card>
      <div style={{ marginTop: 16 }}>
        {loading
          ? (
            <Loader />
          )
          : (
            <DisplayResponse results={searchResults} type={props.type} />
          )}
      </div>
    </div>
  )
}

export default SearchPage
