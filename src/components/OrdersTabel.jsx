import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowBackIcon from '@mui/icons-material/ArrowForward';
import { WhatsApp } from "@mui/icons-material";

import {
	doc,deleteDoc, onSnapshot, orderBy, query, where 
} from "firebase/firestore"
import { colRef, db } from '../firebase.js';
import StateBtn from './StateBtn.jsx';





import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { utils, writeFileXLSX, writeXLSX } from 'xlsx';
import { WhatsappMessageConfirmation, dateFormater, phoneFormater } from '../utils/index.js';







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


export default function CustomizedTables({cat,cats,search,setOrder}) {

    const [rows,setRows]=React.useState([])
    const [update,setUpdate]=React.useState(0)

    React.useEffect(()=>{
        let q; 
        if(cat==0){
            q = query(colRef,orderBy("createdAt","desc"))
        }else{
            q = query(colRef,where("state","==",cats[cat].toLowerCase()),orderBy("createdAt","desc"))
        }
        onSnapshot(q,(snapshot)=>{
            let ordersList =[];
            snapshot.docs.forEach(doc=>{
                ordersList.push({...doc.data(),id:doc.id,checked:false})
            })
            setRows(ordersList)
            console.log(ordersList)
        })
    },[cat,update])

    const exportExcel = ()=>{
        var wb = utils.book_new(),
        ws = utils.json_to_sheet(rows.filter(o=>o.checked).map(o=>{return({name:o.name,Lastname:o.lastName,address:o.address,city:o.city,number:o.number,price:o.price,comment:"thanks....",size:"small"})}));
        utils.book_append_sheet(wb,ws,"myfile")
        writeFileXLSX(wb,"myfileName.xlsx")
    }

    const deleteOrders = ()=>{
      if(confirm("are u sure about that ")){
        rows.filter(o=>o.checked).map(o=>{
          const docRR = doc(db,"Orders",o.id)
          deleteDoc(docRR)
        })
      }
    }
    
  return (
    <>
    {
        rows.some(m=>m.checked) && 
        <div className='flex gap-2'>
          <button onClick={exportExcel} className='bg-black rounded-full px-8 py-2 text-white my-2'>Export Excel</button>
          <button onClick={deleteOrders} className='bg-black rounded-full px-8 py-2 text-white my-2'>Delete</button>
        </div>
    }
    <TableContainer component={Paper} sx={{width: "100%" }}>
      <Table sx={{ width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
                <button onClick={()=>{setRows(p=>p.map(o=>({...o,checked:!o.checked})))}}>
                    Select
                </button>
            </StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell >Number</StyledTableCell>
            <StyledTableCell >city</StyledTableCell>
            <StyledTableCell >Address</StyledTableCell>
            <StyledTableCell >Items</StyledTableCell>
            <StyledTableCell >Price</StyledTableCell>
            <StyledTableCell >Date</StyledTableCell>
            <StyledTableCell >state</StyledTableCell>
            <StyledTableCell >WhatsApp</StyledTableCell>
            <StyledTableCell >action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.filter(r=>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.number.toLowerCase().includes(search.toLowerCase()) ||
          r.city.toLowerCase().includes(search.toLowerCase()) ||
          r.address.toLowerCase().includes(search.toLowerCase()) 
          ).map((row) => (
            <StyledTableRow className='cursor-pointer ' key={row.id}>
              <StyledTableCell ><button className='p-2  flex justify-center items-center w-6 h-6' onClick={()=>setRows(p=>p.map(o=>o.id==row.id? {...o,checked:!o.checked}:o))}>{row.checked?<CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}</button></StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell >{row.lastName}</StyledTableCell>
              <StyledTableCell ><a href={`tel:${row.number}`} target="_blank" rel="noopener noreferrer">{row.number}</a></StyledTableCell>
              <StyledTableCell >{row.city}</StyledTableCell>
              <StyledTableCell >{row.address}</StyledTableCell>
              <StyledTableCell >{row.items?.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0)} pots</StyledTableCell>
              <StyledTableCell >{row.price} Dh</StyledTableCell>
              <StyledTableCell >{dateFormater(row.date)}</StyledTableCell>
              <StyledTableCell ><StateBtn setUpdate={setUpdate} state={row.state} id={row.id} cats={cats}/></StyledTableCell>
              <StyledTableCell >
                <button className="h-10 w-10 p-1 rounded-full flex items-center justify-center bg-[#25D366] shadow-lg transition-all duration-150 hover:scale-[1.07]">
                  <a className="flex items-center justify-center" href={`http://wa.me/?phone=${phoneFormater(row.number)}&text="${WhatsappMessageConfirmation(`${row.name} ${row.lastName}`, row.price, dateFormater(row.date))}"`} title={WhatsappMessageConfirmation(`${row.name} ${row.lastName}`, row.price, dateFormater(row.date))} target="_blank" rel="noreferrer">
                      <WhatsApp className="text-[#f5fdf8] scale-[1.2]"/>
                  </a>
                </button>
              </StyledTableCell>
              <StyledTableCell ><button onClick={()=>setOrder(row)} className='p-1 px-4 bg-gray-300 rounded-full'><ArrowBackIcon/></button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}
