
export default function ArrowIcon({ target, pc="#fff", sc="#fff", width=250, height=250}) {
  return (
    <lord-icon
    target={target}
    src="https://cdn.lordicon.com/jxwksgwv.json"
    trigger="hover"
    colors={`primary:${pc},secondary:${sc}`}
    state="hover-2"
    style={{width, height}}>
    </lord-icon>
  )
}