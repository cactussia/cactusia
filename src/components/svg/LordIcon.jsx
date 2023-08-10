
export default function LordIcon({src, target, colors, state, style, className, trigger="loop", delay=2000, width=250, height=250}) {
  return (
    <lord-icon
    className={className}
    target={target}
    src={src}
    trigger={trigger}
    delay={delay}
    colors={`
        ${colors.pc && `primary:${colors.pc}`},
        ${colors.sc && `secondary:${colors.sc}`},
        ${colors.tc && `tertiary:${colors.tc}`},
        ${colors.qc && `quaternary:${colors.qc}`},
    `}
    state={state}
    style={{height, width, ...style}}>
    </lord-icon>
  )
}
