// animation mods:
// hover - loop - loop on hover - click - morph - boomerang

export default function PlantIcon({width=250, height=250}) {
  return (
    <lord-icon
    src="https://cdn.lordicon.com/hbbeevsh.json"
    trigger="loop"
    delay="2000"
    colors="primary:#8a9c81,secondary:#404e36"
    style={{width, height}}>
    </lord-icon>
  )
}
