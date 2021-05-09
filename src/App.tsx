import "./App.css";
import {
  API_KEY,
  OMDB_URL,
  BySearchParams,
  SearchResult,
  ShowType,
  INITIAL_SEARCH_QUERY,
  DEBOUNCE_TIME,
} from "./AppConstants";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import Snackbar from "@material-ui/core/Snackbar";
import styled from "styled-components";
import MuiAlert from "@material-ui/lab/Alert";
import SearchAndNominations from "./SearchAndNominations/SearchAndNominations";

const Body = styled.div`
  padding: 24px;
`;

const Spacer = styled.div`
  height: 24px;
`;

function App() {
  // Keeps track of when the latest API call happened (for debouncing)
  const latestApiCall = useRef<number>(Date.now());
  
  // Snackbar states
  const [isFailureSnackbarOpen, setIsFailureSnackbarOpen] = useState(false);
  const [isInformationSnackbarOpen, setIsInformationSnackbarOpen] = useState(
    false
  );
  const [snackbarInfo, setSnackbarInfo] = useState("Too many results.");

  // Searching and filtering states
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState({
    Search: [],
    totalResults: "0",
    Response: "False",
  } as SearchResult);
  const [searchFilters, setBySearchParams] = useState({
    s: INITIAL_SEARCH_QUERY,
    page: 1,
    apikey: API_KEY,
    type: '',
  } as BySearchParams);

  // For closing the snackbars
  const handleCloseFailureSnackbar = () => {
    setIsFailureSnackbarOpen(false);
  };
  const handleCloseInformationSnackbar = () => {
    setIsInformationSnackbarOpen(false);
  };

  // Functions to set the filters
  const setYearFilter = (year: number) => {
    const newSearchFilter = {
      ...searchFilters,
      y: year,
      page: 1,
    };
    setBySearchParams(newSearchFilter);
    resetSearchResults(newSearchFilter);
  };
  const setTitleFilter = (title: string) => {
    const newSearchFilter = {
      ...searchFilters,
      s: title,
      page: 1,
    };
    setBySearchParams(newSearchFilter);
    resetSearchResults(newSearchFilter);
  };
  const setTypeFilter = (type: ShowType) => {
    const newSearchFilter = {
      ...searchFilters,
      type: type,
      page: 1,
    };
    setBySearchParams(newSearchFilter);
    resetSearchResults(newSearchFilter);
  };
  const setPageFilter = (page: number) => {
    const newSearchFilter = {
      ...searchFilters,
      page: page,
    };
    setBySearchParams(newSearchFilter);
    resetSearchResults(newSearchFilter);
  };

  // Helper function to construct the url to send the get request
  const constructApiURL = (searchFilters: BySearchParams) => {
    const searchParams = (() => {
      let params = `s=${searchFilters.s}&page=${searchFilters.page}&apikey=${searchFilters.apikey}`;
      if (searchFilters.y !== undefined) {
        params = `${params}&y=${searchFilters.y}`;
      }
      if (searchFilters.type !== '') {
        params = `${params}&type=${searchFilters.type}`;
      }
      return params;
    })();
    return `${OMDB_URL}/?${searchParams}`;
  };

  // A debounced function to make the API call for the search results
  // based on the search filters passed as parameters
  const resetSearchResults = (searchFilters: BySearchParams) => {
    const url = constructApiURL(searchFilters);
    const onChangeTime = Date.now();
    latestApiCall.current = onChangeTime;

    // debouncing
    setTimeout(() => {
      if (latestApiCall.current === onChangeTime) {
        setIsLoadingSearchResults(true);
        axios.get(url).then((response) => {
          if (response.data["Response"] === "True") {
            setIsInformationSnackbarOpen(false);
            setIsFailureSnackbarOpen(false);
            setSearchResults(response.data);
          } else {
            // Error handling
            const error = response.data["Error"] as string;
            if (error === "Too many results.") {
              setSnackbarInfo("Too many results. Please narrow down your search!");
              setIsInformationSnackbarOpen(true);
            } else if (error.includes("not found!")) {
              setSnackbarInfo("Show not found!");
              setIsInformationSnackbarOpen(true);
            } else if (searchFilters.s === "") {
              setSnackbarInfo("Search by show title!");
              setIsInformationSnackbarOpen(true);
            } else {
              setIsFailureSnackbarOpen(true);
            }
    
            setSearchResults({
              Search: [],
              totalResults: "0",
              Response: "False",
            });
          }
    
          setIsLoadingSearchResults(false);
        });
      }
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    resetSearchResults(searchFilters);
  }, []);

  return (
    <>
      <Header />
      <Body>
        <div>
          <span>Search for your favourite shows by title and filter them by year and type! Click into a show for more details and nominate 5 shows!</span>
        </div>
        <Filters
          searchFilters={searchFilters}
          setTitleFilter={setTitleFilter}
          setYearFilter={setYearFilter}
          setTypeFilter={setTypeFilter}
        />
        <Spacer />
        <SearchAndNominations
          isLoadingSearchResults={isLoadingSearchResults}
          searchResults={searchResults.Search}
          searchQuery={searchFilters.s}
          page={searchFilters.page}
          totalResults={Number(searchResults.totalResults)}
          setPageFilter={setPageFilter}
        />
        <Snackbar
          open={isFailureSnackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseFailureSnackbar}
        >
          <MuiAlert onClose={handleCloseFailureSnackbar} severity="error">
            Failed to load search results!
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={isInformationSnackbarOpen}
          autoHideDuration={2500}
          onClose={handleCloseInformationSnackbar}
        >
          <MuiAlert onClose={handleCloseInformationSnackbar} severity="info">
            {snackbarInfo}
          </MuiAlert>
        </Snackbar>
      </Body>
    </>
  );
}

export default App;
