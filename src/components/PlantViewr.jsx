import { useContext, useEffect, useState } from "react";
import shadow from "../assets/imags/shadow.png";
import sticker from "../assets/imags/cactusSticker.png";

import cactuses from "../assets/cactusImages/import";
import pots from "../assets/potsImages/import";
import { ControlersContext } from "../Context/ControlersContext";
import { useMediaQuery } from "react-responsive";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function PlantViewr({ clickable = true }) {
  const { pot, setPot, cactus, setCactus,finalPots,finalCactus } = useContext(ControlersContext);
  const { cart, setCart, setCurrentItem } = useContext(CartContext);
  const [animation, setAnimation] = useState(true);
  const [animationC, setAnimationC] = useState(true);
  const [currentCactus, setCurrentCactus] = useState(0);
  const [currentPot, setCurrentPot] = useState(0);
  const [leftRight, setLeftRight] = useState(false);
  const navigate = useNavigate("/market");
  



  useEffect(()=>{
    setCurrentCactus(finalCactus[0]?.img)
  },[finalCactus])

  useEffect(()=>{
    setCurrentPot(finalPots[0]?.img)
  },[finalPots])

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1050px)" });

  const [homePotCactus, setHomePotCactus] = useState({
    pot: Math.floor(Math.random() * finalPots.length),
    cactus: Math.floor(Math.random() * finalCactus.length),
  });
  useEffect(() => {
    if (!clickable) {
      const timer = setInterval(() => {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
          setHomePotCactus({
            pot: Math.floor(Math.random() * finalPots.length),
            cactus: Math.floor(Math.random() * finalCactus.length),
          });
        }, 200);
      }, 8000);
      // clearing interval
      return () => clearInterval(timer);
    }
  });

  useEffect(() => {
    setAnimation(true);
    const a = () => {
      setAnimation(false);
      setCurrentPot(finalPots[pot]?.img);
    };
    setTimeout(a, 200);
    return () => {
      clearTimeout(a);
    };
  }, [pot]);

  useEffect(() => {
    setAnimation(true);
    const a = () => {
      setAnimation(false);
      setCurrentCactus(finalCactus[cactus]?.img);
    };
    setTimeout(a, 200);
    return () => {
      clearTimeout(a);
    };
  }, [cactus]);

  const handleRandom = () => {
    if (isDesktopOrLaptop) {
      if (clickable) {
        let a = Math.floor(Math.random() * finalPots.length);
        let b = Math.floor(Math.random() * finalCactus.length);
        if (pot == a || cactus == b) {
          handleRandom();
        } else {
          setPot(a);
          setCactus(b);
        }
      } else {
        if (cart.length == 1) {
          setCart((p) =>
            p.map((item) => {
              return {
                ...item,
                pot: homePotCactus.pot,
                cactus: homePotCactus.cactus,
              };
            })
          );
        } else {
          setCart((p) => [
            ...p,
            {
              pot: homePotCactus.pot,
              cactus: homePotCactus.cactus,
              quantity: 1,
            },
          ]);
          setCurrentItem(cart.length);
        }
        navigate("/market");
      }
    }
  };

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      className={
        "flex-1 h-full flex flex-col justify-center items-center pt-16 md:pt-20 " +
        (!clickable && "potcactusanimation")
      }
    >
      <div
        onClick={handleRandom}
        className={
          (animation ? " opacity-100 " : " opacity-100 ") +
          "  cursor-pointer  duration-50 relative w-[400px] flex flex-row justify-center items-center "
        }
      >
        <img
          draggable={false}
          className="w-[180px] md:w-[250px]  absolute top-[150px] md:top-[230px]  opacity-60 z-[0]"
          src={shadow}
        />

        <img
          draggable={false}
          className={
            "h-[200px] md:h-[300px] absolute duration-150 ease-in " +
            (animation ? " scale-95 translate-y-2 " : " scale-100 ")
          }
          src={clickable ? currentPot : finalPots.at(homePotCactus.pot)?.img}
        />
        <img 
        className={
          "duration-150 absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[.2] sm:scale-[.3]" 
          +(animation ? " scale-[.10] sm:scale-[.20] opacity-80 " : " scale-[.15] sm:scale-[.25] opacity-100")
        }
        src={sticker}/>
        <img
          draggable={false}
          className="h-[200px] md:h-[300px] opacity-0 "
          src={clickable ? currentPot : finalCactus.at(homePotCactus.pot)?.img}
        />
        {/* animationC?" opacity-100 ":" opacity-0 " */}
        <div
          className={
            (animation
              ? " -translate-y-8 opacity-10 scale-50 "
              : " scale-100 ") +
            "  rounded-[140px] ease-in duration-150 w-[180px] md:w-[300px] absolute top-[-95px] md:top-[-162px] overflow-hidden "
          }
        >
          <img
            draggable={false}
            className={
              "duration-150 ease-in " +
              (animation ? " translate-y-52 " : " scale-[1.0] translate-y-0") +
              (animation ? " scale-90 translate-y-5 " : " scale-[1.0] ")
            }
            src={clickable ? currentCactus : finalCactus.at(homePotCactus.cactus)?.img}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default PlantViewr;