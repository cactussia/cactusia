import React, { useState } from "react";
import CustomizedTables from "./OrdersTabel";

import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"
import { WhatsappMessageConfirmation, dateFormater, orderTrackingStatus, phoneFormater } from "../utils";
import { WhatsApp } from "@mui/icons-material";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function OrdersAdmin({ order ,cat ,search, cats, setCat ,setOrder}) {
  const [comment, setComment] = useState({author: order?.comment?.author, message: ''});
  const [sendingComment, setSendingComment] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);

  console.log("Order Preview:", order);

  const addOrderComment = async e => {
    e.preventDefault();
    setSendingComment(true);
    try{
      const docRef = doc(db, "Orders", order.id);
      await updateDoc(docRef, {comment: {...comment, author: comment.author || "Admin", date: serverTimestamp()}});
      setOrder({...order, comment: {...comment, author: comment.author || "Admin", date: new Date()}});
      setComment({author: '', message: ''});
      setSendingComment(false);
      setIsEditingComment(false);
    }catch(err){
      console.error(err);
      setSendingComment(false);
      setIsEditingComment(false);
    }
  }

  const resetComment = () => {
    setComment({author: '', message: ''});
    setIsEditingComment(false);
  }

  return !order ? (
    <div className="px-10 flex-1">
      <CustomizedTables
        setOrder={setOrder}
        order={order}
        cats={cats}
        setCat={setCat}
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
        <h1 className="text-xl font-bold uppercase text-green">Informations</h1>
        <h1 className="font-semibold">#ID: <span className="underline">{order?.id}</span></h1>
        <h1 className="font-semibold">DATE: <span className="">{order?.formatedDate}</span></h1>
        <h1 className="uppercase font-semibold">State:
          <span className={`ml-2 px-4 py-1 rounded-full text-white font-semibold`} style={{backgroundColor: orderTrackingStatus[order?.state]}}>
            {order?.state}
          </span>
        </h1>
        <br></br>
        <h1><span className="uppercase font-semibold text-green">First Name:</span> {order?.name}</h1>
        <h1><span className="uppercase font-semibold text-green">Last Name:</span> {order?.lastName}</h1>
        <h1><span className="uppercase font-semibold text-green">Phone Number:</span> <a href={`tel:${order?.number}`} target="_blank" rel="noopener noreferrer">{order?.number}</a></h1>
        <h1><span className="uppercase font-semibold text-green">City:</span> {order?.city}</h1>
        <h1><span className="uppercase font-semibold text-green">Full Address:</span> {order?.address}</h1>
        <h1><span className="uppercase font-semibold text-green">Total Price:</span> {order?.price} Dh</h1>
        <button className="mt-4 px-6 py-2 rounded-md flex items-center justify-center gap-2 text-[#f5fdf8] bg-[#25D366] font-semibold shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.94]">
          <a className="flex items-center justify-center" href={`https://wa.me/${phoneFormater(order?.number)}/?text=${WhatsappMessageConfirmation(`${order?.name} ${order?.lastName}`, order?.price)}`} title={WhatsappMessageConfirmation(`${order?.name} ${order?.lastName}`, order?.price)} target="_blank" rel="noreferrer">
            <WhatsApp className="text-[#f5fdf8] "/>
            <span className="pl-2">WhatsApp Confirmation</span>
          </a>
        </button>

        <div className="h-1 w-full bg-green rounded-lg opacity-30 my-4"></div>

        <h1 className="text-xl font-semibold"># Order Comment</h1>
        {/* <p className="font-medium text-gray-500">Last Update: {dateFormater(order?.comment?.date)}</p> */}
        {/* Order Comment */}
        { (!order?.comment?.message || isEditingComment) ?
          <form action="" onSubmit={addOrderComment} className="w-full flex flex-col gap-3">
            <input type="text" onChange={e => setComment({...comment, author: e.target.value})} defaultValue={order?.comment?.author} className="w-full h-12 p-2 rounded-md shadow-lg border-2 border-green" placeholder="Order Author EX: Othman" />
            <textarea onChange={e => setComment({...comment, message: e.target.value})} defaultValue={order?.comment?.message} className="w-full min-h-32 p-2 rounded-md shadow-lg border-2 border-green" placeholder="Order Comment"></textarea>
            <div className="flex items-center gap-4">
              <button type="submit" disabled={sendingComment} className="w-fit flex justify-center items-center bg-green drop-shadow-md text-white py-2 px-6 rounded-md font-semibold shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.94] disabled:bg-gray-800 disabled:pointer-events-none disabled:cursor-not-allowed"><i className="fi fi-sr-paper-plane-top flex justify-center items-center text-white mr-2"></i>{!order?.comment?.message ? "Send" : "Update"}</button>
              {order?.comment?.message && <button type="reset" disabled={sendingComment} onClick={resetComment} className="w-fit flex justify-center items-center bg-white border-2 border-green drop-shadow-md text-green py-2 px-6 rounded-md font-semibold shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.94] disabled:bg-gray-800 disabled:text-white disabled:pointer-events-none disabled:cursor-not-allowed group"><i className="fi fi-sr-cross flex justify-center items-center text-green group-disabled:text-white mr-2"></i> Cancel</button>}
            </div>
          </form>
          :
          <figure className="w-full flex flex-col gap-3">
            <figcaption className="text-lg uppercase font-semibold text-green ">{comment.author || order?.comment?.author}: <span className="font-medium text-sm text-center text-gray-500">{dateFormater(order?.comment?.date)}</span></figcaption>
            <blockquote className="w-full ">{comment.message || (order?.comment?.message ?? "Nothing Mentioned...")}</blockquote>
            <button onClick={() => setIsEditingComment(true)} className="w-fit flex justify-center items-center bg-green drop-shadow-md text-white py-2 px-6 rounded-md font-semibold shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.94]"><i className="fi fi-sr-comment-alt-edit flex justify-center items-center text-white mr-2"></i> Edit</button>
          </figure>
        }
        
      </div>
      <div className="flex p-8 max-h-screen flex-col overflow-y-auto">
        <h1 className="text-3xl text-gray-800 font-semibold py-8 uppercase">
          Order Items For: <span className=" font-bold text-green">{order?.name + ' ' + order?.lastName}</span>
        </h1>
        <section className="w-full max-h-screen flex flex-wrap gap-4">
          {order?.items.map((item, key) => (
            <div key={key} className={"w-32 h-40 flex relative flex-col items-center gap-1 bg-white rounded-lg drop-shadow-lg "}>
              <button
                className={"h-full w-full duration-100 pb-4 flex justify-center items-center flex-col "}>
                <div className={"scale-[1.60] duration-150 relative  w-[50px] flex flex-row justify-center items-center drop-shadow-md"}>
                  <img draggable={false} className={"h-[50px] absolute top-[10px] duration-150 "} src={pots[item.pot]}/>
                  <img draggable={false} className="h-[50px] opacity-0" src={pots[item.pot]}/>
                  <img draggable={false}className={"w-[50px] absolute top-[-18px] duration-150 "} src={cactuses[item.cactus]}/>
                </div>
                <p className="px-4 rounded-md font-bold text-gray-700 translate-y-10 border-green text-xl">
                  {item.quantity}
                </p>
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default OrdersAdmin;
