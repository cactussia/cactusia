import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import {motion} from "framer-motion"
import useLang from '../store/useLang'

function Contact() {
  const {langs,lang,langSelected}=useLang()
  return (
    <div 
    className='min-h-screen flex flex-col'>
      <NavBar/>
      <motion.div 
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      className='container mx-auto px-4 md:px-8 flex flex-col items-start gap-4 py-4 flex-1'>
        <h1 className='text-5xl py-5 font-bold text-[#728b67] '>
            {lang.filter(f=>f.id_phrase=="howcanwehelp")[0][langs[langSelected]]}
        </h1>
        {/* <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-4 uppercase font-extrabold text-green'>How can we help you!</h1> */}
        <input placeholder={lang.filter(f=>f.id_phrase=="yourname")[0][langs[langSelected]]} className='shadow-xl p-4 rounded-xl md:w-[400px] w-full font-semibold text-[#728b67] text-lg border outline-[#728b67]'/>
        <textarea placeholder={lang.filter(f=>f.id_phrase=="yourmessage")[0][langs[langSelected]]} className='shadow-xl p-4 h-60 md:w-[400px] w-full font-semibold rounded-xl text-[#728b67] text-lg border outline-[#728b67]'>
        </textarea>
        <input type="button" value={lang.filter(f=>f.id_phrase=="send")[0][langs[langSelected]]} className='shadow-xl p-2 px-8 rounded-xl md:w-fit w-full font-semibold text-white bg-[#728b67] text-lg  outline-[#728b67]'/>
      </motion.div>
      <Footer/>
    </div>
  )
}

export default Contact