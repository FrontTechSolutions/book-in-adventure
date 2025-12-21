
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
  App:{
    title: "Book'in Adventure",
  },
  auth: {
    login: 'Me connecter',
    register: 'Inscription',
    menu: 'Connexion',
    logout: 'Déconnexion'
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
  },
  activity: {
    title: "Créer une activité",
    submit: "Créer",
    fields: {
      title: "Titre",
      description: "Description",
      mainPhoto: "Photo principale",
      gallery: "Galerie de photos",
      location: "Lieu de rendez-vous",
      category: "Tag / Catégorie",
      duration: "Durée (ex: 1h30)",
      maxPlaces: "Nombre de places max",
      animator: "Animateur",
      color: "Couleur dominante"
    },
    category: {
      coaching: "Coaching",
      surf: "Surf",
      yoga: "Yoga",
      vente: "Vente privée",
      cuisine: "Atelier cuisine",
      error: {
        create: "Erreur lors de la création de l'activité",
        update: "Erreur lors de la modification de l'activité",
        delete: "Erreur lors de la suppression de l'activité",
        fetch: "Erreur lors du chargement des activités"
      },
      toaster: {
        success_title: "Activité créée",
        success_content: "L'activité a bien été enregistrée.",
        error_title: "Erreur activité",
        error_content: "Une erreur est survenue lors de la création."
      }
    }
  },
  navigation:{
    pro: {
      dashboard: "Tableau de bord",
      activities: "Mes activités",
      calendar: "Calendrier"
    },
    client: {
      dashboard: "Tableau de bord",
      profile: "Mon profil",
      bookings: "Mes réservations"
    }
  },
  userProfile:{
    title: "Mon profil",
    edit: "Modifier mon profil",
    fields:{
      email: "Email",
      lastName: "Nom",
      firstName: "Prénom",
      legal_lastName: "Nom du responsable légal",
      legal_firstName: "Prénom du responsable légal",
      phone: "Téléphone",
      birthDate: "Date de naissance",
      companyName: "Nom de l'entreprise",
      companyAddress: "Adresse de l'entreprise",
    }
  },
  dialogs:{
    profile_update:{
      title: "Mettre à jour mon profil",
      submit: "Enregistrer les modifications",
      cancel: "Annuler"
    },
    login:{
      title: "Connexion",
      email: "Email",
      password  : "Mot de passe",
      submit: "Se connecter",
      cancel: "Annuler"
    }
  }
}


