// Lotus Icons: "https://cdn.lordicon.com/hvuelaml.json"
import PropsTypes from 'prop-types'

Icon.propTypes = {
    label: PropsTypes.string,
    src: PropsTypes.string,
    target: PropsTypes.string,
    className: PropsTypes.string,
    colors: PropsTypes.shape({
        oc: PropsTypes.string,
        pc: PropsTypes.string,
        sc: PropsTypes.string,
    }),
    style: PropsTypes.object,
    trigger: PropsTypes.oneOf(['loop', 'hover', 'click', "loop-on-hover", "morph", "boomerang"]),
    delay: PropsTypes.number,
    width: PropsTypes.number,
    height: PropsTypes.number,
};


export default function Icon({label, target, className, style, src="https://cdn.lordicon.com/hvuelaml.json", colors={pc: "#000", oc: "#000", sc: "#000" }, trigger="loop", delay=2000, width=250, height=250 }) {
  return (
    <lord-icon
    className={className}
    name={label}
    target={target}
    src={src}
    trigger={trigger}
    delay={delay}
    colors={`${colors.oc && "outline:"+colors.oc},${colors.pc && "primary:"+colors.pc},${colors.sc && "secondary:"+colors.sc}}`}
    style={{ width, height, ...style }}
    >
    </lord-icon>
  )
}
