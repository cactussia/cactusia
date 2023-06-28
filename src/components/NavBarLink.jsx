import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isActivePage } from '../utils';

export default function NavBarLink({luncher, label,link, delay,open}) {
  const [show, setShow] = useState(luncher)
  const timer = setTimeout(() => {
      setShow(luncher)
  }, delay);
  useEffect(() => {
    return () => clearTimeout(timer);
  }, [luncher]);
  useEffect(()=>{
    if(!open){
      clearTimeout(timer);
    }
  },[open])
  return (
    <li className={`relative h-12 sm:h-14 md:h-16 lg:h-32 w-fit flex items-center overflow-hidden transition-all ${isActivePage(link.toLowerCase()=="home"?"":link)? "text-bleach" : "text-darker-green"} hover:text-bleach delay-200 hover:ml-2`}>
        <div className={'md:w-6 md:h-6 w-4 h-4 rounded-full '+(isActivePage(link.toLowerCase()=="home"?"":link)?' bg-bleach ':"")}></div>
        <Link to={`${link.toLowerCase() == "home" ? "/" : "/"+link}`} className={`text-5xl sm:text-6xl md:text-7xl lg:text-9xl left-10 font-extrabold absolute ${ show ? `top-0` : "top-80"} transition-all`}>{label}</Link>
        <Link to={`${link.toLowerCase() == "home" ? "/" : "/"+link}`} className={`text-5xl sm:text-6xl md:text-7xl lg:text-9xl left-10 font-extrabold opacity-0 mr-8 ${ show ? `top-0` : "top-80"} transition-all`}>{label}</Link>
    </li>
  )
}
