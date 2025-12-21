# Page Calendrier – Espace Professionnel (Book-in Adventure)

## Objectif

Permettre aux professionnels de gérer facilement la planification de leurs activités, créneaux et inscriptions clients via un calendrier interactif, inspiré de Google Calendar.

## Fonctionnalités principales

- **Affichage du calendrier**
  - Vue jour, semaine ou mois
  - Affichage de toutes les activités ou filtrage par activité et/ou par animateur

- **Ajout et gestion des créneaux**
  - Clic sur le calendrier pour sélectionner une date/heure
  - Choix de l’activité à positionner (parmi celles du pro)
  - Sélection de l’animateur (si plusieurs)
  - Définition de l’heure de début et de la durée (affichage automatique de la plage)
  - Ajout de récurrences (quotidien, hebdo, mensuel, personnalisé) comme sur Google Calendar
  - Validation pour créer le créneau (slot)

- **Gestion des créneaux existants**
  - Drag & drop pour déplacer un créneau à une autre date/heure  (avec notification automatique des clients inscrits)
  - Modification de la durée ou de l’animateur  (avec notification automatique des clients inscrits)
  - Suppression d’un créneau
  - Annulation d’un créneau (avec notification automatique des clients inscrits)

- **Gestion des inscriptions**
  - Clic sur un créneau pour voir la liste des inscrits (clients)
  - Ajout d’un client existant (recherche par email ou nom)
  - Inscription d’un nouveau client (création rapide + envoi d’un lien de paiement par email/SMS)
  - Suppression d’un client d’un créneau
  - Visualisation du statut de paiement de chaque client

- **Notifications**
  - Envoi automatique d’emails/SMS aux clients lors de la création, modification ou annulation d’un créneau
  - Notification des animateurs concernés

- **Personnalisation**
  - Couleur personnalisée par activité (affichage visuel dans le calendrier)
  - Affichage des créneaux par animateur (superposition possible)

## Parcours utilisateur (pro)

1. Le pro accède à la page "Calendrier"
2. Il choisit la vue (jour/semaine/mois) et peut filtrer par activité ou animateur
3. Il clique sur une plage horaire libre pour ajouter un créneau, choisit l’activité, l’animateur, la durée, et configure la récurrence si besoin
4. Il valide : le créneau apparaît dans le calendrier avec la couleur de l’activité
5. Il peut déplacer un créneau par drag & drop, le modifier ou l’annuler
6. En cliquant sur un créneau, il voit la liste des inscrits, peut ajouter/supprimer des clients, envoyer un lien de paiement, ou supprimer le créneau

## Bonnes pratiques & UX

- Prévisualisation des créneaux avant validation
- Confirmation avant suppression/annulation
- Affichage clair des statuts (payé, en attente, annulé)
- Gestion des conflits de planning (animateur déjà occupé, créneau en doublon)
- Historique des modifications et notifications envoyées
- Synchronisation en temps réel (WebSocket ou polling)

## API principales

- `GET /calendar/activities` : liste des activités du pro
- `GET /calendar/slots` : liste des créneaux (avec filtres)
- `POST /calendar/slots` : création d’un créneau (avec récurrence)
- `PATCH /calendar/slots/:id` : modification/déplacement
- `DELETE /calendar/slots/:id` : suppression/annulation
- `POST /calendar/slots/:id/assign-animator` : affectation animateur
- `GET /calendar/slots/:id/clients` : liste des inscrits
- `POST /calendar/slots/:id/add-client` : ajout d’un client existant
- `POST /calendar/slots/:id/invite-client` : inscription d’un nouveau client + envoi lien paiement
- `DELETE /calendar/slots/:id/remove-client/:clientId` : suppression d’un client

## Technologies & intégration

- **Frontend** : Vue.js 3 + FullCalendar Vue (vue3)
- **Backend** : Node.js (Express)
- **Notifications** : Email/SMS (via services externes)
- **Paiement** : Stripe (lien de paiement pour les invités)

---

Pour toute question, contactez l’équipe technique Book-in Adventure.
