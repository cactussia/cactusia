import { useState , useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Market from './pages/Market';
import Home from './pages/Home';
import { ControlersContext } from './Context/ControlersContext';
import { CartContext } from './Context/CartContext';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/Market/:potId/:cactusId",
    element: <Market/>,
  },
  {
    path: "/Market",
    element: <Market/>,
  },
]);



function App() {
  // for pot and cactus context
  const [pot , setPot]=useState(0);
  const [cactus , setCactus ]=useState(0);
  const [quantity , setQuantity ]=useState(1);


  // for cart Context
  const [cart , setCart ]= useState([
    {
    pot:0,
    cactus:0,
    quantity:1
    },
])
  const [currentItem,setCurrentItem]=useState(0)
  const updateCart= ()=>{
    let newCart = cart
    newCart[currentItem].pot=pot
    newCart[currentItem].cactus=cactus
    newCart[currentItem].quantity=quantity
    setCart(newCart)
  }
  useEffect(() => {
    updateCart()
  }, [pot])
  useEffect(() => {
    updateCart()
  }, [cactus])
  useEffect(() => {
    updateCart()
  }, [quantity])
  

  return (
    <CartContext.Provider value={{cart,setCart,currentItem,setCurrentItem}}>
      <ControlersContext.Provider value={{pot,setPot,cactus,setCactus,quantity,setQuantity}}>
        <RouterProvider router={router} />
      </ControlersContext.Provider>
    </CartContext.Provider>
  )
}

export default App
