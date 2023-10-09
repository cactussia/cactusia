import { useContext , useEffect, useRef } from 'react'
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { ControlersContext } from '../Context/ControlersContext';
import { CartContext } from '../Context/CartContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {motion} from "framer-motion"
import { CardTravel, Shop } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CartIcon from './svg/CartIcon';
import useLang from '../store/useLang';

function MarketCart() {
  const {pot,setPot,cactus,setCactus ,quantity,setQuantity,finalCactus,finalPots}=useContext(ControlersContext);
  const {cart ,currentItem ,setCurrentItem ,setCart}= useContext(CartContext);

  const {langs,lang,langSelected,setLangSelected}=useLang()
  const cartContainerRef = useRef(null);

  // Scroll to the end of the cart container when a new item is added
  useEffect(() => {
    if (cartContainerRef.current) {
      cartContainerRef.current.scrollLeft = cartContainerRef.current.scrollWidth;
    }
  }, [cart]);

  const handelSelect = (key)=>{
    setPot(cart[key].pot)
    setCactus(cart[key].cactus)
    setQuantity(cart[key].quantity)
    setCurrentItem(key)
  }
  
  const handelAddNew = ()=>{
    let key = cart.length - 1
    setCart([...cart,{pot:0,cactus:0,quantity:1}])
    setCurrentItem(cart.length)
    setPot(cart[key].pot)
    setCactus(cart[key].cactus)
    setQuantity(cart[key].quantity)
  }

  const handleRemove =(key)=>{
    if(cart.length>1){
      setCart(cart.filter((item,i)=>key!==i))
      setCurrentItem(0)
    }
  }

  useEffect(() => {
    // if (cart.length == 0) {
    //   setCart([{pot:0,cactus:0,quantity:1}])
    // }
    if (!cart[currentItem]) return;
    setPot(cart[currentItem].pot)
    setCactus(cart[currentItem].cactus)
    setQuantity(cart[currentItem].quantity)
  }, [cart, currentItem])
   
  return (
    <motion.div initial={{x:-200}} animate={{x:0}}  className={`mb-2 py-4 flex flex-col-reverse items-center justify-center gap-2 overflow-y-visible`}>
      <ul
      ref={cartContainerRef}
      className={`bg-[#0001] max-w-[1200px]  xl:pt-6 md:pt-6 pt-6 pb-4 px-14 w-screen min-w-[450px] border-2 border-[#0001] rounded-lg flex ${ cart.length <= 4 && "justify-center" } lg:justify-center items-center gap-2 overflow-x-auto overflow-y-visible transform transition-all`}
      // className={`xl:pt-12 pl-4 md:pt-10 pt-8 max-w-full rounded-lg flex gap-2 overflow-x-auto overflow-y-visible`}
      >
        {
          cart.map((item,key)=>{
            return(
              <li key={key} title={`${finalPots[item?.pot]?.name} Pot and ${finalCactus[item?.cactus]?.name} Cactus`} className={'flex relative flex-col items-center gap-1 drop-shadow-lg'}>
                <button onClick={()=>handelSelect(key)} className={' w-20 h-20 bg-dark-white duration-100 rounded-lg   flex justify-center items-center flex-col border-2 overflow-y-visible  '+(key==currentItem?" border-green " :"border-[#0001] ")}>
                  <div className={(key==currentItem ?"scale-[1.25]":"scale-[1.20]")+' duration-150 relative -translate-y-5 w-[50px] flex flex-row justify-center items-center drop-shadow-md'}>
                    <img onContextMenu={e => e.preventDefault()} draggable={false} className={'h-[50px] absolute top-[10px] duration-150  pointer-events-none select-none'} src={key==currentItem?finalPots[pot]?.img:finalPots[item?.pot]?.img}></img>
                    <img onContextMenu={e => e.preventDefault()} draggable={false} className='h-[50px] opacity-0 pointer-events-none select-none' src={key==currentItem?finalPots[pot]?.img:finalPots[item?.pot]?.img}></img>
                    <img onContextMenu={e => e.preventDefault()} draggable={false} className={'w-[50px] absolute top-[-18px] duration-150  pointer-events-none select-none'} src={key==currentItem? finalCactus[cactus]?.img: finalCactus[item?.cactus]?.img}></img>
                  </div>
                  {/* <p className='px-4 rounded-md font-medium text-gray-700 border-green bg-[#0001] '>
                    {key==currentItem?quantity:item.quantity}
                  </p> */}
                </button>
              {
                key==currentItem && cart.length>1 &&
                <button onClick={()=>handleRemove(key)} className={'z-[0] hover:bg-dark-white2 duration-100 bg-dark-white border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full p-1'}>
                  <CloseRoundedIcon sx={{color:"#444",fontSize:18}}/>
                </button>
              }
              </li>
            )
          })
        }
      </ul>
      <div className={`w-screen flex justify-center items-center transition-all`}>
        <div className='relative mx-3'>
            <CartIcon width={35} height={35} target="#addtocart"/>
            <span className='rounded-2xl absolute -top-1 -right-1 text-white text-sm bg-[#3f4f35] border border-white w-5 h-5 flex justify-center items-center aspect-square'>{cart.length} </span>
        </div>
        <button id="addtocart" onClick={handelAddNew} className='relative py-3
         drop-shadow-lg w-full lg:max-w-screen-sm  mx-4 bg-green flex justify-center items-center gap-4 text-white font-semibold text-md tracking-wider uppercase rounded-lg hover:bg-green-dark active:scale-90 transition-all'>
          {/* <AddShoppingCartIcon className="text-green scale-[150%]" /> */}
          <span>{lang.filter(f=>f.id_phrase=="addtocart")[0][langs[langSelected]]}</span>
        </button>
      </div>
    </motion.div>
  )
}

export default MarketCart;