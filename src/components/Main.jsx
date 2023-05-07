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
    <main className="flex flex-col flex-1 overflow-hidden ">
        <div className='px-8 container mx-auto flex-1 sm:flex-[2] md:flex-[3] lg:flex-[5] xl:flex-[6] w-full flex items-end'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-4 uppercase font-extrabold text-green'>
          welcome <br></br> to our jarden
          </h1>
        </div>
        <div className='flex-1 sm:flex-[2] md:flex-[3] lg:flex-[4]  bg-[#728b67] w-full flex'>
        <Link to={"/market"} className='z-10 md:z-0 bg-green  hover:my-1 w-full flex md:items-center hover:ml-10 duration-200'>
          <div className='updown container px-8 mx-auto text-3xl sm:text-6xl lg:text-7xl  flex-1 md:h-full items-center uppercase font-bold text-dark-white flex gap-4 hover:gap-6 duration-200'>
              go to market
              <EastOutlinedIcon sx={{fontSize:matches?80:30}}/>
          </div>
        </Link>
        </div>
        <div className='flex-[5] lg:flex-[4] relative container mx-auto '>
          <div className='md:absolute hidden lg:flex md:right-32 md:-top-36  scale-[.5] '>
            <HandMade dark={true} />
          </div>
          <div className='md:z-[10] lg:absolute relative h-full  lg:-top-64  lg:right-0 w-fit max-w-[100vw] mx-auto md:w-fit flex justify-center items-center md:mx-auto  2xl:scale-[1.2]  scale-100 '>
            <div className='absolute flex lg:hidden -right-5 bottom-0  scale-[.5] '>
              <HandMade dark={true} />
            </div>
            <PlantViewr clickable={false}/>
          </div>

        </div>
        <div className='pt-2 bg-dark-white2 border w-full'>
          <marquee className='text-2xl lg:text-3xl xl-text-4xl font-bold text-green-dark uppercase' >give them care they give you love </marquee>
        </div>
    </main>
  );
}
