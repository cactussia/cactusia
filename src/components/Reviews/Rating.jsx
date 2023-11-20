import PropType from 'prop-types';
import Rate from './Rate';

Rating.propTypes = {
  stars: PropType.number,
  rate: PropType.number,
  setRate: PropType.func,
  height: PropType.string,
  width: PropType.string,
  className: PropType.string,
}

export default function Rating({stars=5, rate, setRate, height, width, className}) {
  return (
    <div className='flex justify-center items-center gap-1' title={`Rated By ${rate} Stars`}>
      {stars > 0 && ( Array(stars).fill(0).map((_, i) => 
        <div onClick={() => setRate(i+1)} onMouseEnter={() => setRate(i+1)} key={i}>
          <Rate className={className} height={height} width={width} fill={rate > 0 && i < rate} color={"#e7702b"}/>
        </div>
      ))}
    </div>
  )
}
