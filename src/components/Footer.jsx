import { Link } from "react-router-dom";
import logo from "../assets/imags/logo.png";
import { ArrowRight } from '@mui/icons-material';
import { NavBarLinks, SocialMediaLinks, dynamicCopyright } from "../utils"

export default function Footer() {
  const tailwindSharedStyle = "relative font-semibold text-bleach-dark capitalize transition-all duration-150 group hover:text-green hover:scale-[1.02]";
  const iconStyle = "absolute transition-all duration-150 left-4 opacity-0 group-hover:-left-5 group-hover:opacity-100 text-green"
  return (
    <footer className="container mx-auto pt-6 pb-2 mt-8 w-full flex justify-center items-center flex-col gap-6 ">
      <div className="flex  flex-col md:flex-row gap-6 lg:w-[500px]">

        <ul className="flex flex-1 items-center md:items-end flex-col order-2 md:order-1 gap-1">
          { SocialMediaLinks.map((link, index) => 
          <li key={index} className={tailwindSharedStyle}>
            <Link to={link.link}>{link.label}</Link>
            <span className={iconStyle}><ArrowRight/></span>
          </li>
          )}
        </ul>

        <div className="flex order-1 flex-1 md:order-2 justify-center items-center">
        <Link to={"/"}>
          <img
            draggable={false}
            className="w-20 md:w-20 lg:w-20 mix-blend-darken"
            src={logo}
          />
        </Link>
        </div>

        <ul className="flex items-center md:items-start flex-1 flex-col gap-1 order-3 md:order-3">
          { NavBarLinks.map((link, index) => 
          <li key={index} className={tailwindSharedStyle}>
            <Link to={link.label.toLowerCase() == "home" ? "/" : "/"+link.label}>{link.label}</Link>
            <span className={iconStyle}><ArrowRight/></span>
          </li>
          )}    
        </ul>

      </div>
      <h3 className="opacity-40 font-semibold">{dynamicCopyright()}</h3>
    </footer>
  )
}
