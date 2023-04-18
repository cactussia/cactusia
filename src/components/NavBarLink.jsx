import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isActivePage } from '../utils';

export default function NavBarLink({luncher, link, delay}) {
  const [show, setShow] = useState(luncher)

  useEffect(() => {
    const timer = setTimeout(() => {
        setShow(luncher)
    }, delay);
    return () => clearTimeout(timer);
  }, [luncher]);

  return (
    <li className={`relative h-16 w-80 flex items-center overflow-hidden transition-all ${isActivePage(link) ? "text-bleach" : "text-darker-green"} hover:text-bleach delay-[30] hover:ml-2`}>
        <Link to={`${link.toLowerCase() == "home" ? "/" : "/"+link}`} className={`text-6xl absolute ${ show ? `top-0` : "top-80"} transition-all`}>{link}</Link>
    </li>
  )
}
