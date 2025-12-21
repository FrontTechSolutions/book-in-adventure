<script lang="ts" setup>
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import UserForm from '@/components/UserForm.vue'
const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()
const userProfile = userStore.user;
</script>
<template>
    <v-dialog v-model="commonStore.dialogs.profileUpdate" max-width="600">
        <v-card>
            <v-card-title>{{ t('dialogs.profile_update.title') }}</v-card-title>
            <v-card-text>
                <UserForm mode="edit" :initial="userProfile" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="commonStore.dialogs.profileUpdate = false">{{ t('dialogs.profile_update.submit') }}</v-btn>
                <v-btn text @click="commonStore.dialogs.profileUpdate = false">{{ t('dialogs.profile_update.cancel') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>