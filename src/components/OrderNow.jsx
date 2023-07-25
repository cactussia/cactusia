import { useContext } from 'react'
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { CartContext } from "../Context/CartContext";
import {motion} from "framer-motion"
import { getPriceByQte } from '../utils';
import { useNavigate } from 'react-router-dom';
import useLang from '../store/useLang';
import ArrowIcon from './svg/ArrowIcon';

function OrderNow() {

  const {langs , lang , langSelected }=useLang()


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
    <motion.div initial={{x:200}} animate={{x:0}} className="flex-1 w-full flex justify-center items-center  h-full">
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
        <p className={(!(getPotNum()<3) ? " h-0 py-0 my-0 scale-y-0 absolute " :" h-full py-2 my-3 scale-y-100 ")+"  overflow-hidden text-sm py-2 text-gray-600 bg-dark-white px-2 rounded-md my-3"}>
          
            {lang?.length>0 && lang.filter(f=>f.id_phrase=="3offer")[0][langs[langSelected]]}
        </p>
        }
        <button onClick={()=>navigate("/complete-order")} className="rounded-lg w-full lg:w-fit hover:bg-green-dark duration-200 hover:scale-105 px-6 py-3 bg-green flex justify-center items-center gap-2 text-white font-semibold text-lg uppercase tracking-wider">
            {lang?.length>0 && lang.filter(f=>f.id_phrase=="ordernow")[0][langs[langSelected]]}
          {/* <EastRoundedIcon/> */}
          <ArrowIcon width={30} height={30} target={"button"}/>
        </button>
      </div>
    </motion.div>
  );
}

export default OrderNow;
