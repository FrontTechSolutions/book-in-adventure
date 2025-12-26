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
const password = ref('');
const newEmail = ref('');

const submit = async () => {
    try {
        const response = await userStore.emailRequest(newEmail.value, password.value, );
        if (response?.success) {
            router.push({ path: '/verify-account', query: { verificationType: 'email' } });
            toastersStore.addToaster({
                title: t('toasters.info'),
                content: t('toasters.content.email_request_asked'),
                level: ToasterLevel.INFO,
                lifeTime: 10,
                showMoreInfoButton: false,
            })             
        }        
    } catch (err: any) {
        toastersStore.addToaster({
        title: t('toasters.error'),
        content: t('backend.' + err?.response.data.error)  || t('toasters..errorCommon'),
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
    <v-card-title>{{ t('userEmailUpdate.title') }}</v-card-title>
    <v-card-text>
    <v-form ref="formRefEmail" @submit.prevent="submit">
        <v-text-field
            label="New Email"
            type="email"
            v-model="newEmail"
            required/>
        <v-text-field
            label="Current Password"
            type="password"
            v-model="password"
            required/>            
    </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>       
        <v-btn :loading="false" color="primary" @click="submit">{{ t('userEmailUpdate.submit') }}</v-btn>
        <v-btn @click="cancel">{{ t('userEmailUpdate.cancel') }}</v-btn>
    </v-card-actions>
</v-card>

</template>