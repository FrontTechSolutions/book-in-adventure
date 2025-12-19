# Page Pro (paramétrable par le professionnel) – Book-in Adventure

## Objectif

Permettre au professionnel de personnaliser sa page publique visible par les clients, afin de mettre en avant son activité, ses informations, ses photos et ses modalités de contact.

## Fonctionnalités principales

### 1. Personnalisation visuelle
- **Image de couverture** : upload/modification d’une grande photo en haut de page
- **Photo de profil** : upload/modification du portrait ou logo
- **Couleur dominante** : choix d’une couleur pour l’habillage de la page

### 2. Informations générales
- **Nom du professionnel / entreprise**
- **Description** : texte de présentation, spécialités, valeurs, expérience
- **Adresse** : saisie ou modification de l’adresse principale (affichée sur la page et utilisée par défaut pour les activités)
- **Téléphone** : numéro de contact (cliquable pour appel)
- **Email** : adresse de contact (optionnel, affichée ou non)
- **Site web** : lien externe (optionnel)
- **Horaires d’ouverture** : gestion des horaires par jour de la semaine

### 3. Activités proposées
- **Gestion de la liste des activités** : ajout, modification, suppression
- **Mise en avant d’une activité** : possibilité de "pinner" une activité en haut de page
- **Ordre d’affichage personnalisable**

### 4. Galerie photos
- **Ajout/suppression de photos** : galerie d’images pour illustrer l’ambiance, les réalisations, l’équipe, etc.
- **Choix de la photo principale**

### 5. Réseaux sociaux (optionnel)
- **Ajout de liens vers Facebook, Instagram, etc.**

### 6. Politique d’annulation & conditions
- **Texte libre** : préciser les conditions d’annulation, de remboursement, ou toute information utile pour les clients

### 7. Aperçu en temps réel
- **Prévisualisation de la page publique** avant publication des modifications

## Parcours utilisateur (pro)
1. Le pro accède à la section "Mon profil / Ma page pro"
2. Il modifie les champs souhaités (photos, texte, horaires, etc.)
3. Il prévisualise le rendu public
4. Il valide pour publier les modifications

## Bonnes pratiques & UX
- Validation des champs obligatoires
- Limite sur la taille/poids des images
- Possibilité de masquer certaines infos (ex : email)
- Affichage responsive (mobile-first)
- Historique des modifications

## API principales
- `GET /pros/:id` : récupération des infos pro
- `PATCH /pros/:id` : modification des infos pro
- `POST /pros/:id/photos` : ajout d’une photo
- `DELETE /pros/:id/photos/:photoId` : suppression d’une photo
- `PATCH /pros/:id/activities/order` : modification de l’ordre d’affichage

---

Pour toute question, contactez l’équipe technique Book-in Adventure.
# Page Professionnel (vue pro) – Book-in Adventure
