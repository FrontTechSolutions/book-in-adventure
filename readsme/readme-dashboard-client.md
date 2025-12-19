# Tableau de bord client – Book-in Adventure

## Objectif

Offrir au client une vue synthétique et interactive de ses réservations, paiements, activités à venir, et accès rapide aux actions clés.

## Fonctionnalités principales

### 1. Prochaines activités
- **Liste des prochaines activités réservées** :
  - Date, heure, titre, lieu, animateur
  - Statut (confirmée, en attente, annulée)
  - Bouton pour voir le détail, annuler ou modifier la réservation
  - Accès rapide à la fiche activité

### 2. Historique des réservations
- **Tableau ou liste des activités passées**
  - Date, titre, statut
  - Possibilité de laisser un avis/commentaire
  - Accès à la facture ou au reçu de paiement

### 3. Paiements
- **Statut des paiements** :
  - Réservations payées, en attente de paiement, remboursées
  - Bouton pour finaliser un paiement en attente (lien Stripe)

### 4. Notifications & rappels
- **Alertes importantes** :
  - Rappel automatique avant l’activité (email/SMS)
  - Notification en cas de modification/annulation par le pro
  - Message en cas de remboursement

### 5. Actions rapides
- Annuler une réservation (selon conditions)
- Modifier une réservation (si autorisé)
- Télécharger une facture
- Laisser un avis sur une activité passée

## Exemple de structure de page

- **Bannière** : Bienvenue + résumé du nombre d’activités à venir
- **Bloc prochaines activités** : Liste ou tableau
- **Bloc historique** : Réservations passées
- **Bloc paiements** : Statut des paiements
- **Bloc notifications** : Alertes et rappels

## Bonnes pratiques & UX
- Affichage clair des statuts (payé, en attente, annulé)
- Accès rapide aux actions clés
- Rappels automatiques (email/SMS)
- Sécurité : aucune donnée bancaire affichée, tout passe par Stripe

## API principales
- `GET /users/:id/dashboard` : données agrégées du tableau de bord client
- `GET /users/:id/bookings/upcoming` : prochaines activités
- `GET /users/:id/bookings/history` : historique
- `GET /users/:id/payments` : paiements
- `POST /bookings/:id/cancel` : annulation
- `POST /bookings/:id/pay` : paiement en attente
- `POST /bookings/:id/review` : laisser un avis

---

