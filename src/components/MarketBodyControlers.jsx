import React, { useContext } from "react";
import cactusdemo from "../assets/imags/cactusdemo.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { ControlersContext } from "../Context/ControlersContext";

import pots from "../assets/potsImages/import";
import cactuses from "../assets/cactusImages/import";

function MarketBodyControlers() {
    const { pot , setPot , cactus , setCactus }= useContext(ControlersContext);

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
    <div className="flex-1 h-full flex flex-col gap-4 justify-center items-center">
      <div>
        <div className="border border-green flex bg-dark-white gap-2 mt-4">
          <button className="p-4 hover:bg-[#0001]" onClick={handlePotSwapLeft}>
            <KeyboardArrowLeftIcon className="text-green" />
          </button>
          <div className="h-10 relative w-12">
            <img
              draggable={false}
              src={pots[pot]}
              className="h-20 object-contain -top-8 absolute"
            ></img>
          </div>
          <button className="p-4 hover:bg-[#0001]" onClick={handlePotSwapRight}>
            <KeyboardArrowRightIcon className="text-green" />
          </button>
        </div>
        <div className=" w-44 text-dark-green">cactus name here</div>
      </div>

      <div>
        <div className="border border-green flex bg-dark-white gap-2 mt-4">
          <button className="p-4 hover:bg-[#0001]" onClick={handleCactusSwapLeft}>
            <KeyboardArrowLeftIcon className="text-green" />
          </button>
          <div className="h-10 relative w-12">
            <img
              draggable={false}
              src={cactusdemo}
              className="h-20 object-contain -top-8 absolute"
            ></img>
          </div>
          <button className="p-4 hover:bg-[#0001]" onClick={handleCactusSwapRight}>
            <KeyboardArrowRightIcon className="text-green" />
          </button>
        </div>
        <div className=" w-44 text-dark-green">cactus name here</div>
      </div>

      <div className="border border-green flex bg-dark-white gap-2">
        <button className="p-4 hover:bg-[#0001]">
          <RemoveRoundedIcon className="text-green" />
        </button>
        <div className=" flex justify-center items-center w-12">
          <p className="text-xl text-dark-green">3</p>
        </div>
        <button className="p-4 hover:bg-[#0001]">
          <AddRoundedIcon className="text-green" />
        </button>
      </div>
    </div>
  );
}

export default MarketBodyControlers;
