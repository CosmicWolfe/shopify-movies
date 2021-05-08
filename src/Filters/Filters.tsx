import { BySearchParams, ShowType } from "../AppConstants";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  width: 100%;
`;

const FilterWrapper = styled.div`
  padding-right: 36px;
  width: 200px;
`;

const FilterTextField = styled(TextField)`
  width: 100%;
  background-color: aliceblue;
`;

const StyledFormControl = styled(FormControl)`
  width: 200px;
  background-color: aliceblue;
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
        <FilterWrapper>
          <FilterTextField
            label={" Search by show title"}
            onChange={handleTitleChange}
            type={"text"}
            variant={"standard"}
            value={searchFilters.s}
          />
        </FilterWrapper>
        <FilterWrapper>
          <FilterTextField
            label={" Filter by year of release"}
            onChange={handleYearChange}
            type={"number"}
            variant={"standard"}
            value={searchFilters.y}
          />
        </FilterWrapper>
        <FilterWrapper>
          <StyledFormControl variant="standard">
            <InputLabel htmlFor="outlined-select-show-type">
              {" "}
              Filter by show type
            </InputLabel>
            <Select value={searchFilters.type} onChange={handleTypeChange}>
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"movie"}>Movie</MenuItem>
              <MenuItem value={"series"}>Series</MenuItem>
              <MenuItem value={"episode"}>Episode</MenuItem>
            </Select>
          </StyledFormControl>
        </FilterWrapper>
      </FilterRow>
    </>
  );
};
export default Filters;
