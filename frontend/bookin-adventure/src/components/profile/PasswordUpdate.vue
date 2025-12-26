<script lang="ts" setup>
import router from '@/plugins/router';
import { useCommonStore } from '@/stores/common.store';
import { useUserStore } from '@/stores/user.store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formRefPassword = ref();
const commonStore = useCommonStore();
const userStore = useUserStore();

// Ajoute ces variables pour lier les champs
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const submit = async () => {    
    const response = await userStore.passwordConfirm(currentPassword.value, newPassword.value);
    if (response?.success) {
        //TODO message de succès
        router.push( { name: 'client-profile', query: { showPasswordUpdate: 'false' } });
    } else {
        console.error('Error updating password:', userStore.error);
    }

};

const cancel = () => {
    router.replace({ query: { showPasswordUpdate: 'false' } });
};
</script>

<template>

<v-card class="ma-4">
    <v-card-title>{{ t('userPasswordUpdate.title') }}</v-card-title>
    <v-card-text>
    <v-form ref="formRefPassword" @submit.prevent="submit">
        <v-text-field
            label="Current Password"
            type="password"
            v-model="currentPassword"
            required/>
        <v-text-field
            label="New Password"
            type="password"
            v-model="newPassword"
            required/>
        <v-text-field
            label="Confirm New Password"
            type="password"
            v-model="confirmNewPassword"
            required/>
    </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>       
        <v-btn :loading="false" color="primary" @click="submit">{{ t('userPasswordUpdate.submit') }}</v-btn>
        <v-btn @click="cancel">{{ t('userPasswordUpdate.cancel') }}</v-btn>
    </v-card-actions>
</v-card>

</template>