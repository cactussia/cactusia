import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isActivePage } from '../utils';

export default function NavBarLink({luncher, link, delay,open}) {
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
    <li className={`relative h-12 sm:h-14 md:h-16 lg:h-24 w-[400px] flex items-center overflow-hidden transition-all ${isActivePage(link) ? "text-bleach" : "text-darker-green"} hover:text-bleach delay-[30] hover:ml-2`}>
        <Link to={`${link.toLowerCase() == "home" ? "/" : "/"+link}`} className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-extrabold absolute ${ show ? `top-0` : "top-80"} transition-all`}>{link}</Link>
    </li>
  )
}
