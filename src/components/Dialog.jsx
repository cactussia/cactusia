import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { colRefLang } from '../firebase';
import { Timestamp, addDoc } from 'firebase/firestore';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);



  const [id,setId]=React.useState("")
  const [en,setEn]=React.useState("")
  const [ar,setAr]=React.useState("")
  const [fr,setFr]=React.useState("")
  const [page,setPage]=React.useState("home")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAr("")
    setId("")
    setFr("")
    setEn("")
    setPage("home")
  };

  const add =()=>{
      if(id&&en&&ar&&fr&&page){
        addDoc(colRefLang,{
          id_phrase:id,
          fr,
          en,
          ar,
          createdAt:new Date(),
          page,
        }).then(()=>{
        })
        }else{
        alert("wa 3mrhom kamlin asahbi *=* ")
      }
  }

  return (
    <div>
        <button onClick={handleClickOpen} className='px-4 py-2 rounded-full bg-black text-white'>Add New  <AutoAwesomeIcon/></button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add new phrase
        </DialogTitle>
        <DialogContent className=''>

            <p>Id Phrase / please make sure its unique.</p>
            <input value={id} onInput={(e)=>setId(e.target.value)} placeholder='id' className='p-2 my-1 w-[500px] px-4 rounded-xl bg-gray-300 outline-gray-500'></input>
            <p>Page</p>
            {/* <input value={page} onInput={(e)=>setPage(e.target.value)} placeholder='page' className='p-2 my-1 w-[500px] px-4 rounded-xl bg-gray-300 outline-gray-500'></input> */}
            <select onChange={(e)=>setPage(e.target.value)} value={page} name="" id="" className='p-2 my-1 w-[500px] px-4 rounded-xl bg-gray-300 outline-gray-500'>
                <option value="home">home</option>
                <option value="market">market</option>
                <option value="contact">contact</option>
                <option value="about">about</option>
                <option value="footer">footer</option>
                <option value="menu">menu</option>
            </select>
            <hr className='my-4'/>
            <p>EN / English</p>
            <input value={en} onInput={(e)=>setEn(e.target.value)} placeholder='english' className='p-2 my-1 w-[500px] px-4 rounded-xl bg-gray-300 outline-gray-500'></input>
            <p>FR / France</p>
            <input value={fr} onInput={(e)=>setFr(e.target.value)} placeholder='france' className='p-2 my-1 w-[500px] px-4 rounded-xl bg-gray-300 outline-gray-500'></input>
            <p>AR / Arabic</p>
            <input value={ar} onInput={(e)=>setAr(e.target.value)} placeholder='arabic' className='p-2 my-1 w-[500px] px-4 rounded-xl bg-gray-300 outline-gray-500'></input>
        </DialogContent>
        <DialogActions>
          <button className='px-4 py-2 rounded-full bg-gray-300 text-black' onClick={handleClose}>Cancel</button>
          <button className='px-4 py-2 rounded-full bg-black text-white' onClick={()=>{add();handleClose()}} autoFocus>Create</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}