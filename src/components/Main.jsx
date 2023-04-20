import { Link } from 'react-router-dom'
import PlantViewr from '../components/PlantViewr'
import { ArrowRight } from '@mui/icons-material';
import HandMade from './HandMade';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Main() {
  const [left , setLeft ] = useState(0)
  const matches = useMediaQuery('(min-width:630px)');

  return (
    <main className="flex flex-col flex-1 overflow-hidden">
        <div className='px-4 container mx-auto flex-1 sm:flex-[2] md:flex-[3] lg:flex-[5] xl:flex-[6] w-full flex items-end'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-4 uppercase font-extrabold text-green'>
          welcome <br></br> to our jarden
          </h1>
        </div>
        <div className='flex-1 sm:flex-[2] md:flex-[3] lg:flex-[4]  bg-[#728b67] w-full flex'>
        <Link to={"/market"} className='z-10 md:z-0 bg-green  hover:my-1 w-full flex md:items-center hover:ml-10 duration-200'>
          <div className='container px-4 mx-auto text-4xl sm:text-6xl lg:text-7xl  flex-1 md:h-full items-center uppercase font-bold text-dark-white flex gap-4 hover:gap-6 duration-200'>
              go to market
              <EastOutlinedIcon sx={{fontSize:matches?80:30}}/>
          </div>
        </Link>
        </div>
        <div className='flex-[5] lg:flex-[4] relative container mx-auto '>
          <div className='md:absolute hidden lg:flex md:right-52 md:-top-36  scale-[.5] '>
            <HandMade dark={true} />
          </div>
          <div className='md:z-[10] lg:absolute relative h-full  lg:-top-64  lg:right-16 w-fit max-w-[100vw] mx-auto md:w-fit flex justify-center items-center md:mx-auto md:scale-110 xl:scale-150 scale-125 '>
            <PlantViewr clickable={false}/>
            <div className='absolute flex lg:hidden right-0 bottom-5  scale-[.5] '>
              <HandMade dark={true} />
            </div>
          </div>

        </div>
        <div className=' bg-dark-white2 border w-full'>
          <marquee className='text-2xl lg:text-3xl xl:text-4xl font-bold text-green-dark uppercase' >give them care they give you love &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;give them care they give you love &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;give them care they give you love &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;give them care they give you love &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </marquee>
        </div>
    </main>
  );
}
