<script lang="ts" setup>
import { computed } from 'vue';
import HeaderConnected from './HeaderConnected.vue';
import HeaderGuest from './HeaderGuest.vue';
import { useUserStore } from '@/stores/user.store';
const userStore = useUserStore();   
const isLoggedIn = computed(() => userStore.isLoggedIn);

</script>
<template>
    <HeaderConnected v-if="isLoggedIn"/>
    <HeaderGuest v-else />
</template>