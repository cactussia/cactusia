import React, { useContext } from 'react'
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { ControlersContext } from '../Context/ControlersContext';
import { CartContext } from '../Context/CartContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function MarketCart() {
   const {pot,setPot,cactus,setCactus ,quantity,setQuantity}=useContext(ControlersContext);
   const {cart ,currentItem ,setCurrentItem ,setCart}= useContext(CartContext);
   const handelSelect = (key)=>{
      setPot(cart[key].pot)
      setCactus(cart[key].cactus)
      setQuantity(cart[key].quantity)
      setCurrentItem(key)
   }
   const handelAddNew = ()=>{
        let key = cart.length
        let newCart = cart
        newCart.push({pot:0,cactus:0,quantity:1})
        setCart(newCart)
        setPot(cart[key].pot)
        setCactus(cart[key].cactus)
        setQuantity(cart[key].quantity)
        setCurrentItem(key)
   }
   const handleRemove =(key)=>{
        if(cart.length>1){
          let newCart = cart.filter((item,i)=>key!==i)
          setCart(newCart)
          setPot(cart[0].pot)
          setCactus(cart[0].cactus)
          setQuantity(cart[0].quantity)
          setCart(newCart)
          setCurrentItem(0)
        }
   }
  return (
    <div className='h-44 flex justify-center items-start'>
      <div className=' p-10 rounded-lg flex gap-2'>
        {
          cart.map((item,key)=>{
            return(
              <div className='flex relative flex-col items-center gap-1'>
              <button onClick={()=>handelSelect(key)} key={key} className={'w-20 h-20 bg-dark-white duration-100 rounded-lg  border-green flex justify-center items-center flex-col '+(key==currentItem&&" border-2 ")}>
                <div className='relative -translate-y-5 w-[50px] flex flex-row justify-center items-center drop-shadow-md'>
                    <img draggable={false} className={'h-[50px] absolute top-[10px] duration-150 '} src={key==currentItem?pots[pot]:pots[item.pot]}></img>
                    <img draggable={false} className='h-[50px] opacity-0' src={key==currentItem?pots[pot]:pots[item.pot]}></img>
                    <img draggable={false} className={'w-[50px] absolute top-[-18px] duration-150 '} src={key==currentItem? cactuses[cactus]: cactuses[item.cactus]}></img>
                </div>
                <p className='px-4 rounded-md font-medium text-gray-700 border-green bg-[#0001] '>
                  {key==currentItem?quantity:item.quantity}
                </p>
              </button>
              {
                  key==currentItem && cart.length>1 &&
                  <button onClick={()=>handleRemove(key)} className={'z-[0] hover:bg-dark-white2 duration-100 bg-dark-white border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full p-1'}>
                    <CloseRoundedIcon sx={{color:"#444",fontSize:18}}/>
                  </button>
              }
              </div>
            )
          })
        }
        <button onClick={handelAddNew} className='w-20 h-20 duration-100 border-dashed hover:bg-dark-white rounded-lg border-2 border-green'>
          <AddRoundedIcon className="text-green" />
        </button>
      </div>
    </div>
  )
}

export default MarketCart