<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import { useToastersStore } from '@/stores/toasters.store'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import UserForm from './UserForm.vue'
import type { RegisterPayload } from '@/interfaces/payload/UserPayloads'
const toastersStore = useToastersStore()
const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()



const onSubmit = async (formData: any, type: string) => {
  try {
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
    const result = await userStore.register(payload)
    if(result){
      toastersStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.register_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })
      router.push('/verify-account')
    }
  } catch (err: any) {
    console.log('Registration error:', err)
    console.log('Error message:', err?.message)
    console.log('Error response:', err?.response.data.error)
    toastersStore.addToaster({
      title: t('toasters.error'),
      content: t('backend.' + err?.response.data.error)  || t('toasters.content.error.common'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: true,
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
