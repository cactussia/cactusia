import { Link } from "react-router-dom";
import logo from "../assets/imags/logo.png";
import { ArrowRight } from '@mui/icons-material';
import { NavBarLinks, SocialMediaLinks, dynamicCopyright } from "../utils"

export default function Footer() {
  const tailwindSharedStyle = "relative font-semibold text-bleach-dark capitalize transition-all duration-150 group hover:text-green hover:scale-[1.02]";
  const iconStyle = "absolute transition-all duration-150 left-4 opacity-0 group-hover:-left-5 group-hover:opacity-100 text-green"
  return (
    <footer className="container mx-auto py-6 mt-8 w-full flex justify-center items-center flex-col gap-6 bg-bleach-fade">
      <div className="flex justify-center items-center flex-col md:flex-row gap-6 md:gap-16">
        <ul className="flex items-center flex-col order-2 md:order-1 gap-1">
          { SocialMediaLinks.map((link, index) => 
          <li key={index} className={tailwindSharedStyle}>
            <Link to={link.link}>{link.label}</Link>
            <span className={iconStyle}><ArrowRight/></span>
          </li>
          )}
        </ul>
        <div className="flex order-1 md:order-2">
        <Link to={"/"}>
          <img
            draggable={false}
            className="w-20 md:w-20 lg:w-20 mix-blend-darken"
            src={logo}
          />
        </Link>
        </div>
        <ul className="flex items-center flex-col gap-1 order-3 md:order-3">
          { NavBarLinks.map((link, index) => 
          <li key={index} className={tailwindSharedStyle}>
            <Link to={link.label.toLowerCase() == "home" ? "/" : link.label}>{link.label}</Link>
            <span className={iconStyle}><ArrowRight/></span>
          </li>
          )}    
        </ul>
      </div>
      <h3 className="text-bleach-darker font-bold">{dynamicCopyright()}</h3>
    </footer>
  )
}
