<script lang="ts" setup>
import { ToasterLevel } from '@/interfaces/ToasterLevel';
import router from '@/plugins/router';
import { useCommonStore } from '@/stores/common.store';
import { useToastersStore } from '@/stores/toasters.store';
import { useUserStore } from '@/stores/user.store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formRefPassword = ref();
const commonStore = useCommonStore();
const userStore = useUserStore();
const toastersStore = useToastersStore();

// Ajoute ces variables pour lier les champs
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const submit = async () => {
    try {
        const response = await userStore.passwordConfirm(currentPassword.value, newPassword.value);
        if (response?.success) {
            router.push({ name: 'client-profile', query: { showPasswordUpdate: 'false' } });
            toastersStore.addToaster({
            title: t('toasters.success'),
            content: t('toasters.content.password_update_success'),
            level: ToasterLevel.SUCCESS,
            lifeTime: 10,
            showMoreInfoButton: false,
            })             
        }        
    } catch (err: any) {
        toastersStore.addToaster({
        title: t('toasters.register_error_title'),
        content: t('backend.' + err?.response.data.error)  || t('toasters.content.error.common'),
        level: ToasterLevel.ERROR,
        lifeTime: 10,
        showMoreInfoButton: false,
        })
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