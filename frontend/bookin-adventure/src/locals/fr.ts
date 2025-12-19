import { fr } from 'vuetify/locale'

export default {
  $vuetify: {
    ...fr,
  },
  project: {
    user: {
      error: {
        register_failed: "Erreur lors de l’inscription"
      },
    }
  },
  register: {
    title: "Créer un compte",
    client: "Client",
    pro: "Professionnel",
    email: "Email",
    password: "Mot de passe",
    lastName: "Nom",
    firstName: "Prénom",
    legal_lastName: "Nom du responsable légal",
    legal_firstName: "Prénom du responsable légal",
    phone: "Téléphone",
    birthDate: "Date de naissance",
    companyName: "Nom de l'entreprise",
    companyAddress: "Adresse de l'entreprise",
    submit: "Créer mon compte",
    required: "Champ requis",
    email_invalid: "Email invalide",
    password_min: "6 caractères minimum",
    name_min: "2 lettres minimum",
    name_no_digits: "Pas de chiffres autorisés",
    age_min: "Vous devez avoir plus de 18 ans"
  }
}


