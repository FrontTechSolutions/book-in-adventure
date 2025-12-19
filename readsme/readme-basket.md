# Composant Panier (Basket) – Book-in Adventure

## Objectif
Centraliser et récapituler les réservations en cours avant paiement, pour le client ou le professionnel, et permettre la gestion et le paiement groupé des activités.

## Usages du composant panier

### 1. Sur la page publique d’un professionnel (vue client)
- Affiché lors de la réservation de slots/activités
- Permet d’ajouter plusieurs créneaux/activités au panier avant validation
- Affiche le détail de chaque réservation (activité, date, nombre de places, prix unitaire, total)
- Permet de modifier ou supprimer une réservation du panier
- Affiche le total à payer et le bouton de validation/paiement

### 2. Dans l’espace client
- Affiche les réservations en attente de paiement (ex : paiement échoué, réservation incomplète)
- Permet de relancer le paiement pour une ou plusieurs réservations
- Affiche l’historique des paniers précédents (optionnel)

### 3. Dans l’espace professionnel
- Permet au pro de créer un panier pour un client (ex : réservation groupée, ajout manuel)
- Génère un lien de paiement à envoyer au client (email/SMS)
- Suivi du statut du paiement (en attente, payé, expiré)

## Fonctionnalités principales
- Ajout/suppression/modification de réservations dans le panier
- Calcul automatique du total (prix x nombre de places)
- Affichage des détails (activité, créneau, animateur, date, lieu, nombre de places, prix)
- Validation du panier et redirection vers le paiement (Stripe)
- Gestion des erreurs (places non disponibles, créneau annulé, paiement échoué)
- Affichage du statut de chaque réservation (en attente, payé, annulé)
- Possibilité de vider le panier

## Bonnes pratiques & UX
- Affichage clair et synthétique
- Confirmation avant suppression d’un élément
- Mise à jour en temps réel des disponibilités
- Sécurité : aucune donnée bancaire stockée, tout passe par Stripe
- Responsive (mobile-first)

## API principales
- `POST /cart/add` : ajout d’un slot/activité au panier
- `GET /cart` : récupération du panier courant
- `DELETE /cart/:itemId` : suppression d’un élément
- `POST /cart/checkout` : validation et paiement
- `POST /cart/send-link` : génération/envoi d’un lien de paiement (pro)

---

Pour toute question, contactez l’équipe technique Book-in Adventure.
