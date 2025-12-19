<script setup lang="ts">
import ToastersQueue from '@/components/toaster/ToastersQueue.vue';
import { useToastersStore } from '@/stores/toasters';
const toastersStore = useToastersStore();
</script>

<template>
  <v-app>
    <toasters-queue :model-value="toastersStore.toasters"/>
    <router-view />
  </v-app>
</template>
