// making custom cursor with react
import { useRef, useEffect, memo } from "react";
import cursor from "../assets/icons/trowel.png";

const Cursor = memo(({debug=false}) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // disable the custom cursor in the /admin page
    // change the css variable: --cursor-flag to "auto"
    if (window.location.pathname.includes("/admin")) {
      document.documentElement.style.setProperty("--cursor-flag", "auto");
      return;
    }


    const moveCursor = e => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const cursorHeight = cursorRef.current.offsetHeight;
      const cursorWidth = cursorRef.current.offsetWidth;

      cursorRef.current.style.top = e.clientY + "px";
      cursorRef.current.style.left = e.clientX + "px";
      
      if (( e.clientX <= cursorWidth || e.clientY <= cursorHeight  )||( e.clientX >= windowWidth - cursorWidth || e.clientY >= windowHeight - cursorHeight)) {
        cursorRef.current.style.display = "none";
      } else {
        cursorRef.current.style.display = "block";
        // cursorRef.current.style.left = e.clientX + "px";
      }

      // hide the cursor in touch devices: mobile, tablet, etc.
      if ("ontouchstart" in document.documentElement) {
        cursorRef.current.style.display = "none";
      }

      // making the cursor bigger when hover over any hoverable element
      // eny elemt with the tailwind class start with "hover:*"
      // const hoverableElements = document.querySelectorAll(
      //   "[class|='hover:']"
      // );

      // console.log(hoverableElements);

      // hoverableElements.forEach(element => {
      //   if (!element) return;

      //   element.addEventListener("mouseenter", () => {
      //     cursorRef.current.classList.add("cursor-hover");
      //   })

      //   element.addEventListener("mouseleave", () => {
      //     cursorRef.current.classList.remove("cursor-hover");
      //   })
      // });


      debug && console.log({
        window: {
          height: windowHeight,
          width: windowWidth
        },
        cusror: {
          height: cursorHeight,
          width: cursorWidth,
          x: e.clientX,
          y: e.clientY
        }
      });
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  if(!window.location.pathname.includes("/admin")){
    return (
      <div
        ref={cursorRef}
        id="cursor"
        className="fixed cursor h-10 w-10 bg-contain bg-center z-[10000] pointer-events-none hidden"
        style={{ backgroundImage: `url(${cursor})` }}
      ></div>
    );
  }
});

Cursor.displayName = "Cursor";

export default Cursor;