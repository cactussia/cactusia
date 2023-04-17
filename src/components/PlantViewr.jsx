import React, { useContext, useEffect, useState } from 'react'
import shadow from "../assets/imags/shadow.png"

import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { ControlersContext } from '../Context/ControlersContext'

function PlantViewr() {
   const {pot,cactus}=useContext(ControlersContext);
   const [animation , setAnimation ]=useState(true);
   const [animationC , setAnimationC ]=useState(true);
   const [currentCactus,setCurrentCactus]=useState(0);
   useEffect(()=>{
        setAnimation(true);
        const a =()=>{
            setAnimation(false)
            setCurrentCactus(cactuses[cactus])
        }
        setTimeout(a, 200);
        return ()=>{clearTimeout(a);}
   },[pot])
   useEffect(()=>{
        setAnimationC(true);
        const a =()=>{
            setAnimationC(false)
            setCurrentCactus(cactuses[cactus])
        }
        setTimeout(a, 200);
        return ()=>{clearTimeout(a);}
   },[cactus])
  return (
    <div className='flex-1 h-full flex justify-center items-end pb-16'>
        <div className='relative w-[400px] flex flex-row justify-center items-center'>
            <img draggable={false} className='w-[250px] absolute top-[230px] opacity-60 z-[0]' src={shadow}></img>
            <img draggable={false} className={'h-[300px] absolute duration-150 '+(animation?" scale-95 translate-y-2 ":" scale-100 ")} src={pots[pot]}></img>
            <img draggable={false} className='h-[300px] opacity-0' src={pots[pot]}></img>
                                                                                             {/* animationC?" opacity-100 ":" opacity-0 " */}
            <img draggable={false} className={'w-[300px] absolute top-[-160px] duration-150 '+(animationC?" scale-90 translate-y-2 ":" scale-100 ")+(animation?" scale-90 translate-y-5 ":" scale-100 ")} src={currentCactus}></img>
        </div>
    </div>
  )
}

export default PlantViewr