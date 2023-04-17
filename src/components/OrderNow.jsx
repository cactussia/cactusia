import React from 'react'

function OrderNow() {
  return (
    <div className='flex-1 flex justify-center items-center  h-full'>
        <div className='w-64'>
            <p className='text-base text-gray-600'>Total Price </p>
            <h1 className='text-6xl text-green'>130 Dh</h1>
            <hr className='bg-red-300 my-3'/>
            <p className='text-sm py-2 text-gray-600 bg-dark-white p-2 rounded-md my-3'> dolor sit amet consectetur adipisicing elit. Cupiditate illo ve </p>
            <button className="hover:bg-green-dark duration-200 hover:scale-105 px-6 py-2 bg-green text-white font-normal text-lg">Order now</button>
        </div>
    </div>
  )
}

export default OrderNow