/**
 * `NavBarLinks` is an array of objects that contains the links to be displayed in the navbar
 */
export const NavBarLinks = [{
    id:"16",
    label:"home",
    delay:600
  },
  {
    id:"14",
    label:"market",
    delay:700
  },
  {
    id:"15",
    label:"contact",
    delay:800
  },
  {
    id:"12",
    label:"about",
    delay:1000
  },   
]

/**
 * `SocialMediaLinks` is an array of objects that contains the links to be displayed in the footer
 */
export const SocialMediaLinks = [
  {
    label:"Phone Number",
    link:"tel:212669231618",
  },
  {
    label:"Facebook",
    link:"https://www.facebook.com/cactusia.ma",
  },
  {
    label:"Instagram",
    link:"https://www.instagram.com/cactusia.ma",
  },
  {
    label:"whatsapp",
    link:"https://wa.me/212669231618",
  }
]

export const OrderFields = [
  {
    type: "text",
    name: "firstname",
    label: "First Name",
    regex: /^[a-zA-Z]{3,16}$/,
    empty: "First Name is required",
    error: "First Name must be between 3 and 16 characters long and must contain only letters",
  },
  {
    type: "text",
    name: "lastname",
    label: "Last Name",
    regex: /^[a-zA-Z]{3,16}$/,
    empty: "Last Name is required",
    error: "Last Name must be between 3 and 16 characters long and must contain only letters",
  },
  {
    type: "tel",
    name: "phonenumber",
    label: "Phone Number",
    // regex format : (+212669231618 or 0669231618) morrocan phone number no spaces between numbers
    regex: /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/,
    empty: "Phone Number is required",
    error: "Phone Number must be a valid morrocan phone number",
  },
  {
    type: "text",
    name: "city",
    label: "City",
    regex: /^[a-zA-Z]{3,16}$/,
    empty: "City is required",
    error: "City must be between 3 and 16 characters long and must contain only letters",
  },
  {
    type: "textarea",
    name: "address",
    label: "Full Address",
    regex: /^[a-zA-Z0-9\s,'-]{10,}$/, // regex format : (street, city, country)
    empty: "Full Address is required",
    error: "Full Address must be at least 10 characters long and contain your street, city",
  },
]

/**
 * `Active Page` function to track active page and compare it to the coresponded link
 */
export function isActivePage(link){
  return window.location.pathname.toLowerCase() === "/"+link.toLowerCase();
}

/**
 * `Price By Quantity` function to calculate the price based on the quantity
 */
export function getPriceByQte(qte){
  switch (qte) {
    case 1:  
      return 65;
    case 2:
      return 129;
    case 3:
      return 195;
    case 4:
      return 249;
    default:
      return ((qte-4)*50)+249;
  }
}

/**
 * `Dynamic Copyright` function to display the current year and the current hostname
 */
export function dynamicCopyright(){
  return `${window.location.hostname} © ${new Date().getFullYear()} - All Rights Reserved`;
}