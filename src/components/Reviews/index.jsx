import Stars from "./Stars";
import Overlay from "../../assets/icons/cactus.png";
import PropsTypes from 'prop-types';

Review.propTypes = {
	author: PropsTypes.string,
	review: PropsTypes.string,
	rate: PropsTypes.number,
}

export default function Review({author="Anonymous", review, rate}) {
  return (
    <figure className="relative flex justify-center items-center gap-4 flex-col">
			<img src={Overlay} className={`-z-20 max-w-[140px] max-h-[90%] absolute object-contain mix-blend-screen opacity-40 transition-all duration-700 delay-300 animate-bounce`} alt="Lotus Overlay" />
			<figcaption className="flex justify-center items-center flex-col gap-4">
				<h3 className="cinzel text-center text-2xl font-bold text-white capitalize">{author}</h3>
				<Stars rate={rate}/>
        </figcaption>
        {review && <blockquote className="p-1">
					<p className="text-white sm:text-lg text-center z-10 sm:px-0 px-4">{review}</p>
        </blockquote>}
    </figure>
  )
}
