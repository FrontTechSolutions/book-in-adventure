<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user.store';
import router from '@/plugins/router';
const { t } = useI18n();
const userStore = useUserStore();
  const items = [
   { title: t('auth.logout') },
  ]

  const logout = () => {    
    userStore.logout();
    router.push('/');
  }
</script>


<template>
  <div class="text-center">
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title @click="logout">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>