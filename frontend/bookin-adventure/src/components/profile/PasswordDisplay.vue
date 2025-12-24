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
    router.push({ path: '/verify-account', query: { verificationType: 'password' } })
}
</script>
<template>
        <v-card class="ma-4">
        <v-card-title>{{ t('userPassword.title') }}</v-card-title>
        <v-card-text>
            <p>{{ t('userPassword.password') }} : ******</p>
            <!-- <v-sheet v-if="role === 'pro'">
                <p v-if="userProfile?.birthDate">{{ t('userProfile.fields.birthDate') }} : {{ userProfile?.birthDate }}</p>
                <p v-if="userProfile?.companyName">{{ t('userProfile.fields.companyName') }} : {{ userProfile?.companyName }}</p>
                <p v-if="userProfile?.companyAddress">{{ t('userProfile.fields.companyAddress') }} : {{ userProfile?.companyAddress }}</p>
            </v-sheet> -->            
        </v-card-text>
        <v-card-actions>
            <v-btn @click="updatePassword" color="primary">
                {{ t('userPassword.edit') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>