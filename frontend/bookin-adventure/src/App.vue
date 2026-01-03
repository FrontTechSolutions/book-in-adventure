<script setup lang="ts">
import { onMounted } from 'vue'
import Dialogs from '@/components/dialogs/Dialogs.vue';
import ToastersQueue from '@/components/toaster/ToastersQueue.vue';
import { useDisplay } from 'vuetify'
import Header from './components/header/Header.vue';
import { useUserStore } from './stores/user.store';
import Alerts from './components/Alerts.vue';
import { useCommonStore } from './stores/common.store';
import { v } from 'vue-router/dist/router-CWoNjPRp.mjs';

const userStore = useUserStore();
const commonStore = useCommonStore();
const { xs, mdAndUp } = useDisplay();

console.log('App setup', xs.value, mdAndUp.value);

onMounted(() => {
  console.log('App mounted');
  userStore.loadFromStorage();
});

</script>

<template>
  <v-app :class="{'mobile': xs, 'desktop': mdAndUp}">
    
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
    .mobile{
      min-width: 300px;
    }
    .desktop{
      min-width: 1024px;
    }
    min-height: 100vh;
    padding: 0rem;
    
  }

</style>
