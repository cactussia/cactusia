
export default function LordIcon({src, target, colors, state, style, className, trigger="hover", delay=2000, width=250, height=250}) {
  console.log("LORD ICON:",colors)
  return (
    <lord-icon
    className={className}
    target={target}
    src={src}
    trigger={trigger}
    delay={delay}
    colors={`${colors.pc && `primary:${colors?.pc}`},${colors.sc && `secondary:${colors?.sc}`},${colors.tc && `tertiary:${colors?.tc}`},${colors.qc && `quaternary:${colors?.qc}`},${colors.oc && `outline:${colors?.oc}`}`}
    state={state}
    style={{height, width, ...style}}>
    </lord-icon>
  )
}
