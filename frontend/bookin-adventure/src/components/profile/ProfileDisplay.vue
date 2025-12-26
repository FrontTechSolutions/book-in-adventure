<script lang="ts" setup>
import type { User } from '@/interfaces/User';
import { useCommonStore } from '@/stores/common.store';
import { useUserStore } from '@/stores/user.store';
import { computed, onMounted,  } from 'vue';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()
const userStore = useUserStore();
const commonStore = useCommonStore();
const userProfile = computed<User | undefined>(() => userStore.user ?? undefined);
const role = userStore.getRole();    
onMounted(async () => { //TODO mettre dans un try catch avec toaster
    await userStore.loadUser();
});
</script>
<template>
    <v-card class="ma-4">
        <v-card-title>Profile View</v-card-title>
        <v-card-text>
            <p>{{ t('userProfile.fields.lastName') }} : {{ userProfile?.lastName }}</p>
            <p>{{ t('userProfile.fields.firstName') }} : {{ userProfile?.firstName }}</p>            
            <p>{{ t('userProfile.fields.email') }} : {{ userProfile?.email }}</p>
            <p>{{ t('userProfile.fields.phone') }} : {{ userProfile?.phone }}</p>
            <p>{{ t('userProfile.fields.birthDate') }} : {{ userProfile?.birthDate }}</p>

            <!-- <v-sheet v-if="role === 'pro'">
                <p v-if="userProfile?.birthDate">{{ t('userProfile.fields.birthDate') }} : {{ userProfile?.birthDate }}</p>
                <p v-if="userProfile?.companyName">{{ t('userProfile.fields.companyName') }} : {{ userProfile?.companyName }}</p>
                <p v-if="userProfile?.companyAddress">{{ t('userProfile.fields.companyAddress') }} : {{ userProfile?.companyAddress }}</p>
            </v-sheet> -->            
        </v-card-text>
        <v-card-actions>
            <v-btn @click="$emit('edit', true)" color="primary">
                {{ t('userProfile.edit') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>