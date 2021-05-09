import { Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { INITIAL_NOMINATIONS, Show } from "../AppConstants";
import ShowsTable from "../ShowsTable/ShowsTable";
import MuiAlert from "@material-ui/lab/Alert";

const HorizontalDiv = styled.div`
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
  @media screen and (min-width: 1100px) {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
`;

const HorizontalSpacer = styled.div`
  width: 32px;
  height: 32px;
`;

const VerticalSpacer = styled.div`
  height: 16px;
`;

const VerticalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

/**
 * Credit to https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
 */
const useStickyState = (
  defaultValue: Show[],
  key: string
): [Show[], React.Dispatch<React.SetStateAction<Show[]>>] => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? (JSON.parse(stickyValue) as Show[])
      : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

interface SearchAndNominationsProps {
  isLoadingSearchResults: boolean;
  searchResults: Show[];
  searchQuery: string;
  page: number;
  totalResults: number;
  setPageFilter: (page: number) => void;
}

const SearchAndNominations = ({
  isLoadingSearchResults,
  searchResults,
  searchQuery,
  page,
  totalResults,
  setPageFilter,
}: SearchAndNominationsProps) => {
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [nominations, setNominations] = useStickyState(
    INITIAL_NOMINATIONS,
    "nominations"
  );

  const addNomination = (show: Show) => {
    if (nominations.length === 4) {
      setIsSuccessSnackbarOpen(true);
    }
    setNominations([...nominations, show]);
  };

  const removeNomination = (imdbID: string) => {
    setNominations(
      nominations.filter((nomination) => nomination.imdbID !== imdbID)
    );
    setIsSuccessSnackbarOpen(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setIsSuccessSnackbarOpen(false);
  };

  return (
    <HorizontalDiv>
      <VerticalDiv>
        <div>
          <b>Search Results for "{searchQuery}"</b>
        </div>
        <VerticalSpacer />
        <ShowsTable
          variant="search"
          shows={searchResults}
          nominations={nominations}
          handleAddNomination={addNomination}
          handleRemoveNomination={removeNomination}
          setPageFilter={setPageFilter}
          page={page}
          totalResults={totalResults}
          isLoadingSearchResults={isLoadingSearchResults}
        />
      </VerticalDiv>
      <HorizontalSpacer />
      <VerticalDiv>
        <div>
          <b>Nominations</b>
        </div>
        <VerticalSpacer />
        <ShowsTable
          variant="nomination"
          shows={nominations}
          handleAddNomination={addNomination}
          handleRemoveNomination={removeNomination}
          nominations={nominations}
          setPageFilter={setPageFilter}
          isLoadingSearchResults={false}
        />
      </VerticalDiv>
      <Snackbar
        open={isSuccessSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSuccessSnackbar}
      >
        <MuiAlert onClose={handleCloseSuccessSnackbar} severity="success">
          5 shows up for nomination!
        </MuiAlert>
      </Snackbar>
    </HorizontalDiv>
  );
};

export default SearchAndNominations;
