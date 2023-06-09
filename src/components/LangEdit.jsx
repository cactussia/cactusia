import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { colRefLang, db } from '../firebase';
import { Timestamp, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Edit } from '@mui/icons-material';

export default function LangEdit({row}) {
  const [open, setOpen] = React.useState(false);



  const [id,setId]=React.useState(row.id_phrase)
  const [en,setEn]=React.useState(row.en)
  const [ar,setAr]=React.useState(row.ar)
  const [fr,setFr]=React.useState(row.fr)
  const [page,setPage]=React.useState(row.page)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAr(row.ar)
    setId(row.id_phrase)
    setFr(row.fr)
    setEn(row.en)
    setPage(row.page)
  };

  const add =()=>{
      if(id&&en&&ar&&fr&&page){
        const _docRef= doc(db,"Lang",row.id);
        updateDoc(_docRef,{
          id_phrase:id,
          fr,
          en,
          ar,
          createdAt:new Date(),
          page,
        })
        }else{
        alert("wa 3mrhom kamlin asahbi *=* ")
      }
  }
  const handleDelete=()=>{
        const _docRef= doc(db,"Lang",row.id);
        deleteDoc(_docRef).then(()=>{
          handleClose()
        })
  }

  return (
    <div>
        <button onClick={handleClickOpen} className='px-4 py-2 rounded-full bg-black text-white flex float-right items-center gap-2'>Edit  <Edit/></button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='flex items-center justify-between' id="alert-dialog-title">
          Add new phrase
        <button onClick={handleDelete} className='px-4 py-2 rounded-full bg-black text-white flex float-right items-center gap-2'>delete </button>
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