## 9. Paiement par lien (email/SMS) & rattachement à un compte

### Paiement sans compte (invité)

Il est possible d'envoyer au client un lien de paiement par email ou SMS (ex : via Stripe Payment Link) pour régler une activité sans inscription préalable.

**Flux :**
1. Le pro crée une réservation pour un client (nom, email/téléphone).
2. La plateforme génère un lien de paiement Stripe et l'envoie par email/SMS au client.
3. Le client paie l'activité via le lien sécurisé.
4. La réservation est confirmée côté plateforme.

### Création de compte a posteriori

Après paiement, le client peut créer un compte Book-in Adventure avec le même email/téléphone utilisé lors du paiement.

- Lors de l'inscription, la plateforme détecte les réservations/payements associés à cet email/téléphone.
- Les activités/réservations payées sont automatiquement rattachées au nouveau compte client.
- Le client retrouve ainsi son historique, ses réservations et peut gérer ses annulations/avis.

**Bonnes pratiques :**
- Toujours sécuriser les liens de paiement (expiration, usage unique).
- Informer le client qu'il pourra retrouver ses activités en créant un compte avec le même email/téléphone.

**API concernées :**
- `POST /bookings/invite` : création d'une réservation et envoi du lien de paiement
- `POST /auth/register` : création de compte client (rattachement automatique des réservations existantes)
## 8. Onboarding Stripe Express – Professionnel

### 🎯 Objectif de l’onboarding

Permettre au professionnel de :
- Créer son compte Stripe Express
- Fournir ses infos légales, fiscales et bancaires
- Être éligible aux paiements

👉 Stripe est responsable du KYC, de la conformité et du stockage des données sensibles.

### 🔁 Vue d’ensemble du flux

Pro → Book-in Adventure → Stripe (onboarding hébergé)
                      ← Stripe (statut du compte)

#### 1️⃣ Création du compte Stripe Express (backend)

Lorsque le pro s’inscrit ou juste après :

```js
const account = await stripe.accounts.create({
  type: "express",
  country: "FR",
  email: pro.email,
  business_type: "company", // ou "individual"
  business_profile: {
    product_description: pro.activityDescription,
    url: pro.website ?? undefined
  },
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true }
  }
})
```

Ce que tu stockes côté plateforme :
```json
{
  "stripeAccountId": "acct_123",
  "stripeOnboardingStatus": "pending"
}
```

✅ Aucune donnée bancaire
✅ Aucun document KYC

#### 2️⃣ Génération du lien d’onboarding Stripe

Tu rediriges le pro vers Stripe-hosted onboarding :

```js
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: "https://book-in-adventure.com/onboarding/refresh",
  return_url: "https://book-in-adventure.com/onboarding/success",
  type: "account_onboarding"
})
```

➡️ Tu rediriges le pro vers `accountLink.url`

#### 3️⃣ Ce que le pro fait chez Stripe

Sur les pages Stripe (branding Stripe + mention de ta plateforme) :
- Identité (personne physique)
- Société (nom, adresse, SIRET si applicable)
- Coordonnées bancaires (IBAN)
- Informations fiscales
- Signature des CGU Stripe

👉 Tout est stocké chez Stripe
👉 Tu n’y as jamais accès

#### 4️⃣ Retour sur ta plateforme

Cas 1 : onboarding terminé
Stripe redirige vers : `/onboarding/success`

⚠️ Ne jamais se fier uniquement à cette redirection.

#### 5️⃣ Vérification réelle du statut (obligatoire)

Tu dois vérifier côté backend :

```js
const account = await stripe.accounts.retrieve(stripeAccountId)
const isComplete =
  account.details_submitted &&
  account.charges_enabled &&
  account.payouts_enabled
```

États possibles :

| État       | Signification                  |
|------------|-------------------------------|
| pending    | onboarding non terminé         |
| restricted | infos manquantes               |
| complete   | peut recevoir des paiements    |
| rejected   | refus Stripe                   |

➡️ Tant que ce n’est pas `complete`, le pro ne peut pas vendre.

#### 6️⃣ Gestion des mises à jour & blocages

Stripe peut redemander :
- Un document
- Une mise à jour d’IBAN
- Une info légale

Solution propre :
Écouter les webhooks Stripe :
- `account.updated`
- `account.application.deauthorized`

```js
if (!account.charges_enabled) {
  blockProBookings()
}
```

#### 7️⃣ Accès au dashboard Stripe Express

Le pro peut accéder à son dashboard Stripe via :

```js
const loginLink = await stripe.accounts.createLoginLink(
  stripeAccountId
)
```

➡️ Bouton : "Accéder à mes paiements"

✅ Bonne pratique :
- Aucune réservation payable tant que Stripe n’est pas prêt

