import { SearchFilter } from "../AppConstants";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';

const FilterRow = styled.div`
    
`;

interface FilterProps {
    searchFilters: SearchFilter;
    setYearFilter: (year: number) => void;
    setTitleFilter: (title: string) => void;
    setPageFilter: (page: number) => void;
}

const Filters = ({
    searchFilters,
    setYearFilter,
    setTitleFilter,
    setPageFilter,
}: FilterProps) => {

    return (
        <>
            <FilterRow>

            </FilterRow>
        </>
    );
}
export default Filters;