import { WhatsApp } from "@mui/icons-material";
import { SocialMediaLinks } from "../utils";

export default function WhatsappBtn() {
  return (
    <button className="fixed sm:h-16 h-14 sm:w-16 w-14 p-1 z-[9990] bottom-8 sm:bottom-20 sm:right-8 right-4 rounded-full flex items-center justify-center bg-bleach shadow-lg transition-all duration-150 hover:scale-[1.07]">
        <a className="flex items-center justify-center" href={SocialMediaLinks[3].link} title={SocialMediaLinks[3].label} target="_blank" rel="noopener noreferrer">
            <WhatsApp className="scale-150 text-green-dark"/>
        </a>
    </button>
  )
}
