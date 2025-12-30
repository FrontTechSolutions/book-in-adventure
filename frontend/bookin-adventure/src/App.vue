<script setup lang="ts">
import { onMounted } from 'vue'
import Dialogs from '@/components/dialogs/Dialogs.vue';
import ToastersQueue from '@/components/toaster/ToastersQueue.vue';
import { useToastersStore } from '@/stores/toasters.store';
import Header from './components/header/Header.vue';
import { useUserStore } from './stores/user.store';
const toastersStore = useToastersStore();
const userStore = useUserStore();
onMounted(() => {
  console.log('App mounted');
  userStore.loadFromStorage();
});

</script>

<template>
  <v-app>
    <toasters-queue />
      <v-card class="content">
        <v-layout>
          <Header />
          <v-main style="height: 800px">
            <router-view :key="$route.fullPath" />
          </v-main>                    
        </v-layout>
      </v-card>
      <Dialogs/>
  </v-app>
</template>
<style lang="scss">
  #app{
    min-height: 100vh;
    padding: 0.5rem;

    .content{
          min-height: inherit;
    }
  }
</style>