### 🔐 Sécurité & responsabilité (clé pour toi)

| Élément            | Responsable   |
|--------------------|--------------|
| IBAN / cartes      | Stripe       |
| KYC / fiscalité    | Stripe       |
| Versements         | Stripe       |
| Litiges bancaires  | Stripe + Pro |
| Prestations        | Pro          |
| Flux financier     | ❌ Plateforme|

➡️ Tu restes intermédiaire technique.

### 🧩 Où ça s’intègre dans ton spec

**Endpoint** :
`POST /pros/:id/stripe/onboard`

**Front** :
- Bouton : "Finaliser mon compte de paiement"
- Statut visible : En attente / Action requise / Actif

### ✅ TL;DR

- Stripe Connect Express
- Onboarding 100 % hébergé Stripe
- Aucun stockage de données sensibles
- Paiements bloqués tant que `charges_enabled !== true`
- Vérification via API + webhooks (jamais via redirection)
# Création de compte & Gestion des rôles – Book-in Adventure

## 1. Objectif

Permettre l'inscription et la gestion des comptes utilisateurs (clients et professionnels) sur la plateforme Book-in Adventure, avec une gestion claire des rôles et des permissions.


## 2. Types de comptes & Champs nécessaires

### Client
Champs requis à la création de compte :
- **email** (obligatoire)
- **mot de passe** (obligatoire)
- **nom** (obligatoire)
- **prénom** (obligatoire)
- **téléphone** (optionnel)
- **photo de profil** (optionnel)
- **date de naissance**


Fonctionnalités :
- Peut rechercher, réserver et payer des activités
- Gère ses réservations, annulations et avis

### Professionnel (Pro)
Champs requis à la création de compte :
- **email** (obligatoire)
- **mot de passe** (obligatoire)
- **nom** (obligatoire)
- **prénom** (obligatoire)
- **téléphone** (obligatoire)
- **nom de l’entreprise** (obligatoire)
- **adresse de l’entreprise** (obligatoire)
- **description de l’activité** (obligatoire)
- **photo/logo** (optionnel)
- **horaires d’ouverture** (optionnel)
- **site web** (optionnel)
- **IBAN/coordonnées bancaires** (jamais stockés, transmis uniquement à Stripe lors de l’onboarding)

Fonctionnalités :
- Crée un compte pro avec onboarding Stripe Express intégré
- Paramètre sa page pro (profil, photos, horaires, activités)
- Gère ses activités, créneaux, réservations et communications avec les clients
- Accède à son dashboard Stripe pour la gestion des paiements

## 3. Processus de création de compte

### a) Inscription Client
- Accès au formulaire d'inscription (email, mot de passe, informations personnelles).
- Validation de l'email (optionnel).
- Connexion immédiate après inscription.

### b) Inscription Professionnel
- Accès au formulaire d'inscription pro (email, mot de passe, infos pro).
- Démarrage de l'onboarding Stripe Express (création du compte Stripe, KYC, fiscalité).
- Paramétrage de la page pro (profil, horaires, activités, etc.).
- Connexion immédiate après inscription et onboarding Stripe.

## 4. Gestion des rôles & permissions

- **Rôles principaux** :
  - `client` : accès aux fonctionnalités de réservation, gestion de compte, avis.
  - `pro` : accès à la gestion des activités, créneaux, réservations, notifications, dashboard Stripe.
  - (Possibilité d'ajouter un rôle `admin` pour la gestion de la plateforme.)

- **Permissions** :
  - Les routes et actions sont protégées selon le rôle (ex : seul un pro peut créer une activité, seul un client peut réserver).
  - Les tokens JWT intègrent le rôle de l'utilisateur pour l'authentification et l'autorisation.

## 5. API principales

- `POST /auth/register` : inscription client ou pro (avec type de compte)
- `POST /auth/login` : connexion
- `POST /auth/forgot-password` : réinitialisation du mot de passe
- `GET /users/:id` : récupération des infos utilisateur
- `POST /pros/:id/stripe/onboard` : onboarding Stripe pour les pros

## 6. Bonnes pratiques

- Hashage des mots de passe (bcrypt)
- Validation des emails et des données saisies
- Sécurisation des endpoints selon le rôle
- Utilisation de JWT pour l'authentification
- Jamais stocker d'informations bancaires sur la plateforme

## 7. Exemple de flux d'inscription pro

1. Le pro remplit le formulaire d'inscription
2. Un compte utilisateur avec rôle `pro` est créé
3. L'onboarding Stripe Express démarre (redirection Stripe)
4. Le pro complète son profil et ses activités
5. Il accède à son dashboard Stripe et à la gestion de ses réservations

---

