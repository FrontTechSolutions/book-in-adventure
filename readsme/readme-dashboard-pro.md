# Tableau de bord professionnel – Book-in Adventure

## Objectif

Offrir au professionnel une vue synthétique et interactive de son activité sur la plateforme : statut de paiement Stripe, solde disponible, prochaines activités, paiements en attente, et accès rapide aux actions clés.

## Fonctionnalités principales

### 1. Statut Stripe & Paiement
- **Statut du compte Stripe** :
  - Affichage du statut (En attente, Action requise, Actif, Bloqué)
  - Message d’alerte si action requise (ex : compléter l’onboarding, fournir un document)
  - Bouton d’accès au dashboard Stripe Express
- **Solde / Gagnotte** :
  - Montant disponible à transférer (solde Stripe Connect)
  - Historique des virements et paiements reçus

### 2. Prochaines activités
- **Liste des X prochaines activités programmées** :
  - Date, heure, titre, lieu, animateur
  - Nombre d’inscrits / places restantes
  - Statut (confirmée, annulée, en attente)
  - Accès rapide à la fiche activité ou au calendrier

### 3. Paiements en attente
- **Réservations payées mais non encore versées**
- **Réservations en attente de paiement client**
- Actions rapides : relancer le client, envoyer un lien de paiement, annuler la réservation

### 4. Raccourcis & actions
- Créer une nouvelle activité
- Accéder au calendrier
- Gérer les animateurs
- Consulter l’historique des paiements

## Exemple de structure de page

- **Bannière** : Statut Stripe + bouton "Accéder à mon compte de paiement"
- **Bloc solde** : Montant disponible, bouton "Transférer mes fonds"
- **Bloc prochaines activités** : Tableau ou liste des X prochaines activités
- **Bloc paiements en attente** : Liste des réservations à surveiller
- **Notifications** : Alertes Stripe, rappels d’activités, messages importants

## Bonnes pratiques & UX
- Rafraîchissement automatique des données (WebSocket ou polling)
- Affichage clair des statuts et alertes
- Accès rapide aux actions clés
- Sécurité : aucune donnée bancaire affichée, tout passe par Stripe

## API principales
- `GET /pros/:id/dashboard` : données agrégées du tableau de bord
- `GET /pros/:id/stripe/status` : statut Stripe
- `GET /pros/:id/balance` : solde/gagnotte
- `GET /pros/:id/activities/upcoming?limit=X` : prochaines activités
- `GET /pros/:id/payments/pending` : paiements en attente
- `POST /pros/:id/payments/:paymentId/remind` : relance client
- `POST /pros/:id/payments/:paymentId/send-link` : renvoi lien de paiement

---

