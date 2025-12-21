<script setup lang="ts">

import { useI18n } from 'vue-i18n';
import { useCommonStore } from '@/stores/common.store'; // Ajout de l'import du store
const { t } = useI18n();

const commonStore = useCommonStore(); // Initialisation du store

const items = [
  { title: t('auth.login') },
  { title: t('auth.register') },
]

// Fonction pour ouvrir la popup de login
const openLoginDialog = () => {
  commonStore.dialogs.login = true;
}
</script>

<template>
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="secondary"
          v-bind="props"
        >
          {{ t('auth.menu') }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title
            @click="index === 0 ? openLoginDialog() : null"
          >
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>