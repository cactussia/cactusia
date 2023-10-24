import PropType from 'prop-types';
import Rate from './Rate';

Stars.propTypes = {
    stars: PropType.number,
    rate: PropType.number,
    className: PropType.string,
}

export default function Stars({rate, stars=5, className}) {
  return (
    <div className='bg-[#e7702b]- flex justify-center items-center gap-1' title={`Rated By ${rate} Stars`}>
    {stars > 0 && ( Array(stars).fill(0).map((_, i) => 
      <div key={i}>
        <Rate fill={rate > 0 && i < rate} className={className + " w-6 h-6"} color={"#e7702b"}/>
      </div>
    ))}
    </div>
  )
}