import { ArrowBack } from '@mui/icons-material'
import {useContext, useState}  from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { colRef } from '../firebase'
import { CartContext } from '../Context/CartContext'
import { getPriceByQte } from '../utils'
import { ControlersContext } from '../Context/ControlersContext'

function ComplateOrder() {
    const navigate= useNavigate()
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [number,setNumber]=useState("");
    const [city,setCity]=useState("");
    const [address,setAddress]=useState("");
    const {cart,setCart}=useContext(CartContext)
    const {finalPots,finalCactus,setPot,setCactus,setQuantity}=useContext(ControlersContext)
    const [err,setErr]=useState(false)

    const orderNow=()=>{
      let date=new Date();
      if(firstName&&lastName&&number&&city&&address){
        addDoc(colRef,{
          name:firstName,
          lastName:lastName,
          number,
          city,
          address,
          state:"new",
          createdAt:serverTimestamp(),
          date:date.getMonth()+"/"+date.getDate(),
          items:cart.map(m=>({...m,pot:finalPots[m.pot].number,cactus:finalCactus[m.cactus].number})),
          price:getPriceByQte(cart.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0)),
        }).then(()=>{
          navigate("/thank")
          setCart([{pot:0,cactus:0,quantity:1}])
          setPot(0)
          setCactus(0)
          setQuantity(1)
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
        <div className='flex flex-col mt-10 gap-4'>
            <input value={firstName} onInput={(e)=>setFirstName(e.target.value)}  placeholder='first name' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input value={lastName} onInput={(e)=>setLastName(e.target.value)}  placeholder='last name' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
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