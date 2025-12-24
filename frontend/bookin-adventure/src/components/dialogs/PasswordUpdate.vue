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
    console.log('Submitting password update form', currentPassword.value, newPassword.value, confirmNewPassword.value);
    const response = await userStore.passwordConfirm(currentPassword.value, newPassword.value);
    if (response?.success) {
        commonStore.dialogs.passwordUpdate = false;
        //TODO message de succès
        router.push('/client-profile');
    } else {
        console.error('Error updating password:', userStore.error);
    }

};
</script>

<template>
    <v-dialog v-model="commonStore.dialogs.passwordUpdate" max-width="600">
        <v-card>
            <v-card-title>{{ t('userPassword.title') }}</v-card-title>
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
                <v-btn text @click="commonStore.dialogs.passwordUpdate = false">{{ t('common.cancel') }}</v-btn>
                <v-btn color="primary" @click="submit">{{ t('common.submit') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>