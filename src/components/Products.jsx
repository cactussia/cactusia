import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colRefCactus, colRefPots, db } from '../firebase';
import { addDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { IconButton } from '@mui/material';
import { Circle } from '@mui/icons-material';

const products = ["Pots","Cactus"];
function Products() {
    const [product,setProduct]=useState(0)
    useEffect(()=>{
    },[])

    const [listCactus,setListCactus]=useState([])
    const [listPots,setListPots]=useState([])


    useEffect(()=>{

        onSnapshot(colRefCactus,(snapshot)=>{
            let cactusList =[];
            snapshot.docs.forEach(doc=>{
                cactusList.push({...doc.data(),id:doc.id})
            })
            setListCactus(cactusList)
        })

        onSnapshot(colRefPots,(snapshot)=>{
            let potsList =[];
            snapshot.docs.forEach(doc=>{
                potsList.push({...doc.data(),id:doc.id})
            })
            setListPots(potsList)
        })
    },[])


    const toggleProduct = (id,state)=>{
        const docRef = doc(db,product==0?"Pots":"Cactus",id);
        updateDoc(docRef,{
            dispo:!state
        })
    }
    const changeProductName = (e,id)=>{
        const docRef = doc(db,product==0?"Pots":"Cactus",id)
        updateDoc(docRef,{
          name:e.target.value
        })
    }

  return (
    <div className="p-8 px-10 flex-1">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex items-center justify-between">
          <h1 className="text-4xl  py-8">Products</h1>

          <div className="rounded-full bg-white shadow-lg overflow-hidden p-1">
            {products.map((c, key) =>
              key == product ? (
                <button
                
                  key={key}
                  className="px-4 py-2 bg-black text-white rounded-full"
                >
                  {c}
                </button>
              ) : (
                <button
                  key={key}
                  onClick={() => setProduct(key)}
                  className="px-4 py-2 rounded-full"
                >
                  {c}
                </button>
              )
            )}
          </div>

          </div>
        </div>
        <div className='grid grid-cols-5'>
                {
                    (product==1?listCactus:listPots).map(c=>{
                        return(
                            <div key={c.id} className='p-4 relative bg-white rounded-xl shadow-lg justify-center items-center m-2 flex flex-col'>
                                <img style={{opacity:!c.dispo?.4:1}} className='h-32' src={(product==1?cactuses:pots)[c.number]}></img>
                                    <div className='absolute top-0 left-0'>
                                      <IconButton  onClick={()=>toggleProduct(c.id,c.dispo)} >
                                {
                                    c.dispo ?
                                        <CheckCircleIcon  />
                                        :
                                        <Circle/>
                                }
                                      </IconButton>
                                    </div>
                                  <input value={c?.name} onInput={e=>changeProductName(e,c.id)} placeholder='product name' className='mt-4 border rounded-md p-2'></input>
                            </div>
                        )
                    })
                }
        </div>
    </div>
  )
}

export default Products