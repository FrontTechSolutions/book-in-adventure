# Page Professionnel (vue client) – Book-in Adventure

## Objectif

Permettre au client de consulter la fiche d’un professionnel, découvrir ses activités, visualiser les créneaux disponibles, et réserver facilement une ou plusieurs places.

## Fonctionnalités principales

### 1. Présentation du professionnel
- **Image de couverture** : grande photo en haut de page
- **Photo de profil** : portrait/logo du pro
- **Nom du professionnel / entreprise**
- **Description** : présentation, spécialités, expérience
- **Horaires d’ouverture**
- **Adresse** (avec lien Google Maps)
- **Téléphone** (cliquable pour appel)

### 2. Liste des activités proposées
- **Affichage sous forme de cartes ou liste**
- **Filtrage** :
  - Par type d’activité (tag/catégorie)
  - Par date (créneaux disponibles)
  - Par animateur (si plusieurs)
- **Recherche par mot-clé**

### 3. Détail d’une activité
- **Titre, description, photos**
- **Tag/catégorie**
- **Durée**
- **Animateur**
- **Couleur dominante (pour l’UI)**
- **Liste des créneaux (slots) à venir** :
  - Date, heure, durée
  - Nombre de places restantes
  - Statut (disponible, complet, annulé)

### 4. Réservation
- **Sélection d’un ou plusieurs créneaux**
- **Choix du nombre de places à réserver (dans la limite des places restantes)**
- **Ajout au panier**
- **Affichage du panier récapitulatif**
- **Validation de la réservation (paiement)**
- **Gestion des conflits (créneau déjà réservé, places insuffisantes, etc.)**

### 5. Bonnes pratiques & UX
- Affichage responsive (mobile-first)
- Mise en avant des créneaux avec peu de places restantes
- Bouton d’appel à l’action clair ("Réserver", "Ajouter au panier")
- Affichage du prix par place et total
- Confirmation visuelle à chaque étape
- Possibilité de réserver pour plusieurs personnes en une fois
- Affichage des CGV et politique d’annulation

## Exemple de structure de page
- **Bannière** : image de couverture + photo de profil
- **Bloc infos pro** : horaires, adresse, téléphone, description
- **Filtres** : type d’activité, date, animateur
- **Liste des activités** : cartes avec slots disponibles
- **Panier** : récapitulatif des réservations en cours

## API principales
- `GET /pros/:id` : infos du pro
- `GET /pros/:id/activities` : liste des activités
- `GET /pros/:id/slots?activity=...&date=...` : créneaux filtrés
- `POST /cart/add` : ajout d’un slot au panier
- `GET /cart` : affichage du panier
- `POST /cart/checkout` : validation et paiement

---

Pour toute question, contactez l’équipe technique Book-in Adventure.
