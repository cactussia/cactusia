import React, { useContext } from 'react'
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { ControlersContext } from '../Context/ControlersContext';

function MarketCart() {
   const {pot,cactus}=useContext(ControlersContext);
  return (
    <div className='h-44 flex justify-center items-start'>
      <div className=' p-10 rounded-lg flex gap-2'>
        <button className='w-20 h-20 bg-dark-white  border-2 border-green flex justify-center items-center'>
          <div className='relative w-[50px] flex flex-row justify-center items-center drop-shadow-md'>
              <img draggable={false} className={'h-[40px] absolute top-[10px] duration-150 '} src={pots[pot]}></img>
              <img draggable={false} className='h-[40px] opacity-0' src={pots[pot]}></img>
              <img draggable={false} className={'w-[40px] absolute top-[-12px] duration-150 '} src={cactuses[cactus]}></img>
          </div>
        </button>
        <button className='w-20 h-20 bg-dark-white  border-2 border-green'>
          <AddRoundedIcon className="text-green" />
        </button>
      </div>
    </div>
  )
}

export default MarketCart