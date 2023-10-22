import { useState, useMemo, useEffect, useCallback } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowForward';
import { WhatsApp } from "@mui/icons-material";

import { doc,deleteDoc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { colRef, db } from '../firebase.js';
import StateBtn from './StateBtn.jsx';

import { WhatsappMessageConfirmation, dateFormater, orderTrackingStatus, phoneFormater, toXlsx } from '../utils/index.js';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function CustomizedTables({cat,cats,setCat,setOrder}) {

  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersUpdated, setOrdersUpdated] = useState(false);
  const [update, setUpdate] = useState(0)

  const [pageSize, setPageSize] = useState(10);
  const [selection, setSelection] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(()=>{
    (async()=>{
      try {       
        const qry = cat === 0 ? query(colRef,orderBy("createdAt","desc")) : query(colRef,where("state","==",cats[cat].toLowerCase()),orderBy("createdAt","desc"));
        onSnapshot(qry, (snapshot)=>{
          setOrders(snapshot.docs.map(doc=>({
            ...doc.data(),
            id:doc.id,
            date: new Date(doc.data().date?.seconds * 1000).toLocaleDateString(),
            formatedDate: dateFormater(doc.data().date),
            itemsCount:doc.data().items?.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0)
          })))
          setTotalRevenue(snapshot.docs.map(doc=>doc.data().price).reduce((partialSum, a) => partialSum + a, 0))
          setOrdersUpdated(true);
          console.table(orders);

        })
      } catch (error) {
        console.error("ERROR LOADING ODERS:", error);
        setLoadingOrders(false);
      } finally {
        setLoadingOrders(false);
      }
    })()
  },[cats, cat])

  useEffect(() => {
    if (!ordersUpdated) return;
    const timeout = setTimeout(() => {
      setOrdersUpdated(false);
    }, 1000)
    return () => clearTimeout(timeout);
  }, [ordersUpdated])

  const deleteOrders = () => {
    if(confirm(`Are You Sure You Want To Delete These Orders?: ${selection.join(",\n")}`)){
      setOrders(orders.filter(order => {
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
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Order ID</h1>,
      editable: false,
      sortable: false,
    },
    { field: 'name', headerName: 'First Name', width: 130,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>First Name</h1>,
    },
    { field: 'lastName', headerName: 'Last Name', width: 130,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Last Name</h1>,
    },
    { field: 'number', headerName: 'Phone Number', width: 130,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Phone Number</h1>,
    },
    { field: 'city', headerName: 'City', width: 130,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>City</h1>,
    },
    { field: 'address', headerName: 'Address', width: 200,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Address</h1>,
    },
    { field: 'itemsCount', headerName: 'Items', width: 60,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Items</h1>,
      type: 'number',
      valueFormatter: ({ value }) => value + " pots",
    },
    { field: 'price', headerName: 'Price', width: 60,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Price</h1>,
      type: 'number',
      valueFormatter: ({ value }) => value + "Dh",
      renderCell: ({ value }) => <span className="font-semibold">{value} Dh</span>
    },
    { field: 'date', headerName: 'Date', width: 240,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Date</h1>,
      type: 'date',
      valueGetter: ({ value }) => new Date(value),
      renderCell: ({ row }) => <span title={row.formatedDate} className="font-semibold">{row.formatedDate}</span>
    },
    { field: 'state', headerName: 'State', width: 130,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>State</h1>,
      type: 'singleSelect',
      valueOptions: Object.keys(orderTrackingStatus),
      valueFormatter: ({ value }) => value.toUpperCase(),
      renderCell: ({ row }) => <StateBtn setUpdate={setUpdate} state={row.state} id={row.id} cats={cats}/>
    },
    { field: 'whatsapp', headerName: 'WhatsApp', width: 80,
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>WhatsApp</h1>,
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
      headerClassName: "bg-white invert",
      renderHeader:(params) => <h1 className='w-full bg-white text-black font-bold '>Order Preview</h1>,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => <button onClick={()=>setOrder(row)} className='p-1 px-4 bg-gray-300 rounded-full'><ArrowBackIcon/></button>
    },
  ], [orders, selection, update, setUpdate, cats]);

  const exportToXLSX = useCallback(() => {
    // check if there is a selected rows export the selected rows else export all rows
    const data = (selection.length > 0 ? selection : orders).map((order) => {
    // formating the data to be readable
    return {
        "Order ID": order.id,
        "First Name": order.name,
        "Last Name": order.lastName,
        "Phone Number": order.number,
        "City": order.city,
        "Full Address": order.address,
        "Items": order.itemsCount,
        "Price": order.price + " Dh",
        "State": order.state,
        // "Order Date": Intl.DateTimeFormat().format(new Date(order.createdAt?.seconds * 1000)),
        "Order Date": order.date,
        "Order Time": new Date(order.createdAt?.seconds * 1000).toLocaleTimeString("en-US",{hour12: false}),
        "Readable Date": order.formatedDate,
      }
    });

    // exporting the data to xlsx
    return toXlsx(data, `${cats[cat]}-catusia-orders`);

  }, [orders, selection, cat, cats]);
    
  return (
    <>
    <header className="flex p-8 justify-between items-center">
      <h1 className="text-4xl uppercase font-semibold">Orders List</h1>
      <div className={`${ordersUpdated ? "scale-105 before:scale-110 before:h-[140%] before:animate-pulse" : "scale-100 before:scale-100 before:opacity-0"} relative z-[100] before:rounded-lg before:bg-green before:bg-opacity-25 bg-white rounded-md drop-shadow-md before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:h-full before:w-full before:-z-[90] before:transition-all transition-all`}>
        <div className='z-40 h-full w-full py-3 px-4 flex justify-center items-center text-4xl text-center font-semibold rounded-md bg-white'>
          <span className="h-full">Total Revenue: </span>
          <span className="text-green h-ful ml-2">{totalRevenue} DH</span>
        </div>
      </div>
    </header>
    <Box className="h-full w-fit max-w-full min-h-[250px] max-h-screen bg-slate-100 font-semibold p-4 flex flex-col gap-4 print:hidden overflow-x-auto">
      <div className='flex justify-center items-center gap-5'>
        <div className='flex gap-2'>
          <button onClick={exportToXLSX} className='flex justify-center items-center bg-black rounded-full px-8 py-2 text-white my-2 drop-shadow-lg transition-all cursor-pointer'><i className="fi fi-sr-file-excel flex justify-center items-center mr-2"></i> Export {selection.length > 0 ? "Selected" : "All"}</button>
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
        rows={orders}
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
