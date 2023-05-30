import React from 'react'
import CustomizedTables from '../components/OrdersTabel'
import logo from "../assets/imags/logo.png"
function Admin() {
  return (
    <div className='flex min-h-screen'>
        <div className='relative  bg-[#fff9]'>

    <div className=' sticky top-0 h-fit'>
        <img src={logo} className='w-12 py-3 mb-2 mx-auto'></img>
        <div className='flex flex-col gap-2'>
            <button className='bg-white px-6 py-2 border-l-8 border-green-700'>Orders</button>
        </div>
    </div>
        </div>
    <div className='p-8 px-10 flex-1'>
        <h1 className='text-4xl  py-8'>Orders</h1>
        <CustomizedTables/>
    </div>



    </div>
  )
}

export default Admin