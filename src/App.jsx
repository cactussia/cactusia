import { useState , useEffect, useMemo, useCallback } from 'react'
import { ControlersContext } from './Context/ControlersContext';
import { CartContext } from './Context/CartContext';

import { colRefCactus, colRefLang, colRefPots } from './firebase';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';

import pots from "./assets/potsImages/import";
import cactuses from "./assets/cactusImages/import";
import useLang from './store/useLang';
import Router from './router';
import Cursor from './components/Cursor';


function App() {
  // for pot and cactus context
  const [pot , setPot]=useState(0);
  const [cactus , setCactus ]=useState(0);
  const [quantity , setQuantity ]=useState(1);



  const {lang,setLang,langSelected}=useLang()
  useMemo(()=>{
    getDocs(colRefLang).then((snapshot)=>{
        let s = [];
        snapshot.docs.forEach((doc)=>{
          s.push({...doc.data(),id:doc.id})
        })
        setLang(s)
    })
  },[])



    const [finalPots,setFinalPots]=useState([])
    const [finalCactus,setFinalCactus]=useState([])

    useMemo(()=>{

        let q = query(colRefCactus,where("dispo","==",true))
        onSnapshot(q,(snapshot)=>{
            let cactusList =[];
            snapshot.docs.forEach(doc=>{
                cactusList.push({...doc.data(),id:doc.id,img:cactuses[doc.data().number]})
            })
            setFinalCactus(cactusList)
        })

        q = query(colRefPots,where("dispo","==",true))
        onSnapshot(q,(snapshot)=>{
            let potsList =[];
            snapshot.docs.forEach(doc=>{
                potsList.push({...doc.data(),id:doc.id,img:pots[doc.data().number]})
            })
            setFinalPots(
              potsList.sort((a,b)=>{
              if(a.number<b.number){
                return -1
              }
              if(a.number>b.number){
                return 1
              }
              return 0
              })
            )
        })
        
        
    },[])




  // for cart Context
  const [cart , setCart ]= useState([
    {
    pot:0,
    cactus:0,
    quantity:1
    },
])
  const [upCart,setUpCart]=useState(0)
  const [currentItem,setCurrentItem]=useState(0)
  
  const updateCart = useCallback(() => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[currentItem] = {
        ...newCart[currentItem],
        pot,
        cactus,
        quantity,
      };
      return newCart;
    });
  }, [currentItem, pot, cactus, quantity]);

  useEffect(() => {
    updateCart()
    setUpCart(p=>p+1)
  }, [pot,cactus,quantity])
  

  useEffect(()=>{
    updateCart()
  },[upCart])


  return (
    lang.length>0 && 
    <CartContext.Provider value={{cart,setCart,currentItem,setCurrentItem,upCart,setUpCart}}>
      <ControlersContext.Provider value={{pot,setPot,cactus,setCactus,quantity,setQuantity,finalCactus,finalPots}}>
        {/* <RouterProvider router={router} /> */}
        <Cursor/>
        <Router/>
      </ControlersContext.Provider>
    </CartContext.Provider>
  )
}

export default App;
