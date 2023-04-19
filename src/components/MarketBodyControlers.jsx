import React, { useContext, useEffect } from "react";
import cactusdemo from "../assets/imags/cactusdemo.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { ControlersContext } from "../Context/ControlersContext";

import pots from "../assets/potsImages/import";
import cactuses from "../assets/cactusImages/import";
import { useParams } from "react-router-dom";

import {motion} from "framer-motion"

function MarketBodyControlers() {
    const { pot , setPot , cactus , setCactus , quantity , setQuantity }= useContext(ControlersContext);
    const {potId , cactusId}=useParams()

    useEffect(() => {
      if (potId!=undefined) {
        setPot(potId)
      }
      if (cactusId!=undefined) {
        setCactus(cactusId)
      }
    }, [potId])
    

    const handlePotSwapLeft = ()=>{
        if(pot<=0){
            setPot(pots.length-1)
        }else{
            setPot(p=>p-1)
        }
    }
    const handlePotSwapRight = ()=>{
        if(pot>=pots.length-1){
            setPot(0)
        }else{
            setPot(p=>p+1)
        }
    }

    const handleCactusSwapLeft = ()=>{
        if(cactus<=0){
            setCactus(cactuses.length-1)
        }else{
            setCactus(p=>p-1)
        }
    }
    const handleCactusSwapRight = ()=>{
        if(cactus>=cactuses.length-1){
            setCactus(0)
        }else{
            setCactus(p=>p+1)
        }
    }

  return (
    <motion.div initial={{x:-200}} animate={{x:0}} className="flex-1 h-full flex flex-col md:gap-2 justify-center items-center lg:items-center px-3 md:px-0">

    <div className="flex flex-row lg:flex-col gap-2 justify-around w-full md:w-fit mt-5 lg:mt-0">

      <div className=" flex flex-col justify-center items-start">
        <div className=" w-fit p-1 rounded-lg drop-shadow-md border-2 border-[#0001]  flex bg-dark-white gap-2 mt-4">
          <button className="rounded-md p-2 md:p-4 hover:bg-[#0001]" onClick={handleCactusSwapLeft}>
            <KeyboardArrowLeftIcon className="text-green" />
          </button>
          <div className="h-10 relative w-10 md:w-12 ">
            <img
              draggable={false}
              src={cactuses[cactus]}
              className="h-20 object-contain scale-[2] -top-8 absolute drop-shadow-lg"
            ></img>
          </div>
          <button className="rounded-md  p-2 md:p-4 hover:bg-[#0001]" onClick={handleCactusSwapRight}>
            <KeyboardArrowRightIcon className="text-green" />
          </button>
        </div>
        <div className="  text-dark-green w-fit md:w-full">cactus name here</div>
      </div>

      


      <div className=" flex flex-col justify-center items-start">
        <div className=" w-fit p-1 rounded-lg drop-shadow-md border-2 border-[#0001] flex bg-dark-white gap-2 mt-4">
          <button className="rounded-md p-2 md:p-4 hover:bg-[#0001]" onClick={handlePotSwapLeft}>
            <KeyboardArrowLeftIcon className="text-green" />
          </button>
          <div className="h-10 relative w-10 md:w-12 ">
            <img
              draggable={false}
              src={pots[pot]}
              className="h-20 object-contain -top-8 absolute drop-shadow-lg"
            ></img>
          </div>
          <button className=" rounded-md p-2 md:p-4 hover:bg-[#0001]" onClick={handlePotSwapRight}>
            <KeyboardArrowRightIcon className="text-green" />
          </button>
        </div>
        <div className="  text-dark-green w-fit md:w-full">cactus name here</div>
      </div>







    </div >
      <div className="flex flex-col ">

        <div className=" w-fit p-1 rounded-lg drop-shadow-md border-2 border-[#0001] flex bg-dark-white gap-2 mt-4">
        <button className="p-2 rounded-md md:p-4 hover:bg-[#0001]" onClick={()=> {if(quantity>1) setQuantity(p=>p-1)}}>
          <RemoveRoundedIcon className="text-green" />
        </button>
        <div className=" flex justify-center items-center w-10 md:w-12">
          <p className="text-xl text-dark-green">{quantity}</p>
        </div>
        <button className="p-2 md:p-4 rounded-md hover:bg-[#0001]" onClick={()=>setQuantity(p=>p+1)}>
          <AddRoundedIcon className="text-green" />
        </button>
      </div>
      </div>

    </motion.div>
  );
}

export default MarketBodyControlers;
