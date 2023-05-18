import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"

function ComplateOrder() {
    const navigate= useNavigate()
  return (
    <motion.div 
      initial={{ y: -300 }}
      animate={{ y: 0 }}
     className='min-h-screen md:px-8 px-4 py-6 container mx-auto'>
        <button onClick={()=>navigate("/market")} className='text-dark-white bg-green px-4 py-2 rounded-xl'>
            <ArrowBack ></ArrowBack>
            Go back
        </button>
        <h1 className='text-4xl font-bold text-[#728b67] py-8'>Could you help us with some infos :)</h1>
        <p className='font-semibold text-[#728b67aa] '>those info will just help us to get u , u can send those info in whatsapp if u want</p>
        <div className='flex flex-col mt-10 gap-4'>
            <input placeholder='your name' className='shadow-lg p-3 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input placeholder='your phone' className='shadow-lg p-3 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input placeholder='your address' className='shadow-lg p-3 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input type="button" value="complete" className='shadow-xl cursor-pointer p-2 px-8 rounded-xl md:w-fit w-full font-semibold text-white bg-[#728b67] text-lg  outline-[#728b67]'/>
        </div>
    </motion.div>
  )
}

export default ComplateOrder