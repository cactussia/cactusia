import * as XLSX from "xlsx";

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

export const orderTrackingStatus = {
  new:"rgb(180 194 13)",
  confirmed:"rgb(193 83 205)",
  ready: "rgb(216, 153, 34)",
  postponed: "rgb(94, 94, 94)",
  indelivery:"rgb(17, 142, 217)",
  delivered:"rgb(40 171 40)",
  canceled: "rgb(216 34 34)",
  fake:"rgb(216 34 34)",
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

export function toXlsx(data, filename) {
	const wb = XLSX.utils.book_new();
	wb.Props = {
		Title: filename,
		Subject: "Exported Data",
	};
	wb.SheetNames.push("Data");
	const ws = XLSX.utils.json_to_sheet(data);
	wb.Sheets["Data"] = ws;
	const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

	function s2ab(s) {
		const buf = new ArrayBuffer(s.length);
		const view = new Uint8Array(buf);
		for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
		return buf;
	}

	function saveAs(blob, filename) {
		const a = document.createElement("a");
		a.href = window.URL.createObjectURL(blob);
		a.download = filename;
		a.click();
	}

	saveAs(
		new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
		`${filename}.xlsx`
	);
}

/**
 * `Dynamic Copyright` function to display the current year and the current hostname
 */
export function dynamicCopyright(){
  return `${window.location.hostname} © ${new Date().getFullYear()} - All Rights Reserved`;
}