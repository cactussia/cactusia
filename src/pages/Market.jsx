import React from 'react'
import NavBar from '../components/NavBar'
import MarketBody from '../components/MarketBody'

function Market() {
  return (
    <div className='h-[100vh] background-market flex flex-col'>
        <NavBar/>
        <MarketBody/>
    </div>
  )
}

export default Market