import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const rows = [
    {id:"alkdjf",ar:";alskdjflasdkjflaskdjflakjdf;lak",fr:";alskdjflaskdjflasdjflakjdflajd;flakjsd",en:"a;kldjfalskdjflakjsdfldlfkajdlfkjaldjfkladsjflaskjdflakjdf"}
];

export default function CustomizedTables() {
  return (
    <div className='p-12 w-full'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >id</StyledTableCell>
            <StyledTableCell >english</StyledTableCell>
            <StyledTableCell >french</StyledTableCell>
            <StyledTableCell >arabic</StyledTableCell>
            <StyledTableCell >action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell >{row.id}</StyledTableCell>
              <StyledTableCell >{row.en}</StyledTableCell>
              <StyledTableCell >{row.fr}</StyledTableCell>
              <StyledTableCell >{row.ar}</StyledTableCell>
              <StyledTableCell ><button>Edit</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}