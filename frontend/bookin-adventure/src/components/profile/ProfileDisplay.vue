<script lang="ts" setup>

import type { User } from '@/interfaces/User';
import { useCommonStore } from '@/stores/common.store';
import { useUserStore } from '@/stores/user.store';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { format, parseISO } from 'date-fns';


const { t } = useI18n()
const userStore = useUserStore();
const commonStore = useCommonStore();
const userProfile = computed<User | undefined>(() => userStore.user ?? undefined);

const formattedBirthDate = computed(() => {
    if (!userProfile.value?.birthDate) return '';
    try {
        return format(parseISO(userProfile.value.birthDate), 'dd/MM/yyyy');
    } catch {
        return userProfile.value.birthDate;
    }
});
const role = userStore.getRole();    
onMounted(async () => { //TODO mettre dans un try catch avec toaster
    await userStore.loadUser();
});
</script>
<template>
    <v-card>
        <v-card-title>Profile View</v-card-title>
        <v-card-text>
            <p>{{ t('userProfile.fields.lastName') }} : {{ userProfile?.lastName }}</p>
            <p>{{ t('userProfile.fields.firstName') }} : {{ userProfile?.firstName }}</p>            
            <p>{{ t('userProfile.fields.email') }} : {{ userProfile?.email }}</p>
            <p>{{ t('userProfile.fields.phone') }} : {{ userProfile?.phone }}</p>
            <p>{{ t('userProfile.fields.birthDate') }} : {{ formattedBirthDate }}</p>

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