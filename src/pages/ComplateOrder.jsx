import {useContext, useEffect, useMemo, useState}  from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { colRef } from '../firebase'
import { CartContext } from '../Context/CartContext'
import { OrderFields, getPriceByQte } from '../utils'
import { ControlersContext } from '../Context/ControlersContext'
import Thank from './Thank'
import ArrowIcon from '../components/svg/ArrowIcon'
import LordIcon from '../components/svg/LordIcon'

function ComplateOrder() {
    const navigate = useNavigate();
    const[isFormSubmitted, setIsFormSubmitted] = useState(false)
    // order state tracker
    const [order, setOrder] = useState({firstname:"",lastname:"",phonenumber:"",city:"",address:""});
    // track form fields errors
    const [errors, setErrors] = useState({});

    const {cart,setCart}=useContext(CartContext);
    // const [formatedCart, setFormatedCart] = useState([...cart]);
    const {finalPots,finalCactus,setPot,setCactus,setQuantity}=useContext(ControlersContext)

    // count how many elemnts in the cart
    const cartCount = useMemo(() => cart.reduce((acc,curr)=>acc+curr.quantity,0), [cart]);
    const DeliveryPrice = useMemo(() => cartCount < 3 ? 35 : 0, [cartCount]);
    const TotalPrice = useMemo(() => getPriceByQte(cartCount) + DeliveryPrice, [cartCount, DeliveryPrice]);

    // the cart flag for opening and closing the cart
    const [isCartOpen, setIsCartOpen] = useState(false);

    // format the cart items to be stored in the database to avoid diplucation
    // like [{pot:0,cactus:0,quantity:1},{pot:0,cactus:0,quantity:1}, {pot:2,cactus:4,quantity:1}] => [{pot:0,cactus:0,quantity:2}, {pot:2,cactus:4,quantity:1}]
    // const formatCart = useMemo(()=>{
    //   let newCart = [...cart];
    //   newCart.forEach((item, index) => {
    //     const foundIndex = newCart.findIndex(i => i.pot === item.pot && i.cactus === item.cactus);
    //     if (foundIndex !== index) {
    //       newCart[foundIndex].quantity += item.quantity;
    //       newCart.splice(index, 1);
    //     }
    //   });
    //   return newCart;
    // }, [cart]);

    // thank page state tracker
    const [showThankPage, setShowThankPage] = useState(false);

    // store the order form fields in the state while tracking the errors
    const storeOrder = (field, e) => {
      const { name, value } = e.target;
      const regex = new RegExp(field.regex);

      setOrder({ ...order, [name]: value.trim() });
      value ? setErrors({...errors, [name]: regex.test(value.trim()) ? "" : field.error}) : setErrors({...errors, [name]: field.empty});
    };

    const orderNow = e =>{
      console.log("Order Errors", errors)
      console.log({order});
      e.preventDefault();
      setIsFormSubmitted(true);
      
      const {firstname, lastname, phonenumber, city, address} = order;

      if (!firstname || !lastname || !phonenumber || !city || !address) {
        setErrors({...errors,  empty: "Please Complete your order"});
        return;
      }

      if (Object.values(errors).every(error => error)) alert("there is still errors")


      // let date=new Date(); don't use the user local time to avoid non-accurate time
      addDoc(colRef,{
        name:firstname.trim(),
        lastName:lastname.trim(),
        number:phonenumber,
        city,
        address: address.trim(),
        state:"new",
        createdAt:serverTimestamp(),
        date: serverTimestamp(),
        items:cart.map(m=>({...m,pot:finalPots[m.pot].number,cactus:finalCactus[m.cactus].number})),
        price:getPriceByQte(cart.map(p=>p.quantity).reduce((partialSum, a) => partialSum + a, 0)),
      })
      .then(()=>{
        setCart([{pot:0,cactus:0,quantity:1}])
        setPot(0)
        setCactus(0)
        setQuantity(1)
        setShowThankPage(true);
        setIsFormSubmitted(false);
      })
      .catch(err=>{
        console.error(err)
        setIsFormSubmitted(false);
        setErrors({...errors, error: "Something went wrong, please try again later 👷🏻‍♂️"});
      });
    }

    // set a timeout of 5s to clear the errors
    useEffect(()=>{
      // if (Object.values(errors).length === 0) return;
      const timeout = setTimeout(()=>setErrors({...errors, error: "", empty: ""}), 5000);
      return () => clearTimeout(timeout)
    }, [errors]);



    // set a timeout of 2min to return to the market after the Thank page was displayed
    useEffect(()=>{
      if (!showThankPage) return;
      
      const timeout = setTimeout(()=>{
        setShowThankPage(false);
        navigate("/market");
      }, 120000);

      return () => clearTimeout(timeout)
    }, [showThankPage])

  
  if (showThankPage) return <Thank name={order.firstname + " " + order.lastname} city={order.city} onReturn={()=>navigate("/market")}/>;


  return (
    <motion.div 
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      className='relative min-h-screen w-screen flex justify-center items-center bg-bleach overflow-hidden'>
        <form onSubmit={orderNow} className='container md:px-8 px-4 lg:w-1/2 flex justify-center items-center flex-col gap-4 bg-bleach'>
          <div className='h-[40px] md:w-[400px] w-full flex items-center justify-between'>
            <button id="goback" type='reset' onClick={()=>navigate("/market")} className='h-full flex items-center justify-center text-center gap-2 shadow-xl p-2 px-6 rounded-md w-fit font-semibold text-md uppercase active:scale-90 tracking-wider text-white bg-[#728b67] outline-[#728b67] transition-all'>
                <div className='rotate-180 flex justify-center items-center'>
                  <ArrowIcon width={30} height={30} target={"button#goback"}/>
                </div>
                Go back
            </button>
            <button type="button" id="cart" onClick={()=>setIsCartOpen(true)} className='h-full flex lg:hidden items-center justify-center text-center gap-2 shadow-xl p-2 px-6 rounded-md w-fit font-semibold text-md uppercase active:scale-90 tracking-wider text-white bg-[#728b67] outline-[#728b67] transition-all'>
              my cart
              <LordIcon 
                width={30}
                height={30} 
                target={"button#cart"}
                src={"https://cdn.lordicon.com/qzwudxpy.json"}
                trigger="hover"
                colors={{pc:"#fff",sc:"#fff", tc:"#fff", oc:"#afafaf"}}
              />
            </button>
          </div>
          {
            (errors.empty || errors.error) && <p className='py-4 md:w-[400px] w-full flex items-center justify-center bg-yellow-200 bg-opacity-40 text-yellow-600 font-semibold rounded-md uppercase transition-all animate-pulse'><span className='text-2xl px-2'>⚠</span> {errors.empty || errors.error} <span className='text-2xl px-2'>⚠</span></p>
          }
          {
            OrderFields.map((field,i)=>(
              <div key={i} className='md:w-[400px] w-full flex items-start justify-center gap-1 flex-col'>
                {
                  field.type === "textarea" ?
                  <textarea
                  onChange={(e)=>storeOrder(field, e)}
                  className={`shadow-lg p-4 rounded-lg w-full font-semibold text-base border ${(errors[field.name]) ? 'text-red-700 outline-red-700 placeholder:text-[#d67f7f]' : 'text-[#728b67] outline-[#728b67]'} resize-y`}
                  name={field.name}
                  placeholder={field.label}
                  // the textarea expand when the user type new lines
                  rows={order[field.name].split("\n").length}
                  ></textarea>
                  :
                  <input
                  onChange={(e)=>storeOrder(field, e)}
                  className={`shadow-lg p-4 rounded-lg w-full font-semibold text-base border ${(errors[field.name]) ? 'text-red-700 outline-red-700 placeholder:text-[#d67f7f]' : 'text-[#728b67] outline-[#728b67]'} `}
                  type={field.type}
                  name={field.name} 
                  placeholder={field.label}
                  />
                }
                {
                  (errors[field.name] || (isFormSubmitted && !order[field.name])) && <p className='py-1 px-2 bg-red-200 bg-opacity-50 text-red-600 rounded-md text-xs sm:text-sm font-medium transition-all'>{errors[field.name] || field.empty}</p>
                }
              </div>
            ))
          }

          <button type='submit' disabled={isFormSubmitted} className='shadow-xl rounded-lg md:w-[400px] w-full hover:bg-green-dark duration-200 active:scale-90 px-6 py-3 bg-green flex justify-center items-center text-white font-semibold text-lg uppercase tracking-wider outline-[#728b67] disabled:bg-gray-600 disabled:cursor-not-allowed'>Submit</button>
        </form>

        <section className={`absolute top-0 ${isCartOpen ? "right-0" : "right-[100%]"} lg:right-0 lg:relative w-screen lg:w-1/2 h-screen py-6 flex  items-center flex-col gap-6 bg-bleach-brown-light transition-all`}>
          <div className='flex justify-between lg:justify-center items-center w-[90%] px-4 py-4 border-b-4 border-[#0001]'>
            <h1 className='text-4xl text-green font-bold uppercase'>My Cart</h1>
            <button id="closecart" type='reset' onClick={()=>setIsCartOpen(false)} className='h-full flex lg:hidden items-center justify-center text-center gap-2 shadow-xl p-2 px-6 rounded-md w-fit font-semibold text-md uppercase active:scale-90 tracking-wider text-white bg-[#728b67] outline-[#728b67] transition-all'>
                <div className='rotate-180 flex justify-center items-center'>
                  <ArrowIcon width={30} height={30} target={"button#closecart"}/>
                </div>
                back
            </button>
          </div>
          <ul className='max-w-sm max-h-[80vh] w-full py-4 px-4 flex items-center flex-col gap-3 overflow-y-scroll'>
            {
              cart.map((item,key)=>{
                return(
                  <li key={key} className='flex py-2 w-full justify-start items-center gap-2 rounded-lg drop-shadow-lg border-2 border-green bg-white'>
                    <div title={`${item.quantity} ${finalPots[item?.pot]?.name} Pot and ${finalCactus[item?.cactus]?.name} Cactus`} className={'flex relative flex-col items-center gap-1'}>
                      <div  className={' w-20 h-20 flex justify-center items-center flex-col overflow-y-visible  '}>
                        <div className={' duration-150 relative w-[50px] flex flex-row justify-center items-center'}>
                            <img onContextMenu={e => e.preventDefault()} draggable={false} className={'h-[50px] absolute top-[10px] duration-150  pointer-events-none select-none'} src={finalPots[item?.pot]?.img}></img>
                            <img onContextMenu={e => e.preventDefault()} draggable={false} className='h-[50px] opacity-0 pointer-events-none select-none' src={finalPots[item?.pot]?.img}></img>
                            <img onContextMenu={e => e.preventDefault()} draggable={false} className={'w-[50px] absolute top-[-18px] duration-150  pointer-events-none select-none'} src={ finalCactus[item?.cactus]?.img}></img>
                        </div>
                      </div>
                    </div>
                    <article className='flex flex-col justify-around h-full gap-2'>
                      <h5 className='text-green font-semibold'>{finalPots[item?.pot]?.name} Pot and {finalCactus[item?.cactus]?.name}</h5>
                      <p className='flex gap-4'>
                        <span className='text-sm text-gray-600 bg-dark-white2 border py-1 px-2 rounded-md w-fit'>Price: <span className='text-green font-semibold'>65DH</span></span>
                        <span className='text-sm text-gray-600 bg-dark-white2 border py-1 px-2 rounded-md w-fit'>Quantity: <span className='text-green font-semibold'>{item.quantity}</span></span>
                      </p>
                    </article>
                  </li>
                )
              })
            }
          </ul>
          <div className='flex w-[90%] justify-center items-center pt-4 border-t-4 border-[#0001]'>
            {/* <span className='text-sm text-gray-600 bg-dark-white2 border py-1 px-2 rounded-md w-fit'>Total: <span className='text-green font-semibold'>{cart.reduce((acc,curr)=>acc+curr.quantity,0)} Items</span></span> */}
            <h2 className='flex justify-center items-center text-gray-600 font-semibold gap-1 text-center md:text-4xl text-2xl'>
              <span title={`${cartCount} pot cactuses`} className='flex justify-center items-center gap-2 text-green bg-dark-white2 py-1 px-2 rounded-md w-fit drop-shadow-sm'>{cartCount} <i className="fi fi-ss-cactus md:text-3xl text-xl flex justify-center items-center"></i></span>
              ×
              <span title='the price of one pot cactus is 65DH' className='flex justify-center items-center gap-2 text-green bg-dark-white2 py-1 px-2 rounded-md w-fit drop-shadow-sm'>65</span>
              +
              <span title='Delivery Price' className='flex justify-center items-center gap-2 text-green bg-dark-white2 py-1 px-2 rounded-md w-fit drop-shadow-sm'>{DeliveryPrice} <i className="fi fi-ss-truck-side md:text-3xl text-xl flex justify-center items-center"></i></span>
              =
              <span id="cartTotalPrice" title={`the final total price = ${TotalPrice}`} className='finalPrice flex justify-center items-end gap-2 text-green font-semibold'>{TotalPrice} {cartCount > 3 && <span className='text-base line-through'>{cartCount * 65 + DeliveryPrice}</span>} DH</span>
            </h2>
          </div>
        </section>
    </motion.div>
  )
}

export default ComplateOrder;