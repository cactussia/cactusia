import React from 'react'
import MarketBodyControlers from './MarketBodyControlers'
import PlantViewr from './PlantViewr'
import OrderNow from './OrderNow'
import MarketCart from './MarketCart'

function MarketBody() {
  return (
    <div className='flex flex-col flex-1 container mx-auto'>
        <div className='flex flex-1'>
            <MarketBodyControlers/>
            <PlantViewr/>
            <OrderNow/>
        </div>
        <MarketCart/>
    </div>
  )
}

export default MarketBody