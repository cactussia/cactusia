import handmade from "../assets/imags/handmade.png"
import handmadedark from "../assets/imags/handmadedark.png"

export default function HandMade({dark=false}) {
  return (
    <img 
    className="2xl:w-[450px] xl:w-[420px] lg:w-[400px] md:w-[300px] w-[250px] drop-shadow-xl animate-spining opacity-80" 
    src={dark?handmadedark:handmade} 
    alt="Hand made stamp" />
  )
}
