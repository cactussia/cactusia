import { ArrowBack } from '@mui/icons-material'
import {useContext, useState}  from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { colRef } from '../firebase'
import { CartContext } from '../Context/CartContext'
import { getPriceByQte } from '../utils'

function ComplateOrder() {
    const navigate= useNavigate()
    const [fullName,setFullName]=useState("");
    const [number,setNumber]=useState("");
    const [city,setCity]=useState("");
    const [address,setAddress]=useState("");
    const {cart}=useContext(CartContext)
    const [err,setErr]=useState(false)

    const orderNow=()=>{
      let date=new Date();
      if(fullName&&number&&city&&address){
        addDoc(colRef,{
          name:fullName,
          number,
          city,
          address,
          state:"new",
          createdAt:serverTimestamp(),
          date:date.getMonth()+"/"+date.getDate(),
          items:cart,
          price:getPriceByQte(cart.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0)),
        }).then(()=>{
          navigate("/")
        })
      }else{
        setErr(true)
      }
    }


  return (
    <motion.div 
      initial={{ y: -300 }}
      animate={{ y: 0 }}
     className='min-h-screen md:px-8 px-4 py-6 container mx-auto'>
        <button onClick={()=>navigate("/market")} className='text-dark-white bg-green px-4 py-2 rounded-xl'>
            <ArrowBack ></ArrowBack>
            Go back
        </button>
        <h1 className='text-4xl font-bold text-[#728b67] py-8'>Could you help us with some infos :)</h1>
        <p className='font-semibold text-[#728b67aa] '>those info will just help us to get u , u can send those info in whatsapp if u want</p>
        <div className='flex flex-col mt-10 gap-4'>
            <input value={fullName} onInput={(e)=>setFullName(e.target.value)}  placeholder='full name' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input value={number} onInput={(e)=>setNumber(e.target.value)} placeholder='phone' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input value={city} onInput={(e)=>setCity(e.target.value)}  placeholder='city' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input value={address} onInput={(e)=>setAddress(e.target.value)}  placeholder='full address' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            {
            err && <p className='text-red-600 font-semibold'>something didn't fill !</p>
            }
            <input onClick={orderNow} type="button" value="complete" className='shadow-xl cursor-pointer p-2 px-8 rounded-xl md:w-fit w-full font-semibold text-white bg-[#728b67] text-lg  outline-[#728b67]'/>
        </div>
    </motion.div>
  )
}

export default ComplateOrder