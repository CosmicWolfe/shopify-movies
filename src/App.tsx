import './App.css';
import { Button } from '@material-ui/core';
import { API_KEY, OMDB_URL, SearchFilter } from './AppConstants';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Filters from './Filters/Filters';
import SearchResultsTable from './SearchResultsTable/SearchResultsTable';
import NominationsTable from './NominationsTable/NominationsTable';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import MuiAlert from '@material-ui/lab/Alert';

const Body = styled.div`
  padding: 24px;
`;

function App() {
  const [isFailureSnackbarOpen, setIsFailureSnackbarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({});
  const [searchFilters, setSearchFilters] = useState({
    s: '',
    page: 1,
    apikey: API_KEY,
  } as SearchFilter);

  const setYearFilter = (year: number) => {
    setSearchFilters((previousFilters) => {
      return {
        ...previousFilters,
        y: year,
      };
    });
  };

  const setTitleFilter = (title: string) => {
    setSearchFilters((previousFilters) => {
      return {
        ...previousFilters,
        s: title,
      };
    });
  };

  const setPageFilter = (page: number) => {
    setSearchFilters((previousFilters) => {
      return {
        ...previousFilters,
        page,
      };
    });
  };

  const constructApiURL = () => {
    const searchParams = (() => {
      let params = `s=${searchFilters.s}&page=${searchFilters.page}&apikey=${searchFilters.apikey}`;
      if (searchFilters.y != undefined) {
        return `${params}&y=${searchFilters.y}`;
      } else {
        return params;
      }
    })();
    return `${OMDB_URL}/?${searchParams}`;
  }

  const resetSearchResults = () => {
    axios.get(constructApiURL()).then(response => {
      if (response.data['Response']) {
        setSearchResults(response.data);
      } else {
        setIsFailureSnackbarOpen(true);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setIsFailureSnackbarOpen(false);
  }

  return (
    <>
      <Header />
      <Body>
        <div><span>Nominate 5 movies!</span></div>
        <Filters />
        <div>
          <SearchResultsTable />
          <NominationsTable />
        </div>
        <Snackbar open={isFailureSnackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
          <MuiAlert onClose={handleCloseSnackbar} severity="error">
            Failed to load search results!
          </MuiAlert>
        </Snackbar>
      </Body>
    </>
  );
}

export default App;
