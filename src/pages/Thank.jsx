import NavBar from '../components/NavBar'
// import PlantIcon from '../components/svg/PlantIcon'
import frames from "../assets/icons/frames";
import { useEffect, useState } from 'react';

function Thank({name, onReturn}) {
  const [frame, setFrame] = useState(0);
  // const frame = useRef(0);

  // swith to the next frame every 1s in a loop sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => (frame + 1) % frames.length);
      // frame.current = (frame.current + 1) % frames.length;
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='min-h-screen md:px-8 flex flex-col px-4 py-6 container mx-auto'>
        <NavBar/>
        <div className='py-8 flex flex-1 flex-col items-center justify-center'>
            <div className="flex justify-center items-center flex-col gap-2 py-6">
              {/* <PlantIcon width={140} height={140} /> */}
              <img src={frames[frame]} className='relative h-[140px] w-[140px] object-cover object-center aspect-square mix-blend-darken hue-rotate-[-90deg] saturate-[.5] grayscale-[10%] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-green-700 before:z-20' alt=""/>
              <h1 className='sm:text-6xl text-4xl uppercase font-semibold text-green text-center'>Merci "<span className='text-orange-800'>{name}</span>"  pour votre commande</h1>
            </div>
            <p className='sm:text-2xl text-xl  font-medium text-center'>Votre commande a bien été confirmée. Notre service prendra contact avec vous sous peu</p>
            <button onClick={onReturn} className="bg-green text-white py-4 px-8 rounded-lg my-6 text-xl font-medium uppercase">return</button>
        </div>
    </section>
  )
}

export default Thank