<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<template>
    <v-toolbar-title><v-btn variant="plain" :to="{ path: '/' }" >{{ t('App.title') }}</v-btn></v-toolbar-title>
</template>