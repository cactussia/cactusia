import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { colRefLang } from '../firebase';
import { onSnapshot, orderBy, query } from 'firebase/firestore';


import { Dialog } from '@mui/material';
import SimpleDialogDemo from './Dialog';
import LangEdit from './LangEdit';


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



export default function CustomizedTables() {

  const [rows,setRows]=React.useState([])

  React.useEffect(()=>{
      let q = query(colRefLang,orderBy("createdAt","desc"))
      onSnapshot(q,(snapshot)=>{
          let ordersList =[];
          snapshot.docs.forEach(doc=>{
              ordersList.push({...doc.data(),id:doc.id,checked:false})
          })
          setRows(ordersList)
          console.log(ordersList)
      })
  },[])

  return (
    <div className='p-12 w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl py-8'>Languages</h1>
        <SimpleDialogDemo _for={"new"} id=""/>
      </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >id</StyledTableCell>
            <StyledTableCell >page</StyledTableCell>
            <StyledTableCell >english</StyledTableCell>
            <StyledTableCell >french</StyledTableCell>
            <StyledTableCell >arabic</StyledTableCell>
            <StyledTableCell align='right' >action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id_phrase}>
              <StyledTableCell >{row.id_phrase}</StyledTableCell>
              <StyledTableCell >{row.page}</StyledTableCell>
              <StyledTableCell >{row.en}</StyledTableCell>
              <StyledTableCell >{row.fr}</StyledTableCell>
              <StyledTableCell >{row.ar}</StyledTableCell>
              <StyledTableCell align='right' ><LangEdit row={row}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}