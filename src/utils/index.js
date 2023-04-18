/**
 * `NavBarLinks` is an array of objects that contains the links to be displayed in the navbar
 */
export const NavBarLinks = [{
    label:"Home",
    delay:700
  },
  {
    label:"Market",
    delay:800
  },
  {
    label:"Contact",
    delay:900
  },
  {
    label:"About",
    delay:1000
  },   
]

/**
 * `Active Page` function to track active page and compare it to the coresponded link
 */
export function isActivePage(link){
  return window.location.pathname.toLowerCase() === "/"+link.toLowerCase();
}
