import { BySearchParams, ShowType } from "../AppConstants";
import styled from "styled-components";
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const FilterRow = styled.div`
  display: flex;

  @media screen and (max-width: 850px) {
    flex-wrap: wrap;
  }

  @media screen and (min-width: 850px) {
    flex-direction: row;
    width: 100%;
    align-items: center;
  }
`;

const FilterBorder = styled.div`
  padding: 12px;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  border-radius: 8px;
  background-color: aliceblue;
`;

const SearchFilterWrapper = styled.div`
  padding-right: 32px;
  padding-top: 16px;
  width: 400px;
`;

const FilterWrapper = styled.div`
  padding-right: 32px;
  padding-top: 16px;
  width: 150px;
`;

interface FilterProps {
  searchFilters: BySearchParams;
  setYearFilter: (year: number) => void;
  setTitleFilter: (title: string) => void;
  setTypeFilter: (type: ShowType) => void;
}

const Filters = ({
  searchFilters,
  setYearFilter,
  setTitleFilter,
  setTypeFilter,
}: FilterProps) => {
  const handleTitleChange = (event: any) => {
    setTitleFilter(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setYearFilter(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setTypeFilter(event.target.value);
  };

  return (
    <>
      <FilterRow>
        <SearchFilterWrapper>
          <FilterBorder>
            <InputLabel htmlFor="search-input">Search by show title</InputLabel>
            <Input
              id="search-input"
              onChange={handleTitleChange}
              type={"search"}
              value={searchFilters.s}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              style={{width: 376}}
              required={true}
            />
          </FilterBorder>
        </SearchFilterWrapper>
        <FilterWrapper>
          <FilterBorder>
            <InputLabel htmlFor="year-input">Release Year</InputLabel>
            <Input
              id="year-input"
              onChange={handleYearChange}
              type={"number"}
              value={searchFilters.y}
              style={{width: 126}}
            />
          </FilterBorder>
        </FilterWrapper>
        <FilterWrapper>
          <FilterBorder>
            <FormControl variant="standard" style={{width: 126}}>
              <div className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated'}>
                Show Type
              </div>
              <Select value={searchFilters.type} onChange={handleTypeChange}>
                <MenuItem value={''}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"movie"}>Movie</MenuItem>
                <MenuItem value={"series"}>Series</MenuItem>
                <MenuItem value={"episode"}>Episode</MenuItem>
              </Select>
            </FormControl>
          </FilterBorder>
        </FilterWrapper>


      </FilterRow>
    </>
  );
};
export default Filters;
