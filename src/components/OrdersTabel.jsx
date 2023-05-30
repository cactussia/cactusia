import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




import {
	getDocs, onSnapshot 
} from "firebase/firestore"
import { colRef } from '../firebase.js';










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
        onSnapshot(colRef,(snapshot)=>{
            let ordersList =[];
            snapshot.docs.forEach(doc=>{
                ordersList.push({...doc.data()})
            })
            setRows(ordersList)
            console.log(ordersList)
        })
    },[])




  return (
    <TableContainer component={Paper} sx={{width: "100%" }}>
      <Table sx={{ width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Number</StyledTableCell>
            <StyledTableCell >Address</StyledTableCell>
            <StyledTableCell >Items</StyledTableCell>
            <StyledTableCell >Price</StyledTableCell>
            <StyledTableCell >Date</StyledTableCell>
            <StyledTableCell >state</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell >{row.number}</StyledTableCell>
              <StyledTableCell >{row.address}</StyledTableCell>
              <StyledTableCell >{row.items?.length} pot cactus</StyledTableCell>
              <StyledTableCell >{row.price} Dh</StyledTableCell>
              <StyledTableCell >{row.date} </StyledTableCell>
              <StyledTableCell ><span className='p-1 px-4 bg-blue-500 rounded-full text-white font-semibold'>{row.state}</span></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
