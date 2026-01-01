<script setup lang="ts">
import { useCommonStore } from '@/stores/common.store';
import { useUserStore } from '@/stores/user.store';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { t } = useI18n()
const commonStore = useCommonStore();
const userStore = useUserStore();
const router = useRouter();

const updatePassword = async () => {
    if(!userStore.user?.email) return;
    await userStore.passwordRequestCode(userStore.user?.email)
    router.push({ path: '/verify-otp', query: { verificationType: 'password' } })
}
</script>
<template>
    <v-card class="ma-4">
        <v-card-title>{{ t('userPassword.title') }}</v-card-title>
        <v-card-text>
            <p>{{ t('userPassword.password') }} : ******</p>          
        </v-card-text>
        <v-card-actions>
            <v-btn @click="updatePassword" color="primary">
                {{ t('userPassword.edit') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>