export const OrderFields = [
  {
    type: "text",
    name: "firstname",
    translateLabels: ["First Name", "Prénom"],
    // first name regex format : only letters min 3 max 16 characters allow trailing spaces
    regex: /^[a-zA-Z]{3,16}$/,
    translateEmpty: ["First Name is required", "Le prénom est requis"],
    translateErrors: [
      "First Name must be between 3 and 16 characters long and must contain only letters",
      "Le prénom doit comporter entre 3 et 16 caractères étendus et ne doit contenir que des lettres",
    ],
  },
  {
    type: "text",
    name: "lastname",
    translateLabels: ["Last Name", "Nom"],
    // last name regex format : only letters and 1 space between name,name ex: (John Doe) or (alex the great) min 3 max 16 characters, and the name max 3 words
    regex: /^[a-zA-Z]{3,16}(?: [a-zA-Z]{1,16}){0,2}$/, 
    translateEmpty: ["Last Name is required", "Le nom est requis"],
    translateErrors: [
      "Last Name must be between 3 and 16 characters long and must contain only letters, max 3 words",
      "Le nom doit comporter entre 3 et 16 caractères étendus et ne doit contenir que des lettres, max 3 mots",
    ],
  },
  {
    type: "tel",
    name: "phonenumber",
    translateLabels: ["Phone Number", "Numéro de Téléphone"],
    // regex format : always start with 0 the 2nd digit is 5 or 6 or 7 and the rest is 8 digits
    regex: /^0[6-7][0-9]{8}$/,
    translateEmpty: ["Phone Number is required", "Le numéro de téléphone est requis"],
    translateErrors: [
      "The phone number must be a valid Moroccan phone number, start with 06 or 07, and must be 10 digits long",
      "Le numéro de téléphone doit être un numéro de téléphone marocain valide, commencer par 06 ou 07 et doit comporter 10 chiffres."
    ],
  },
  {
    type: "text",
    name: "city",
    translateLabels: ["City", "Ville"],
    regex: /^[a-zA-Z\s,'-]{3,}$/,
    translateEmpty: ["City is required", "La ville est requise"],
    translateErrors: [
      "City must be at least 3 characters long, and must contain only letters",
      "La ville doit comporter au moins 3 caractères et ne doit contenir que des lettres",
    ],
  },
  {
    type: "textarea",
    name: "address",
    translateLabels: ["Full Address", "Adresse Complète"],
    regex: /^[a-zA-Z0-9\s,'-]{10,}$/, // regex format : (street, city, country)
    translateEmpty: ["Full Address is required", "L'adresse complète est requise"],
    translateErrors: [
      "Full Address must be at least 10 characters long and contain your street, city",
      "L'adresse complète doit comporter au moins 10 caractères et contenir votre rue, ville",
    ],
  },
]

export const ReviewsFields = [
  {
    type: "text",
    name: "author",
    translateLabels: ["Full Name", "Nom Complet"],
  },
  {
    type: "textarea",
    name: "review",
    translateLabels: ["Message", "Message"],
  },
]