import { Link } from "react-router-dom";
import logo from "../assets/imags/logo.png";
import { SocialMediaLinks } from "../utils"

export default function Footer() {
  return (
    <footer className="container flex justify-center items-center">
        <ul>
            { SocialMediaLinks.map((link, index) => 
            <li key={index} className="text-green"><Link to={link.link}>{link.label}</Link></li>
            )}
        </ul>
        <div className="flex-1 flex ">
        <Link to={"/"}>
          <img
            draggable={false}
            className="w-14 lg:w-20 mix-blend-darken"
            src={logo}
          />
        </Link>
        </div>
    </footer>
  )
}
