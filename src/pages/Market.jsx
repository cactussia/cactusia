import React from 'react'
import NavBar from '../components/NavBar'
import MarketBody from '../components/MarketBody'

function Market() {
  return (
    <div className='h-[100vh] w-[100vw] flex  overflow-hidden relative'>
    <div className='background-market flex flex-col flex-1 '>
        <NavBar/>
        <MarketBody/>
    </div>
    </div>
  )
}

export default Market