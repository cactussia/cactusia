import React, { useContext, useState } from "react";
import CustomizedTables from "../components/OrdersTabel";
import logo from "../assets/imags/logo.png";
import StateBtn from "../components/StateBtn";
import { ControlersContext } from "../Context/ControlersContext";

import cactuses from "../assets/cactusImages/import"
import pots from "../assets/potsImages/import"

const cats = ["All","New","Confirmed","Delivered"]




function Admin() {

   const {pot,setPot,cactus,setCactus}=useContext(ControlersContext);


  const [admin, setAdmin] = useState(false);
  const [order, setOrder] = useState();
  const [orders, setOrders] = useState(false);
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [cat,setCat]=useState(0)
  const [search,setSearch]=useState("")
  const login = ()=>{
    if(name=="othman",password=="cactusia@06"){
        setAdmin(true)
    }
    setName("")
    setPassword("")
  }
  return admin ? (
    <div className="flex min-h-screen">
      <div className="relative  bg-[#fff9]">
        <div className=" sticky top-0 h-fit">
          <img src={logo} className="w-12 py-3 mb-2 mx-auto"></img>
          <div className="flex flex-col gap-2">
            <button className="bg-white px-6 py-2 border-l-8 border-green-700">
              Orders
            </button>
          </div>
        </div>
      </div>

{
    !order?
      <div className="p-8 px-10 flex-1">
        <div className="flex justify-between items-center">
            <div className="flex-1">
                <h1 className="text-4xl  py-8">Orders List</h1>
            </div>
            <div className="flex-[2] flex justify-center">

            <div className="rounded-full bg-white shadow-lg overflow-hidden p-1">
                {
                    cats.map((c,key)=>(
                        key==cat ?
                        <button key={key} className="px-4 py-2 bg-black text-white rounded-full">{c}</button>:
                        <button key={key} onClick={()=>setCat(key)} className="px-4 py-2 rounded-full">{c}</button>
                    ))
                }
            </div>
            </div>
            <div className="flex-1 flex justify-end">
                <div className="bg-white rounded-full overflow-hidden pr-1 shadow-lg">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="p-2 px-4 outline-none w-36 " placeholder="search .." />
                    <button className="px-4 bg-black rounded-full py-1 text-white">search</button>
                </div>
            </div>
        </div>
        <CustomizedTables setOrder={setOrder} order={order} cats={cats} search={search} cat={cat}/>
      </div>:
      <div className="flex">
      <div className="p-8 bg-white w-[400px] flex flex-col gap-2 items-start">
        <button onClick={()=>setOrder("")} className="p-2 px-6 bg-black text-white rounded-full my-4">Go back</button>
        <h1 className="text-xl font-semibold">information's</h1>
        <h1>full name: {order?.name}</h1>
        <h1>phone number: {order?.number}</h1>
        <h1>city: {order?.city}</h1>
        <h1>full address: {order?.address}</h1>
        <h1>state: {order?.state}</h1>
        <h1>price: {order?.price} Dh</h1>
      </div>
        <div className="flex-1 p-8">
                <h1 className="text-3xl text-gray-700 font-semibold py-8">Order Items</h1>
                <div className="grid grid-cols-4  gap-4">
                    {
                        order?.items.map(((item,key)=>(
                            <div key={key}  className={'flex relative flex-col items-center gap-1 drop-shadow-lg '}>
                            <button  className={' w-32 h-40 bg-dark-white duration-100  pb-4 rounded-lg bg-white  flex justify-center items-center flex-col '}>
                                <div className={'scale-[1.60] duration-150 relative  w-[50px] flex flex-row justify-center items-center drop-shadow-md'}>
                                    <img draggable={false} className={'h-[50px] absolute top-[10px] duration-150 '} src={pots[item.pot]}></img>
                                    <img draggable={false} className='h-[50px] opacity-0' src={pots[item.pot]}></img>
                                    <img draggable={false} className={'w-[50px] absolute top-[-18px] duration-150 '} src={cactuses[item.cactus]}></img>
                                </div>
                                <p className='px-4 rounded-md font-bold text-gray-700 translate-y-10 border-green text-xl'>
                                {item.quantity}
                                </p>
                            </button>
                            </div>
                        )))
                    }
                </div>
        </div>
    </div>

}




    </div>

  ) : (
    <div className="min-h-screen w-full flex justify-center items-center">
        <div className="flex flex-col gap-2 ">
            <input value={name} onInput={(e)=>setName(e.target.value)}  placeholder='User Name' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input type="password" value={password} onInput={(e)=>setPassword(e.target.value)}  placeholder='Password' className='shadow-lg p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-base border outline-[#728b67]'/>
            <input value="Login" type="submit"  onClick={login} className='shadow-lg p-4 cursor-pointer rounded-xl md:w-[400px] w-full font-semibold bg-[#728b67] text-dark-white text-base border outline-[#728b67]'/>
        </div>
    </div>
  );
}

export default Admin;
