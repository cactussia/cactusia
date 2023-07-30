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
    // last name regex format : only letters and 1 space between name,name ex: (John Doe) or (alex the great) min 3 max 16 characters, and the name max 3 words
    regex: /^[a-zA-Z]{3,16}(?: [a-zA-Z]{3,16}){0,2}$/, 
    empty: "Last Name is required",
    error: "Last Name must be between 3 and 16 characters long and must contain only letters, max 3 words",
  },
  {
    type: "tel",
    name: "phonenumber",
    label: "Phone Number",
    // regex format : always start with 0 the 2nd digit is 5 or 6 or 7 and the rest is 8 digits
    regex: /^0[5-7][0-9]{8}$/,
    empty: "Phone Number is required",
    error: "Phone Number must be a valid morrocan phone number, start with 05,06 or 07 and must be 10 digits long",
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
 * Formate date from firestore timestamp to a readable date like: 12 Jan 2021, 12:00:00 (24 hours format)
 */
export function dateFormater(date){
  // return new Date(date?.seconds * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const localdate = new Date(date?.seconds * 1000);
  return localdate.toLocaleDateString("fr",options) + ", " + localdate.toLocaleTimeString("en-US",{hour12: false});
}

/**
 * Formate phone number to a whatsapp link format like: 212669231618
 */
export function phoneFormater(phone){
  return phone.slice(1).padStart(12,"212");
}

export const WhatsappMessageConfirmation = (name, total) => encodeURI(`
Bonjour *${name}*, J'espère que vous allez bien. Vous avez passé commande chez cactusia \n
- 1 Coffret d'un montant total de *${total} DH*. \n
Merci bien de me confirmer votre commande afin de vous envoyer le colis dans les plus brefs délais. \n
Hiba de cactusia
`);

/**
 * `Dynamic Copyright` function to display the current year and the current hostname
 */
export function dynamicCopyright(){
  return `${window.location.hostname} © ${new Date().getFullYear()} - All Rights Reserved`;
}