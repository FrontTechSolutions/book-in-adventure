<script setup lang="ts">
import { onMounted } from 'vue'
import Dialogs from '@/components/dialogs/Dialogs.vue';
import ToastersQueue from '@/components/toaster/ToastersQueue.vue';

import Header from './components/header/Header.vue';
import { useUserStore } from './stores/user.store';
import Alerts from './components/Alerts.vue';
import { useCommonStore } from './stores/common.store';
import { v } from 'vue-router/dist/router-CWoNjPRp.mjs';

const userStore = useUserStore();
const commonStore = useCommonStore();

onMounted(() => {
  console.log('App mounted');
  userStore.loadFromStorage();
});

</script>

<template>
  <v-app>
    
    <toasters-queue />
      
        <v-layout>
          <Header />
          <v-main style="height: auto">
            <Alerts/>
              <router-view :key="$route.fullPath" />
          </v-main>                    
        </v-layout>

      <Dialogs/>


  </v-app>
</template>
<style lang="scss">
  #app{
    
    min-height: 100vh;
    padding: 0rem;

    .v-container {
      max-width: 1200px !important; 
      width: 100%;
      margin: 0 auto; /* Centre le bloc sur l'écran */
    }
  }

</style>
