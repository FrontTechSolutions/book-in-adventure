# Configuration de Google Maps API

Pour que l'autocomplétion d'adresse fonctionne, ajoutez votre clé API Google Maps dans le fichier `.env` :

```env
VITE_GOOGLE_MAPS_API_KEY=votre_cle_api_google_maps
```

## Obtenir une clé API Google Maps

1. Accédez à [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API "Places API" et "Maps JavaScript API"
4. Créez des identifiants (clé API)
5. Configurez les restrictions (recommandé : restriction par domaine)

## Utilisation du composant AddressInput

Le composant `AddressInput` est réutilisable partout dans l'application :

```vue
<template>
  <AddressInput 
    v-model="myAddress" 
    label="Adresse de livraison"
    :rules="[rules.required]"
    required
  />
</template>

<script setup>
import { ref } from 'vue';
import AddressInput from '@/components/AddressInput.vue';
import type { Address } from '@/interfaces/Address';

const myAddress = ref<Address | null>(null);
</script>
```

## Structure de l'objet Address

```typescript
{
  formatted: "123 Rue de la Paix, 75002 Paris, France",
  lat: 48.8698679,
  lng: 2.3311542,
  street_number: "123",
  route: "Rue de la Paix",
  city: "Paris",
  postalCode: "75002",
  country: "France"
}
```
