<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AuthMenu from './AuthMenu.vue';
import LogoutMenu from './LogoutMenu.vue';

const { t } = useI18n();
</script>
<template>
    <v-app-bar color="primary">        
        <v-toolbar-title>{{ t('App.title') }}</v-toolbar-title>
        <AuthMenu />
        <LogoutMenu />
    </v-app-bar>
</template>