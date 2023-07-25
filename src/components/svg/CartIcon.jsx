
export default function CartIcon(props) {
    const {width=250, height=250, target} = props;
  return (
    <lord-icon
    // the target is the parent element that will be animated
    target={props.parent || target}
    src="https://cdn.lordicon.com/cllunfud.json"
    trigger="hover"
    delay="1000"
    colors="outline:#ffffff,primary:#ffffff,secondary:#ffffff"
    style={{width, height}}>
    </lord-icon>
  )
}
