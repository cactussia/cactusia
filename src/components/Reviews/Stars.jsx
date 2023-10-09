import PropType from 'prop-types';
import Rate from './Rate';

Stars.propTypes = {
    stars: PropType.number,
    rate: PropType.number,
    className: PropType.string,
}

export default function Stars({rate, stars=5, className="w-6 h-6"}) {
  return (
    <div className='flex justify-center items-center gap-1' title={`Rated By ${rate} Stars`}>
    {stars > 0 && ( Array(stars).fill(0).map((_, i) => 
      <div key={i}>
        <Rate fill={rate > 0 && i < rate} className={className} color={"#d37036"}/>
      </div>
    ))}
    </div>
  )
}