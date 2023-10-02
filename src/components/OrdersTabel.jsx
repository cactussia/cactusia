import { useState, useMemo, useEffect } from 'react';
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
import { WhatsappMessageConfirmation, dateFormater, orderTrackingStatus, phoneFormater } from '../utils/index.js';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';







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


export default function CustomizedTables({cat,cats,setCat,setOrder}) {

  const [rows, setRows] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [update, setUpdate] = useState(0)

  const [pageSize, setPageSize] = useState(10);
  const [selection, setSelection] = useState([]);

    useEffect(()=>{
      (async()=>{
        try {       
          const qry = cat === 0 ? query(colRef,orderBy("createdAt","desc")) : query(colRef,where("state","==",cats[cat].toLowerCase()),orderBy("createdAt","desc"));
          onSnapshot(qry, (snapshot)=>{
            setRows(snapshot.docs.map(doc=>({...doc.data(), id:doc.id, checked:false})))
            console.table(rows);
          })
        } catch (error) {
          console.error("ERROR LOADING ODERS:", error);
          setLoadingOrders(false);
        } finally {
          setLoadingOrders(false);
        }
      })()
    },[cats, cat])

    const exportExcel = ()=>{
      var wb = utils.book_new(),
      ws = utils.json_to_sheet(rows.filter(o=>o.checked).map(o=>{return({name:o.name,Lastname:o.lastName,address:o.address,city:o.city,number:o.number,price:o.price,comment:"thanks....",size:"small"})}));
      utils.book_append_sheet(wb,ws,"myfile")
      writeFileXLSX(wb,"myfileName.xlsx")
    }

    const deleteOrders = () => {
      if(confirm(`Are You Sure You Want To Delete These Orders?: ${selection.join(",\n")}`)){
        setRows(rows.filter(order => {
          const isOrderSelected = selection.find(selectedOrder => selectedOrder === order.id);
          if (isOrderSelected) {
            const docRR = doc(db,"Orders",order.id)
            deleteDoc(docRR)
          }
          return !isOrderSelected;
        }))
        alert(`Order Deleted Successfully`)
      }
    }

    const columns = useMemo(() => [
      { field: 'id', headerName: 'Order ID', width: 190,
        headerClassName: 'bg-white font-semibold invert',
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'First Name', width: 130,
        headerClassName: 'bg-white font-semibold invert',
      },
      { field: 'lastName', headerName: 'Last Name', width: 130,
        headerClassName: 'bg-white font-semibold invert',
      },
      { field: 'number', headerName: 'Number', width: 130,
        headerClassName: 'bg-white font-semibold invert',
      },
      { field: 'city', headerName: 'City', width: 130,
        headerClassName: 'bg-white font-semibold invert',
      },
      { field: 'address', headerName: 'Address', width: 200,
        headerClassName: 'bg-white font-semibold invert',
      },
      { field: 'items', headerName: 'Items', width: 60,
        headerClassName: 'bg-white font-semibold invert',
        type: 'number',
        valueFormatter: ({ value }) => value?.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0),
        renderCell: ({ value }) => value?.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0) + " pots"
      },
      { field: 'price', headerName: 'Price', width: 60,
        headerClassName: 'bg-white font-semibold invert',
        type: 'number',
        valueFormatter: ({ value }) => value + "Dh",
        renderCell: ({ value }) => <span className="font-semibold">{value} Dh</span>
      },
      { field: 'date', headerName: 'Date', width: 240,
        headerClassName: 'bg-white font-semibold invert',
        type: 'date',
        valueFormatter: ({ value }) => dateFormater(value)
      },
      { field: 'state', headerName: 'State', width: 130,
        headerClassName: 'bg-white font-semibold invert',
        type: 'singleSelect',
        valueOptions: Object.keys(orderTrackingStatus),
        valueFormatter: ({ value }) => value.toUpperCase(),
        renderCell: ({ row }) => <StateBtn setUpdate={setUpdate} state={row.state} id={row.id} cats={cats}/>
      },
      { field: 'whatsapp', headerName: 'WhatsApp', width: 80,
        headerClassName: 'bg-white font-semibold invert',
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => (
          <button className="h-10 w-10 p-1 rounded-full flex items-center justify-center bg-[#25D366] shadow-lg transition-all duration-150 hover:scale-[1.07]">
            <a className="flex items-center justify-center" href={`http://wa.me/${phoneFormater(row.number)}/?text=${WhatsappMessageConfirmation(`${row.name} ${row.lastName}`, row.price)}`} title={WhatsappMessageConfirmation(`${row.name} ${row.lastName}`, row.price, dateFormater(row.date))} target="_blank" rel="noreferrer">
              <WhatsApp className="text-[#f5fdf8] scale-[1.2]"/>
            </a>
          </button>
        )
      },
      { field: 'action', headerName: 'Order Preview', width: 120,
        headerClassName: 'bg-white font-semibold invert',
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => <button onClick={()=>setOrder(row)} className='p-1 px-4 bg-gray-300 rounded-full'><ArrowBackIcon/></button>
      },
    ], [rows, selection, update, setUpdate, cats]);
    
  return (
    <>
    <Box className="h-full w-fit max-w-full min-h-[250px] max-h-screen bg-slate-100 font-semibold p-4 flex flex-col gap-4 print:hidden overflow-x-auto">
      <div className='flex justify-center items-center gap-5'>
        <div className='flex gap-2'>
          <button onClick={exportExcel} className='bg-black rounded-full px-8 py-2 text-white my-2 drop-shadow-lg transition-all'>Export Excel</button>
          <button onClick={deleteOrders} className={`${selection.length > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0"} bg-red-700 rounded-full px-8 py-2 drop-shadow-lg text-white my-2 transition-all`}>Delete</button>
        </div>

        <div className="flex items-center rounded-full bg-white drop-shadow-lg px-2 py-4 max-h-14 max-w-4xl overflow-x-auto overflow-y-hidden">
          {cats.map((c, key) =>
            key == cat ? (
              <button
                key={key}
                className="px-4 py-2 bg-black text-white rounded-full capitalize"
              >
                {c}
              </button>
            ) : (
              <button
                key={key}
                onClick={() => setCat(key)}
                className="px-4 py-2 rounded-full capitalize"
              >
                {c}
              </button>
            )
          )}
        </div>
      </div>

      <DataGrid
        className="h-fit bg-white text-lg"
        rows={rows}
        columns={columns}
        loading={loadingOrders}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        disableRowSelectionOnClick
        // get selected rows
        onRowSelectionModelChange={(selection) => setSelection(selection)}
      />

    </Box>
    </>
  );
}
