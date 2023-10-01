
export default function CartIcon(props) {
    const {width=250, height=250, target} = props;
  return (
    <lord-icon
    // the target is the parent element that will be animated
    target={props.parent || target}
    src="https://cdn.lordicon.com/cllunfud.json"
    trigger="hover"
    delay="1000"
    colors="outline:#3f4f35,primary:#3f4f35,secondary:#3f4f35"
    style={{width, height}}>
    </lord-icon>
  )
}
