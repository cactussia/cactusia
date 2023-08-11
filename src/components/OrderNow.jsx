import { useContext, useEffect, useState } from 'react'
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { CartContext } from "../Context/CartContext";
import {motion} from "framer-motion"
import { getPriceByQte } from '../utils';
import { useNavigate } from 'react-router-dom';
import useLang from '../store/useLang';
import ArrowIcon from './svg/ArrowIcon';
import LordIcon from './svg/LordIcon';

import DIF1 from '../assets/icons/delivery-truck.gif'
import DIF2 from '../assets/icons/delivery-scooter.gif'
import DIF3 from '../assets/icons/delivery.gif'

function OrderNow() {

  const {langs , lang , langSelected }=useLang()


  // switch icon frames, DIF: Delivery Icon Frame
  const DIF = [DIF1, DIF2, DIF3];
  const [dif, setDif] = useState(0);

  // swith to the next frame every 1s in a loop sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setDif((dif) => (dif + 1) % DIF.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);
  //------------------------------------------------//


  const {cart}=useContext(CartContext)
  const navigate = useNavigate()

  // const getPrice = ()=>{
  //   let price = 0;
  //   cart.forEach(element => {
  //     price+=element.quantity * 65 
  //   });
  //   return price
  // }
  const getPriceDelivery = () => getPotNum()<3?35:0;
  const getPrice =() => getPriceByQte(getPotNum())+getPriceDelivery()

  const getPotNum = ()=>{
    let potNum = 0;
    cart.forEach(element => {
      potNum+=element.quantity 
    });
    return potNum
  }
  return (
    <motion.div initial={{x:200}} animate={{x:0}} className="flex-1 w-full flex justify-center items-center ">
      <div className="lg:w-64 px-4 mb-5 w-full">
        
        <p className="text-sm mb-2 text-gray-600 bg-dark-white2 border py-1 px-2 rounded-md w-fit">{getPotNum()} pot cactus = {getPriceByQte(getPotNum())} Dh</p>
        <p className="text-base text-gray-600">
          
            {lang?.length>0 && lang.filter(f=>f.id_phrase=="dprice")[0][langs[langSelected]]}
        </p>
        <h2 className="text-2xl text-green font-semibold ">{getPriceDelivery() === 0 ? "Free Delivery": `${getPriceDelivery()} Dh`}</h2>
        <p className="text-base text-gray-600 ">
            {lang?.length>0 && lang.filter(f=>f.id_phrase=="totalprice")[0][langs[langSelected]]}
        </p>
        <h1 className="text-7xl text-green font-bold">{getPrice()} <span className="text-3xl">Dh</span></h1>
        <hr className=" my-3" />
        {
        <p className={(!(getPotNum()<3) ? " h-0 py-0 my-0 scale-y-0 absolute " :" h-full py-3 px-3 my-3 scale-y-100 ")+" text-sm uppercase py-2 text-orange-950 font-semibold bg-[#e0d5d0] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-orange-200 before:bg-opacity-80 before:-z-10 before:animate-ping before:duration-300 px-2 overflow-hidden rounded-md my-3"}>
          
            {lang?.length>0 && lang.filter(f=>f.id_phrase=="3offer")[0][langs[langSelected]]}
            {/* <LordIcon 
              src={"https://cdn.lordicon.com/jyijxczt.json"}  
              colors={{pc:"#5c230a", sc:"#5c230a", tc:"#faddd1", qc:"#5c230a"}}
              trigger={"loop"}
              state={"loop"}
            /> */}
            <img src={DIF[dif]} className='ml-1 inline relative h-[36px] w-[36px] object-cover object-center aspect-square mix-blend-multiply hue-rotate-[-140deg] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-orange-950 before:z-20' alt=""/>

        </p>
        }
        <button onClick={()=>navigate("/ordernow")} className="rounded-lg w-full lg:w-fit hover:bg-green-dark duration-200 hover:scale-105 px-6 py-3 bg-green flex justify-center items-center gap-2 text-white font-semibold text-lg uppercase tracking-wider">
            {lang?.length>0 && lang.filter(f=>f.id_phrase=="ordernow")[0][langs[langSelected]]}
          {/* <EastRoundedIcon/> */}
          <ArrowIcon width={30} height={30} target={"button"}/>
        </button>
      </div>
    </motion.div>
  );
}

export default OrderNow;
