## Module : Calendrier (gestion des créneaux)

### Frontend
- **Librairie utilisée** : [FullCalendar Vue](https://fullcalendar.io/docs/vue)
- **Fonctionnalités avancées** :
	- Le professionnel visualise la liste de ses activités et peut les placer dans le calendrier avec gestion des récurrences (ex : tous les lundis, chaque semaine, etc.)
	- Si un créneau (slot) est déplacé alors que des clients sont inscrits, des emails automatiques sont envoyés à tous les clients concernés avec la mise à jour de l’horaire/lieu.
	- Possibilité d’ajouter des animateurs à un créneau et de superposer plusieurs calendriers (par animateur).
	- Changement d’animateur sur un créneau possible, avec notification automatique des clients.
	- Affichage des créneaux/activités sous forme de calendrier (jour/semaine/mois)
	- Création, modification, suppression de créneaux par drag & drop ou formulaire
	- Sélection de créneaux par les clients
	- Synchronisation avec le backend (API REST)

### Backend
- **Domain** :
	- Slot (créneau)
	- Activity (activité)
	- RecurrenceRule (règle de récurrence)
	- Animator (animateur)
	- Assignment (affectation animateur/créneau)

- **Use cases** :
	- Création/édition/suppression de créneaux
	- Placement d’une activité dans le calendrier avec récurrence
	- Affectation/désaffectation d’animateurs à un créneau
	- Génération automatique des créneaux récurrents
	- Déplacement d’un créneau avec clients inscrits (déclenchement de notifications)
	- Changement d’animateur sur un créneau (notification des clients)
	- Vérification de disponibilité (créneau, animateur)

- **Infrastructure** :
	- SlotRepository, ActivityRepository, AnimatorRepository (MongoDB)
	- NotificationService (email)

- **Interface (API REST)** :
	- GET /calendar/activities (liste des activités du pro)
	- POST /calendar/slots (création de créneau avec récurrence)
	- PATCH /calendar/slots/:id (modification/déplacement de créneau)
	- POST /calendar/slots/:id/assign-animator (affectation animateur)
	- PATCH /calendar/slots/:id/change-animator (changement animateur)
	- GET /calendar/animators (liste animateurs du pro)

---

### Exemple d’intégration (Vue 3)

```bash
npm install @fullcalendar/vue3 @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid
```

Dans le composant Vue :

```vue
<template>
	<FullCalendar :options="calendarOptions" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const calendarOptions = {
	plugins: [dayGridPlugin, timeGridPlugin],
	initialView: 'timeGridWeek',
	events: [], // à remplir dynamiquement depuis l’API
	editable: true,
	selectable: true,
	// ...autres options (eventClick, eventDrop, etc.)
}
</script>
```

---
## Module : Paiement (Stripe)

### Domain
- **Entités** : Payment, Refund, Commission, StripeAccount
- **Value Objects** : Amount, Currency, PaymentStatus

### Application
- **Use cases** :
	- Création d’un compte pro Stripe Express (onboarding)
	- Paiement d’une réservation (Destination Charges)
	- Prélèvement automatique de la commission plateforme
	- Remboursement automatique en cas d’annulation

### Infrastructure
- **Services externes** : StripeService (gestion des comptes, paiements, remboursements)
- **Repositories** : PaymentRepository (MongoDB)

### Interface
- **API REST** :
	- POST /payments (création d’un paiement avec commission)
	- POST /pros/:id/stripe/onboard (création/onboarding compte pro)
	- POST /payments/:id/refund (remboursement)

### Spécificités Stripe (Connect Express + Destination Charges)
- Utilisation de Stripe Connect avec comptes Express pour les pros
- Paiement du client directement vers le compte pro, commission prélevée automatiquement (application_fee_amount)
- Remboursements toujours initiés depuis le compte connecté du pro
- La plateforme ne détient jamais les fonds ni les infos bancaires sensibles

---
## Module : Gestion des professionnels (Pro)

### Domain
- **Entités** : Pro, Activity, Profile, Address, Schedule
- **Value Objects** : Description, Image, ContactInfo

### Application
- **Use cases** :
	- Création et gestion du compte pro
	- Paramétrage de la page pro (profil, photos, horaires, adresse)
	- Création/édition/suppression d’activités
	- Gestion du calendrier et des créneaux
	- Communication avec les clients (groupe/individuel)

### Infrastructure
- **Repositories** : ProRepository (MongoDB), ActivityRepository
- **Services externes** : EmailService, NotificationService

### Interface
- **API REST** :
	- POST /pros
	- GET /pros/:id
	- PATCH /pros/:id
	- POST /pros/:id/activities
	- PATCH /pros/:id/activities/:activityId
	- POST /pros/:id/notify

---
## Module : Réservation (Booking)

### Domain
- **Entités** : Booking, Activity, Slot, CancellationPolicy
- **Value Objects** : DateRange, BookingStatus, Amount

### Application
- **Use cases** :
	- Créer une réservation
	- Annuler une réservation
	- Modifier une réservation (date/heure)
	- Consulter l’historique des réservations

### Infrastructure
- **Repositories** : BookingRepository (MongoDB), ActivityRepository
- **Services externes** : NotificationService (email/SMS), PaymentService (Stripe)

### Interface
- **API REST** :
	- POST /bookings
	- GET /bookings/:id
	- PATCH /bookings/:id (modification)
	- DELETE /bookings/:id (annulation)

---
## Module : Authentification & gestion des utilisateurs

### Domain
- **Entités** : User (Client, Pro), Credentials, Role
- **Value Objects** : Email, PasswordHash

### Application
- **Use cases** :
	- Inscription (client/pro)
	- Connexion
	- Réinitialisation du mot de passe
	- Gestion des rôles et permissions

### Infrastructure
- **Repositories** : UserRepository (MongoDB)
- **Services externes** : EmailService (envoi de mail de confirmation/réinitialisation)

### Interface
- **API REST** :
	- POST /auth/register
	- POST /auth/login
	- POST /auth/forgot-password
	- GET /users/:id

---

# Architecture technique (Domain Driven Design)

## Stack technique

- **Frontend** : Vue.js 3 (Vite)
- **Backend** : Node.js (Express)
- **Base de données** : MongoDB
- **Paiement** : Stripe (API)
- **Autres services** : (à compléter selon besoins)

---

## Architecture générale

L’application est structurée selon les principes du Domain Driven Design (DDD) :

- **Domain** : logique métier, entités, agrégats, value objects
- **Application** : cas d’usage, services applicatifs
- **Infrastructure** : accès aux données (MongoDB), intégrations externes (Stripe, email, etc.)
- **Interface** : API REST (Express), frontend (Vue.js)

---

## Organisation des dossiers (proposition)

```
backend/
	src/
		domain/
			booking/
			user/
			pro/
			...
		application/
			usecases/
			services/
		infrastructure/
			repositories/
			stripe/
			mail/
			...
		interface/
			controllers/
			routes/
		config/
		app.js
frontend/
	... (structure Vue.js)
```

---

## À compléter
- Décrire les modules principaux (auth, réservation, paiement, etc.)
- Déploiement, sécurité, tests, etc.