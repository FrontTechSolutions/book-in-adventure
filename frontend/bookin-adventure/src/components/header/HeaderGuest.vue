<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AuthMenu from './AuthMenu.vue';
import HeaderTitle from './HeaderTitle.vue';

const { t } = useI18n();
</script>
<template>
    <v-app-bar color="primary">        
        <HeaderTitle />
        <AuthMenu />
    </v-app-bar>
</template>