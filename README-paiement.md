
# Paiement avec Stripe – Book-in Adventure

## 1. Solution recommandée

**Stripe Connect – Comptes Express** avec modèle "Destination Charges".

### Pourquoi ce choix ?
- Responsabilité minimale pour la plateforme
- Conformité légale gérée par Stripe (KYC, fiscalité, SCA, etc.)
- Expérience simple pour les professionnels
- Stripe héberge l’onboarding et le dashboard pro
- La plateforme ne touche jamais aux fonds ni aux infos bancaires sensibles

## 2. Fonctionnement du flux de paiement

1. Le client paie sur la plateforme
2. Stripe crédite le compte du professionnel
3. La plateforme prélève automatiquement sa commission
4. Le reste du montant va au professionnel

**Schéma :**

```
Client → Stripe → Compte Pro
               ↳ Commission → Plateforme
```

## 3. Implications juridiques

| Élément                                 | Responsable         |
|-----------------------------------------|---------------------|
| Prestation (annulation, litige, qualité)| ✅ Le professionnel |
| TVA / fiscalité du pro                  | ✅ Le professionnel |
| Remboursement (si configuré correctement)| ✅ Le professionnel |
| Sécurité paiement / SCA                 | ✅ Stripe           |
| Flux d’argent                           | ❌ Pas la plateforme|

> La plateforme est un intermédiaire technique, jamais vendeur.

## 4. Étapes techniques clés

### a) Création des comptes pros

```js
stripe.accounts.create({
  type: "express",
  country: "FR",
  // ...autres infos
})
```
Stripe héberge l’onboarding (KYC, fiscalité, etc.).

### b) Paiement avec commission (Destination Charges)

```js
stripe.paymentIntents.create({
  amount: 10000, // 100 €
  currency: "eur",
  application_fee_amount: 1500, // 15 € pour la plateforme
  transfer_data: {
    destination: "{{STRIPE_ACCOUNT_ID_PRO}}"
  }
})
```

### c) Remboursements

Toujours rembourser depuis le compte connecté du pro :

```js
stripe.refunds.create({
  payment_intent: "{{PAYMENT_INTENT_ID}}"
  // ...
}, {
  stripeAccount: "{{STRIPE_ACCOUNT_ID_PRO}}"
})
```
Sinon, la plateforme devient responsable financièrement.

## 5. Bonnes pratiques & points d’attention

- ❌ Éviter les "Standard accounts" (UX compliquée)
- ❌ Éviter les "Custom accounts" (responsabilité légale accrue)
- ❌ Ne jamais gérer soi-même les IBAN/cartes
- ❌ Ne jamais encaisser sur la plateforme (pas de charges directes)

## 6. FAQ / Cas particuliers

**Q : Qui gère les litiges, remboursements, TVA ?**
A : Toujours le professionnel, jamais la plateforme.

**Q : Peut-on personnaliser l’onboarding Stripe ?**
A : Oui, via les paramètres Stripe Connect Express.

**Q : Comment afficher le dashboard pro ?**
A : Utiliser les liens d’accès fournis par Stripe pour chaque compte Express.

---

**Résumé :**

- Stripe Connect + Comptes Express
- Destination Charges
- Commission via `application_fee_amount`
- Remboursements depuis le compte pro
- Responsabilité minimale, modèle éprouvé, scalable