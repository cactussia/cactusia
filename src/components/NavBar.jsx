import React from 'react'
import logo from "../assets/imags/logo.png"
import { Link } from 'react-router-dom'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'; 

function NavBar() {
  return (
    <div className='container h-32 p-8 mx-auto flex justify-between items-start '>
        <h1 className='text-4xl flex-1 font-semibold text-green-dark '>Market</h1>
        <div className='flex-1 flex justify-center'>
            <Link to={"/"}>
                <img draggable={false} className='w-20 mix-blend-darken' src={logo}/>
            </Link>
        </div>
        <div className='flex-1 flex justify-end'>
            <button className='w-16 h-16 bg-green rounded-full hover:bg-green-dark duration-200 hover:scale-105'>
                    <MenuRoundedIcon sx={{ color: "#fff", fontSize: 30 }}/>
            </button>
        </div>
    </div>
  )
}

export default NavBar