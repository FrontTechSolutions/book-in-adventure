<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import { useToastersStore } from '@/stores/toasters'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import type { RegisterPayload } from '@/interfaces/payload/RegisterPayload'
import UserForm from './UserForm.vue'

const toastersStore = useToastersStore()
const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()



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
  await userStore.register(payload)
  if (!userStore.error) {
    router.push('/')
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
  <v-card class="mx-auto my-8" max-width="500">
    <v-card-title>{{ t('register.title') }}</v-card-title>
    <v-card-text>
      <UserForm
        mode="register"
        :loading="userStore.loading"
        :error="userStore.error"
        :onSubmit="onSubmit"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-btn-toggle {
  display: flex;
  justify-content: center;
}
</style>
