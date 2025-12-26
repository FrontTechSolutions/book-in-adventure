
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
    cancel: "Annuler",
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
  userProfileUpdate:{
      title: "Mettre à jour mon profil",
      submit: "Mettre à jour",
      cancel: "Annuler"
  },  
  userPasswordUpdate:{
    title: "Mettre à jour mon mot de passe",
    password: "Mot de passe",
    submit: "Modifier mon mot de passe",
    cancel: "Annuler"
  },
  userEmailUpdate:{
    title: "Mettre à jour mon email",
    email: "Email",
    password: "Mot de passe",
    submit: "Modifier mon email",
    cancel: "Annuler"
  },
  userPassword:{
    title: "Mettre à jour mon mot de passe",
    password: "Mot de passe",
    edit: "Modifier mon mot de passe",
    cancel: "Annuler"
  },  
  userEmail:{
    title: "Mettre à jour mon email",
    email: "Email",
    edit: "Modifier mon email"
  },
  dialogs:{
    login:{
      title: "Connexion",
      email: "Email",
      password  : "Mot de passe",
      submit: "Se connecter",
      cancel: "Annuler"
    }
  },
  backend: {
    error: {
      email_required: "Email requis",
      password_required: "Mot de passe requis",
      lastname_required: "Nom requis",
      firstname_required: "Prénom requis",
      role_required: "Rôle requis",
      role_invalid: "Rôle invalide",
      phone_required: "Téléphone requis",
      companyname_required: "Nom de l'entreprise requis",
      companyaddress_required: "Adresse de l'entreprise requise",
      activitydescription_required: "Description de l'activité requise",
      account_creation_failed: "Impossible de créer le compte",
      server: "Erreur serveur",
      user_not_found: "Utilisateur non trouvé",
      email_password_required: "Email et mot de passe requis",
      invalid_credentials: "Email ou mot de passe incorrect",
      account_not_verified: "Compte non vérifié",
      account_already_verified: "Compte déjà vérifié",
      too_many_attempts: "Trop de tentatives. Réessayez plus tard.",
      code_expired: "Code expiré",
      code_invalid: "Code invalide",
      code_invalid_or_expired: "Code invalide ou expiré",
      current_password_incorrect: "Mot de passe actuel incorrect",
      no_email_request : "Aucune demande de changement d'email en cours.",
      email_already_used : "L'email est déjà utilisé par un autre compte."
    },
    success: {
      account_created: "Compte créé. Vérifiez votre email pour activer le compte.",
      account_verified: "Compte vérifié avec succès",
      code_sent: "Code envoyé",
      code_valid: "Code valide",
      password_updated: "Mot de passe mis à jour",
      email_updated : "Votre adresse email a été mise à jour avec succès."
      
    }
  },
  toasters:{
    success: "Succès",
    error: "Erreur",
    warning: "Attention",
    info: "Info",
    content:{
      register_success: "Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.",
      login_success: "Connexion réussie ! Bienvenue.",
      profile_update_success: "Profil mis à jour avec succès.",
      password_update_success: "Mot de passe mis à jour avec succès.",
      password_update_code_success: "Code de réinitialisation du mot de passe vérifié avec succès.",
      email_update_success: "Adresse email mise à jour avec succès.",
      email_request_asked: "Demande de changement d'email envoyée. Vérifiez votre boîte de réception."
    },
    errorCommon:{
      common: "Une erreur est survenue. Veuillez réessayer plus tard."
    }
  },

  
}


