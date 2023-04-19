import { Link } from 'react-router-dom'
import PlantViewr from '../components/PlantViewr'
import { ArrowRight } from '@mui/icons-material';
import HandMade from './HandMade';

export default function Main() {
  return (
    <main className="container w-full bg-transparent mt-24 h-[45vh] relative flex items-start justify-start gap-10 flex-col">
      <h1 className='bg-transparent text-8xl px-8 uppercase font-semibold text-green w-[60%]'>welcome to our jarden</h1>
        <button className='group flex items-center w-full pl-10 hover:pl-14 py-10 text-6xl text-left uppercase font-semibold bg-green text-bleach transition-all'>
          <Link className='mr-4 group-hover:mr-8 transition-all' to="/market">Go To Market</Link>
          <ArrowRight style={{fontSize: 100}}/>
        </button>
      <div onClick={e => e.preventDefault()} className='absolute z-10 right-4 bottom-1 scale-125'>
        <PlantViewr />
      </div>
      <div className='absolute right-36 top-36 scale-[.45]'>
        <HandMade />
      </div>
    </main>
  );
}
