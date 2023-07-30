import React, { useContext } from "react";
import CustomizedTables from "./OrdersTabel";

import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { WhatsappMessageConfirmation, dateFormater, phoneFormater } from "../utils";
import { WhatsApp } from "@mui/icons-material";

function OrdersAdmin({ order ,cat ,search,cats,setCat ,setOrder}) {

   return !order ? (
    <div className="p-8 px-10 flex-1">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-4xl  py-8">Orders List</h1>
        </div>
        <div className="flex-[2] flex justify-center">
          <div className="rounded-full bg-white shadow-lg overflow-hidden p-1">
            {cats.map((c, key) =>
              key == cat ? (
                <button
                  key={key}
                  className="px-4 py-2 bg-black text-white rounded-full"
                >
                  {c}
                </button>
              ) : (
                <button
                  key={key}
                  onClick={() => setCat(key)}
                  className="px-4 py-2 rounded-full"
                >
                  {c}
                </button>
              )
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="bg-white rounded-full overflow-hidden pr-1 shadow-lg">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="p-2 px-4 outline-none w-36 "
              placeholder="search .."
            />
            <button className="px-4 bg-black rounded-full py-1 text-white">
              search
            </button>
          </div>
        </div>
      </div>
      <CustomizedTables
        setOrder={setOrder}
        order={order}
        cats={cats}
        search={search}
        cat={cat}
      />
    </div>
  ) : (
    <div className="flex">
      <div className="p-8 bg-white w-[400px] flex flex-col gap-2 items-start">
        <button
          onClick={() => setOrder("")}
          className="p-2 px-6 bg-black text-white rounded-full my-4"
        >
          Go back
        </button>
        <h1 className="text-xl font-semibold">information's</h1>
        <h1 className="uppercase font-semibold">state: {order?.state}</h1>
        <br></br>
        <h1><span className="uppercase font-semibold">First Name:</span> {order?.name}</h1>
        <h1><span className="uppercase font-semibold">Last Name:</span> {order?.lastName}</h1>
        <h1><span className="uppercase font-semibold">Phone Number:</span> <a href={`tel:${order?.number}`} target="_blank" rel="noopener noreferrer">{order?.number}</a></h1>
        <h1><span className="uppercase font-semibold">City:</span> {order?.city}</h1>
        <h1><span className="uppercase font-semibold">Full Address:</span> {order?.address}</h1>
        <h1><span className="uppercase font-semibold">Total Price:</span> {order?.price} Dh</h1>
        <button className="mt-4 px-6 py-2 rounded-md flex items-center justify-center gap-2 text-[#f5fdf8] bg-[#25D366] font-semibold shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.94]">
          <a className="flex items-center justify-center" href={`http://wa.me/?phone=${phoneFormater(order?.number)}&text=${WhatsappMessageConfirmation(`${order?.name} ${order?.lastName}`, order?.price)}`} title={WhatsappMessageConfirmation(`${order?.name} ${order?.lastName}`, order?.price)} target="_blank" rel="noreferrer">
              <WhatsApp className="text-[#f5fdf8] "/>
              <span className="pl-2">WhatsApp Confirmation</span>
          </a>
        </button>
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-3xl text-gray-700 font-semibold py-8">
          Order Items
        </h1>
        <div className="grid grid-cols-4  gap-4">
          {order?.items.map((item, key) => (
            <div
              key={key}
              className={
                "flex relative flex-col items-center gap-1 drop-shadow-lg "
              }
            >
              <button
                className={
                  " w-32 h-40 bg-dark-white duration-100  pb-4 rounded-lg bg-white  flex justify-center items-center flex-col "
                }
              >
                <div
                  className={
                    "scale-[1.60] duration-150 relative  w-[50px] flex flex-row justify-center items-center drop-shadow-md"
                  }
                >
                  <img
                    draggable={false}
                    className={"h-[50px] absolute top-[10px] duration-150 "}
                    src={pots[item.pot]}
                  ></img>
                  <img
                    draggable={false}
                    className="h-[50px] opacity-0"
                    src={pots[item.pot]}
                  ></img>
                  <img
                    draggable={false}
                    className={"w-[50px] absolute top-[-18px] duration-150 "}
                    src={cactuses[item.cactus]}
                  ></img>
                </div>
                <p className="px-4 rounded-md font-bold text-gray-700 translate-y-10 border-green text-xl">
                  {item.quantity}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersAdmin;
