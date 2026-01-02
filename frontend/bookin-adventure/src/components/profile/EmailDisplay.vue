<script lang="ts" setup>
import router from '@/plugins/router';
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
const userStore = useUserStore();
const { t } = useI18n()
const updateEmail = () => {
    router.push({ name: 'client-profile', query: { showEmailUpdate: 'true' } });
};
</script>
<template>
    <v-card>
        <v-card-title>{{ t('userEmail.title') }}</v-card-title>
        <v-card-text>
            <p>{{ t('userEmail.email') }} : {{ userStore.user?.email }}</p>          
        </v-card-text>
        <v-card-actions>
            <v-btn @click="updateEmail" color="primary">
                {{ t('userEmail.edit') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>