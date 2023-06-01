import React, { useContext, useState } from "react";
import CustomizedTables from "../components/OrdersTabel";
import logo from "../assets/imags/logo.png";
import StateBtn from "../components/StateBtn";
import { ControlersContext } from "../Context/ControlersContext";

import Inventory2Icon from '@mui/icons-material/Inventory2';
import GrassIcon from '@mui/icons-material/Grass';



import OrdersAdmin from "../components/OrdersAdmin";
import Products from "../components/Products";

const cats = ["All","New","Confirmed","Delivered"]



const Pages = [
    {name:"Orders",Icon:<Inventory2Icon/>},
    {name:"Products",Icon:<GrassIcon/>},
]



function Admin() {



  const [admin, setAdmin] = useState(false);
  const [order, setOrder] = useState();
  const [orders, setOrders] = useState(false);
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [cat,setCat]=useState(0)
  const [search,setSearch]=useState("")
  const [page,setPage]=useState(0)
  
  const login = ()=>{
    if(name=="othman",password=="cactusia@06"){
        setAdmin(true)
    }
    setName("")
    setPassword("")
  }
  return admin ? (
    <div className="flex min-h-screen">
      <div className="relative w-44 bg-[#fff]">
        <div className=" sticky top-0 h-fit">
          <img src={logo} className="w-12 py-3 mb-2 mx-auto"></img>
          <div className="flex flex-col">
            {
                Pages.map((Page,key)=>{
                    return(
                        <button key={key} onClick={()=>setPage(key)} style={{background:key==page?"#eee":"#fff"}} className="bg-white px-6 py-4 flex gap-2 items-center text-left border-green-700">
                            {Page.Icon}
                            {Page.name}
                        </button>
                    )
                })
            }
          </div>
        </div>
      </div>



{
    page==0&&<OrdersAdmin setCat={setCat} order={order} cats={cats} cat={cat} search={search} setOrder={setOrder}></OrdersAdmin>
}
{
    page==1&&<Products/>
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
