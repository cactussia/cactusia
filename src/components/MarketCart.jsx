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
        <button className='w-20 h-20 bg-dark-white duration-100 rounded-lg border-2 border-green flex justify-center items-center flex-col'>
          <div className='relative -translate-y-5 w-[50px] flex flex-row justify-center items-center drop-shadow-md'>
              <img draggable={false} className={'h-[50px] absolute top-[10px] duration-150 '} src={pots[pot]}></img>
              <img draggable={false} className='h-[50px] opacity-0' src={pots[pot]}></img>
              <img draggable={false} className={'w-[50px] absolute top-[-18px] duration-150 '} src={cactuses[cactus]}></img>
          </div>
          <p className='px-4 rounded-md font-medium text-gray-700 border-green bg-[#0001] '>
            5
          </p>
        </button>
        <button className='w-20 h-20 duration-100 border-dashed hover:bg-dark-white rounded-lg border-2 border-green'>
          <AddRoundedIcon className="text-green" />
        </button>
      </div>
    </div>
  )
}

export default MarketCart