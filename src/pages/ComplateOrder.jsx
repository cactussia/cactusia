import {useContext, useEffect, useState}  from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { colRef } from '../firebase'
import { CartContext } from '../Context/CartContext'
import { OrderFields, getPriceByQte } from '../utils'
import { ControlersContext } from '../Context/ControlersContext'
import Thank from './Thank'
import ArrowIcon from '../components/svg/ArrowIcon'

function ComplateOrder() {
    const navigate = useNavigate();
    const[isFormSubmitted, setIsFormSubmitted] = useState(false)
    // order state tracker
    const [order, setOrder] = useState({firstname:"",lastname:"",phonenumber:"",city:"",address:""});
    // track form fields errors
    const [errors, setErrors] = useState({});

    const {cart,setCart}=useContext(CartContext)
    const {finalPots,finalCactus,setPot,setCactus,setQuantity}=useContext(ControlersContext)

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
      })
      .catch(err=>{
        console.error(err)
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
     className='min-h-screen md:px-8 px-4 w-screen flex justify-center items-center flex-col bg-green-light'>
        <form onSubmit={orderNow} className='container flex justify-center items-center flex-col gap-4 bg-green-light'>
          <div className='md:w-[400px] w-full flex items-center'>
            <button id="goback" type='reset' onClick={()=>navigate("/market")} className='flex items-center justify-center text-center gap-2 shadow-xl p-2 px-6 rounded-md w-fit font-semibold text-md uppercase active:scale-90 tracking-wider text-white bg-[#728b67] outline-[#728b67] transition-all'>
                <div className='rotate-180 flex justify-center items-center'>
                  <ArrowIcon width={30} height={30} target={"button#goback"}/>
                </div>
                Go back
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
                  className={`shadow-lg p-4 rounded-xl w-full font-semibold text-base border ${(errors[field.name]) ? 'text-red-700 outline-red-700 placeholder:text-[#d67f7f]' : 'text-[#728b67] outline-[#728b67]'} resize-y`}
                  name={field.name}
                  placeholder={field.label}
                  // the textarea expand when the user type new lines
                  rows={order[field.name].split("\n").length}
                  ></textarea>
                  :
                  <input
                  onChange={(e)=>storeOrder(field, e)}
                  className={`shadow-lg p-4 rounded-xl w-full font-semibold text-base border ${(errors[field.name]) ? 'text-red-700 outline-red-700 placeholder:text-[#d67f7f]' : 'text-[#728b67] outline-[#728b67]'} `}
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

          <button type='submit' className='shadow-xl rounded-lg md:w-[400px] w-full hover:bg-green-dark duration-200 active:scale-90 px-6 py-3 bg-green flex justify-center items-center text-white font-semibold text-lg uppercase tracking-wider outline-[#728b67]'>complete</button>
        </form>
    </motion.div>
  )
}

export default ComplateOrder;