/**
 * `NavBarLinks` is an array of objects that contains the links to be displayed in the navbar
 */
export const NavBarLinks = [{
    label:"Home",
    delay:600
  },
  {
    label:"Market",
    delay:700
  },
  {
    label:"Contact",
    delay:800
  },
  {
    label:"About",
    delay:1000
  },   
]

/**
 * `SocialMediaLinks` is an array of objects that contains the links to be displayed in the footer
 */
export const SocialMediaLinks = [{
    label:"Facebook",
    link:"https://www.facebook.com/",
  },
  {
    label:"Instagram",
    link:"https://www.instagram.com/",
  },
  {
    label:"whatsapp",
    link:"https://wa.me/0000000000",
  },{
    label:"Phone Number",
    link:"tel:0000000000",
  }
]

/**
 * `Active Page` function to track active page and compare it to the coresponded link
 */
export function isActivePage(link){
  return window.location.pathname.toLowerCase() === "/"+link.toLowerCase();
}
