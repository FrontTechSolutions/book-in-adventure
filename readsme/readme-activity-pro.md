# Page Activité – Espace Professionnel (Book-in Adventure)

## Objectif

Permettre aux professionnels de créer, éditer et gérer leurs activités proposées à la réservation sur la plateforme Book-in Adventure.

## Fonctionnalités principales

- Création d’une nouvelle activité
- Modification/suppression d’une activité existante
- Visualisation de la liste des activités du pro
- Gestion des créneaux associés à chaque activité (via le calendrier)

## Champs d’une activité

Lors de la création ou l’édition d’une activité, le professionnel renseigne :

- **Titre** (obligatoire) : nom de l’activité (ex : "Cours de surf débutant")
- **Description** (obligatoire) : texte détaillé présentant l’activité, le déroulé, le public visé, etc.
- **Photo principale** (obligatoire) : image de couverture de l’activité
- **Galerie de photos** (optionnel) : plusieurs images pour illustrer l’activité
- **Lieu de rendez-vous** (optionnel) : adresse précise du point de départ. Si non renseigné, l’adresse du pro est utilisée par défaut
- **Tag / Catégorie** : ex : coaching, surf, yoga, vente privée, atelier cuisine, etc. (choix dans une liste prédéfinie)
+- **Tag / Sous-catégorie** (optionnel) : personnalisable, ex: remise en forme, régime, préparation MMA, etc
+- **Durée** (obligatoire) : durée de l’activité (ex : 1h30)
+- **Nombre de places maximum** (obligatoire) : nombre de participants autorisés par créneau pour cette activité
+- **Animateur** (obligatoire) : personne responsable de l’activité (choix parmi les animateurs du pro)
+- **Couleur dominante** (obligatoire) : couleur personnalisée pour l’affichage dans le calendrier ou la fiche activité


## Exemple de formulaire de création d’activité

| Champ                | Type         | Obligatoire | Description                                  |
|----------------------|--------------|-------------|----------------------------------------------|
| Titre                | Texte        | Oui         | Nom de l’activité                            |
| Description          | Texte long   | Oui         | Présentation détaillée                       |
| Photo principale     | Image        | Oui         | Image de couverture                          |
| Galerie de photos    | Images       | Non         | Images supplémentaires                       |
| Lieu de rendez-vous  | Texte        | Non         | Adresse précise, sinon adresse du pro        |
| Tag / Catégorie      | Sélecteur    | Oui         | Coaching, surf, yoga, etc.                   |
| Durée                | Durée        | Oui         | Ex : 1h, 2h30                                |
| Nombre de places max | Nombre       | Oui         | Nombre de participants par créneau           |
| Animateur            | Sélecteur    | Oui         | Animateur responsable                        |
| Couleur dominante    | Couleur      | Non         | Pour affichage personnalisé                  |

## Parcours utilisateur (pro)

1. Le pro accède à son espace "Mes activités"
2. Il clique sur "Créer une activité"
3. Il remplit le formulaire avec les champs ci-dessus
4. Il valide : l’activité apparaît dans la liste et peut être associée à des créneaux dans le calendrier
5. Il peut modifier ou supprimer ses activités à tout moment

## Bonnes pratiques & UX

- Prévisualisation de la fiche activité avant publication
- Validation des champs obligatoires
- Suggestion automatique du lieu si non renseigné
- Choix de la couleur via un sélecteur visuel
- Possibilité d’ajouter plusieurs animateurs (pour les activités en binôme)
- Affichage des activités avec tags/couleurs dans le calendrier pro

## API principales

- `POST /pros/:id/activities` : création d’une activité
- `PATCH /pros/:id/activities/:activityId` : modification
- `DELETE /pros/:id/activities/:activityId` : suppression
- `GET /pros/:id/activities` : liste des activités du pro

---

Pour toute question, contactez l’équipe technique Book-in Adventure.
