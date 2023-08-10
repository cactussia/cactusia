import MarketBodyControlers from './MarketBodyControlers'
import PlantViewr from './PlantViewr'
import OrderNow from './OrderNow'
import MarketCart from './MarketCart'

import { useMediaQuery } from 'react-responsive'




function MarketBody() {


  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1050px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1006px)' })



  return (
    <div className='flex flex-col flex-1 container mx-auto'>
        <div className='py-8 flex justify-center items-center flex-col lg:flex-row '>
            <div className='hidden flex-1 lg:block'><MarketBodyControlers /></div>
            <PlantViewr/>
            <div className='block flex-1 lg:hidden'><MarketBodyControlers/><MarketCart/></div>
             <OrderNow/>
        </div>
            <div className='hidden  lg:block'><MarketCart/></div>
    </div>
  )
}

export default MarketBody