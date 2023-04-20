import { Link } from 'react-router-dom'
import PlantViewr from '../components/PlantViewr'
import { ArrowRight } from '@mui/icons-material';
import HandMade from './HandMade';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { useEffect, useState } from 'react';

export default function Main() {
  const [left , setLeft ] = useState(0)
  return (
    <main className="flex flex-col flex-1 ">
        <div className='container mx-auto flex-[6] w-full flex items-end'>
          <h1 className=' text-9xl uppercase font-extrabold text-green'>
          welcome <br></br> to our jarden
          </h1>
        </div>
        <div className='flex-[4] bg-green w-full flex'>
        <Link to={"/market"} className='bg-green h-full w-full flex items-center hover:ml-10 duration-200'>
          <div className='container mx-auto text-7xl flex-1 h-full items-center uppercase font-bold text-dark-white flex gap-4 hover:gap-6 duration-200'>
              go to market
              <EastOutlinedIcon sx={{fontSize:80}}/>
          </div>
        </Link>
        </div>
        <div className='flex-[4] relative container mx-auto'>
          <div className='absolute  right-52 -top-36  scale-[.5]'>
            <HandMade dark={true} />
          </div>
          <div className='absolute -top-64 right-16 scale-125'>
            <PlantViewr clickable={false}/>
          </div>

        </div>
        <div className=' h-10 relative bg-dark-white2 border w-full overflow-hidden'>
          <span style={{left:left}} className={'text-xl font-bold text-green-dark uppercase absolute top-[50%] translate-y-[-50%] ' }>give them care they give you love </span>
        </div>
    </main>
  );
}
