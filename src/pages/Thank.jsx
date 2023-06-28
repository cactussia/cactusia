import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Main from '../components/Main'
import NavBar from '../components/NavBar'

function Thank() {
  return (
    <section 
     className='min-h-screen md:px-8 flex flex-col px-4 py-6 container mx-auto'>
        <NavBar/>
        <div className='py-8 flex flex-1 flex-col items-center justify-center'>
            <h1 className='text-7xl py-6 uppercase font-semibold text-green'>thank you for your order</h1>
            <h3 className='text-2xl text-green-800 font-medium'>you will reserve a call to confirm your order </h3>
            <Link to={"/market"} className="bg-green text-white py-4 px-8 rounded-lg my-6 text-xl">return to market</Link>
        </div>
    </section>
  )
}

export default Thank