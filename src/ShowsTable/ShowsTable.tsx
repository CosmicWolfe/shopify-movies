import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Show } from "../AppConstants";
import { Button, TablePagination } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import styled from "styled-components";
import ShowInfoModal from "../ShowInfoModal/ShowInfoModal";

const StyledButton = styled(Button)`
  background-color: #191970;
  color: white;
`;

const CapitalizedSpan = styled.span`
  text-transform: capitalize;
`;

const ClickableTableCell = styled(TableCell)`
  cursor: pointer;
`;

const StyledInfoIcon = styled(InfoIcon)`
  margin-top: 2px;
`;

interface RowProps {
  show: Show;
  variant: "nomination" | "search";
  nominations: Show[];
  handleRemoveNomination: (imdbID: string) => void;
  handleAddNomination: (show: Show) => void;
  openShowInfoModal: (imdbID: string) => void;
}

const Row = ({
  show,
  variant,
  nominations,
  handleRemoveNomination,
  handleAddNomination,
  openShowInfoModal,
}: RowProps) => {
  const actionButton = (() => {
    if (variant === "nomination") {
      return (
        <StyledButton
          onClick={() => {
            handleRemoveNomination(show.imdbID);
          }}
          variant={"contained"}
        >
          <CapitalizedSpan>Remove</CapitalizedSpan>
        </StyledButton>
      );
    } else {
      const disabled =
        nominations?.length >= 5 ||
        nominations
          ?.map((nomination) => nomination.imdbID)
          .includes(show.imdbID);
      return (
        <StyledButton
          disabled={disabled}
          onClick={() => {
            handleAddNomination(show);
          }}
          variant={"contained"}
        >
          <CapitalizedSpan>Nominate</CapitalizedSpan>
        </StyledButton>
      );
    }
  })();

  const handleOnClickInfoIcon = () => {
    console.log("on click info icon called");
    openShowInfoModal(show.imdbID);
  };

  return (
    <React.Fragment>
      <TableRow>
        <ClickableTableCell onClick={handleOnClickInfoIcon}>
          <StyledInfoIcon />
        </ClickableTableCell>
        <TableCell component="th" scope="row">
          {show.Title}
        </TableCell>
        <TableCell align="right">{show.Year}</TableCell>
        <TableCell align="right">
          {show.Type[0].toUpperCase()}
          {show.Type.substr(1)}
        </TableCell>
        <TableCell align="right">{actionButton}</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const TableWrapper = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 70%),
    0px 1px 1px 0px rgb(0 0 0 / 70%), 0px 1px 3px 0px rgb(0 0 0 / 70%);
  width: 100%;
`;

interface ShowsTableProps {
  shows: Show[];
  variant: "nomination" | "search";
  handleRemoveNomination: (imdbID: string) => void;
  handleAddNomination: (show: Show) => void;
  setPageFilter: (page: number) => void;
  nominations: Show[];
  page?: number;
  totalResults?: number;
}

const ShowsTable = ({
  shows,
  variant,
  nominations,
  page,
  totalResults,
  setPageFilter,
  handleRemoveNomination,
  handleAddNomination,
}: ShowsTableProps) => {
  const [isShowInfoModalOpen, setIsShowInfoModalOpen] = useState(false);
  const [infoModalImdbID, setInfoModalImdbID] = useState("");

  const handleChangePage = (event: any, newPage: number) => {
    setPageFilter(newPage + 1);
  };

  const openShowInfoModal = (imdbID: string) => {
    setInfoModalImdbID(imdbID);
    setIsShowInfoModalOpen(true);
  };

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shows.map((show) => (
              <Row
                key={show.imdbID}
                show={show}
                variant={variant}
                nominations={nominations}
                handleRemoveNomination={handleRemoveNomination}
                handleAddNomination={handleAddNomination}
                openShowInfoModal={openShowInfoModal}
              />
            ))}
          </TableBody>
        </Table>
        {variant === "search" && (
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={totalResults as number}
            rowsPerPage={10}
            page={(page as number) - 1}
            onChangePage={handleChangePage}
          />
        )}
      </TableContainer>
      <ShowInfoModal
        isOpen={isShowInfoModalOpen}
        setIsOpen={setIsShowInfoModalOpen}
        imdbID={infoModalImdbID}
      />
    </TableWrapper>
  );
};

export default ShowsTable;
