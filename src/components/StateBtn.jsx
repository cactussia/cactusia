import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';



const colors = {
    new:"rgb(180 194 13)",
    confirmed:"rgb(34 34 216)",
    delivered:"rgb(40 171 40)"
}
export default function StateBtn({state,id,cats,setUpdate}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStateTo = (key)=>{
    const docRef = doc(db,"Orders",id);
    updateDoc(docRef,{
        state:cats[key].toLowerCase()
    })
    setUpdate(p=>p+1)
  }
  return (
    <div>
        <button 
        className='p-1 px-4 bg-blue-500 rounded-full text-white font-semibold'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{background:colors[state]}}
        >{state}</button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
            cats.map((c,key)=>{
                if(key!=0){
                    return(
                        <MenuItem onClick={()=>{handleClose();changeStateTo(key)}}>{c}</MenuItem>
                    )
                }
            })
        }
      </Menu>
    </div>
  );
}
