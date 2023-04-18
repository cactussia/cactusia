import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isActivePage } from '../utils';

export default function NavBarLink({luncher, link, delay}) {
  const [mounted, setMounted] = useState(luncher);

  // display each link after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(luncher)
    }, delay);
    return () => clearTimeout(timer);
  }, [luncher]);

  return (
    <li className={`relative h-24 w-full flex items-center overflow-hidden duration-300 transition-all ${isActivePage(link) ? "text-bleach" : "text-darker-green"} hover:text-bleach hover:ml-2`}>
        <Link to={`${link.toLowerCase() == "home" ? "/" : "/"+link}`} className={`text-8xl absolute ${ mounted ? `top-0` : "top-80"} transition-all`}>{link}</Link>
    </li>
  )
}
