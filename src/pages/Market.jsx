import React from "react";
import NavBar from "../components/NavBar";
import MarketBody from "../components/MarketBody";

function Market() {
  return (
    <div className=" lg:h-[100vh] w-[100vw] flex flex-col overflow-hidden relative ">
      <div className="background-market flex-1 flex-col flex">
        <NavBar />
        <MarketBody />
      </div>
    </div>
  );
}

export default Market;
