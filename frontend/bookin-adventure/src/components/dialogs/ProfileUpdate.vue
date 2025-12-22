<script lang="ts" setup>
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import UserForm from '@/components/UserForm.vue'
import type { RegisterPayload } from '@/interfaces/payload/RegisterPayload'
import { useToastersStore } from '@/stores/toasters'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import { computed } from 'vue'
const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()
const toastersStore = useToastersStore()
const userProfile = computed(() => userStore.user);


const onSubmit = async (formData: any, type: string) => {
  let payload: RegisterPayload
  if (type === 'pro') {
    payload = {
      email: formData.email,
      password: formData.password,
      lastName: formData.lastName,
      firstName: formData.firstName,
      phone: formData.phone,
      role: 'pro',
      companyName: formData.companyName,
      companyAddress: formData.companyAddress,
      birthDate: formData.birthDate
    }
  } else {
    payload = {
      email: formData.email,
      password: formData.password,
      lastName: formData.lastName,
      firstName: formData.firstName,
      role: 'client',
      phone: formData.phone,
      birthDate: formData.birthDate
    }
  }
  await userStore.update(payload);

  if (!userStore.error) {
    commonStore.dialogs.profileUpdate = false;
  } else {
    toastersStore.addToaster({
      title: t('toasters.register_error_title'),
      content: userStore.error,
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
  }
}

</script>
<template>
    <v-dialog v-model="commonStore.dialogs.profileUpdate" max-width="600">
        <v-card>
            <v-card-title>{{ t('dialogs.profile_update.title') }}</v-card-title>
            <v-card-text>
                <UserForm mode="edit" :initial="userProfile" :onSubmit="onSubmit" />
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="commonStore.dialogs.profileUpdate = false">{{ t('dialogs.profile_update.cancel') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>