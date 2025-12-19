# Book-in Adventure – Architecture du Projet

## 1. Présentation Générale

Book-in Adventure est une plateforme mobile-first dédiée à la réservation d’activités auprès de professionnels (surf, coaching, ateliers, etc.). Elle se distingue par sa flexibilité métier, la gestion dynamique des créneaux, la communication directe avec les clients, et l’automatisation des annulations/remboursements.

## 2. Stack Technique

- **Frontend** : Vue.js 3 (Vite)
- **Backend** : Node.js (Express)
- **Base de données** : MongoDB
- **Paiement** : Stripe (API, Connect Express)
- **Services externes** : Email, Notification

## 3. Architecture (Domain Driven Design)

L’application est structurée selon les principes du Domain Driven Design (DDD) :

- **Domain** : logique métier, entités, agrégats, value objects
- **Application** : cas d’usage, services applicatifs
- **Infrastructure** : accès aux données (MongoDB), intégrations externes (Stripe, email, etc.)
- **Interface** : API REST (Express), frontend (Vue.js)


### Organisation des dossiers (proposition)

```
backend/
  src/
    domain/           # Logique métier, entités, agrégats, value objects (ex : Booking, User, Pro)
      booking/        # Entités et logique métier liées aux réservations
      user/           # Entités et logique métier liées aux utilisateurs
      pro/            # Entités et logique métier liées aux professionnels
      ...
    application/      # Cas d’usage, orchestration métier, services applicatifs
      usecases/       # Cas d’usage (ex : réserver, annuler, payer)
      services/       # Services applicatifs transverses
    infrastructure/   # Accès aux données, intégrations externes (DB, Stripe, email...)
      repositories/   # Accès aux collections MongoDB (repositories)
      stripe/         # Intégration Stripe (paiement, onboarding, transferts)
      mail/           # Intégration email (notifications, confirmations)
      ...
    interface/        # Interface d’exposition (API REST, routes, contrôleurs Express)
      controllers/    # Contrôleurs Express (logique de gestion des requêtes)
      routes/         # Définition des routes Express (mapping URL → contrôleur)
    config/           # Fichiers de configuration (environnements, secrets, etc.)
    app.js            # Point d’entrée principal de l’application backend
frontend/
  src/
    modules/
      domaineMetier1/
        components/    # Composants Vue spécifiques au domaine
        composables/   # Composables (hooks) réutilisables
        interfaces/    # Typescript interfaces/types/models du domaine
        services/      # Services métier ou API du domaine
        stores/        # Pinia stores du domaine
        views/         # Vues/pages du domaine
      domaineMetier2/
        ...
    ...
```

## 4. Modules Principaux

### a) Authentification & Utilisateurs
- Inscription/connexion (client, pro)
- Gestion des rôles et permissions
- Réinitialisation du mot de passe
- API : `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/users/:id`

### b) Gestion des Professionnels (Pro)
- Création/gestion du compte pro
- Paramétrage de la page pro (profil, photos, horaires, adresse)
- Création/édition/suppression d’activités
- Communication avec les clients
- API : `/pros`, `/pros/:id`, `/pros/:id/activities`, `/pros/:id/notify`

### c) Calendrier & Créneaux
- Visualisation et gestion des activités dans un calendrier (FullCalendar Vue)
- Gestion des récurrences, affectation d’animateurs, notifications clients
- Synchronisation avec le backend (API REST)
- API : `/calendar/activities`, `/calendar/slots`, `/calendar/animators`, etc.

### d) Réservation (Booking)
- Création, modification, annulation de réservations
- Historique des réservations
- Politique d’annulation flexible (dépend du pro et du délai)
- API : `/bookings`, `/bookings/:id`

### e) Paiement (Stripe)
- Stripe Connect Express (comptes pros)
- Paiement client → compte pro, commission automatique (Destination Charges)
- Remboursements automatiques en cas d’annulation
- API : `/payments`, `/pros/:id/stripe/onboard`, `/payments/:id/refund`

## 5. Flux de Paiement Stripe (Résumé)

- Utilisation de Stripe Connect Express (modèle "Destination Charges")
- Le client paie sur la plateforme
- Stripe crédite le compte du professionnel
- La plateforme prélève automatiquement sa commission
- Remboursements toujours initiés depuis le compte connecté du pro
- La plateforme ne détient jamais les fonds ni les infos bancaires sensibles

## 6. Bonnes Pratiques & Points d’Attention

- Responsabilité légale minimale pour la plateforme (jamais vendeur)
- Conformité légale et sécurité gérées par Stripe
- Communication automatisée (emails, notifications) lors de changements de créneaux ou d’animateurs
- Mobile-first : expérience optimale sur smartphones et tablettes

## 7. Fonctionnalités Clés (Mobile-First)

- Inscription/connexion (client, pro)
- Recherche d’activités, réservation, paiement en ligne
- Gestion des créneaux et calendrier interactif
- Annulation/remboursement automatisés selon conditions
- Communication directe/groupée avec les clients

## 8. À compléter
- Déploiement, sécurité, tests automatisés, monitoring, etc.

---

**Résumé :**
- Architecture DDD (Domain, Application, Infrastructure, Interface)
- Stack moderne (Vue.js, Node.js, MongoDB, Stripe)
- Modules principaux : Auth, Pro, Calendrier, Réservation, Paiement
- Flux de paiement sécurisé et conforme via Stripe Connect Express
- Mobile-first, automatisation, flexibilité métier
