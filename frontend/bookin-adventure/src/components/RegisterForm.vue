<script lang="ts" setup>

import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { RegisterPayload } from '@/interfaces/payload/RegisterPayload'
import { useToastersStore } from '@/stores/toasters';
const toastersStore = useToastersStore();
const { t } = useI18n()

const userStore = useUserStore()
const router = useRouter()

const type = ref<'client' | 'pro' | 'invite'>('client')
const form = ref<any>({
  email: '',
  password: '',
  lastName: '',
  firstName: '',
  phone: '',
  // Pro fields
  companyName: '',
  companyAddress: '',
  // Optionals
  birthDate: '',
  logo: '',
})

const rules = {
  required: (v: any) => !!v || t('register.required'),
  email: (v: string) => /.+@.+\..+/.test(v) || t('register.email_invalid'),
  password: (v: string) => v.length >= 6 || t('register.password_min'),
  name: (v: string) => {
    if (!v || v.length < 2) return t('register.name_min')
    if (/\d/.test(v)) return t('register.name_no_digits')
    return true
  },
  birthDate: (v: string) => {
    if (!v) return t('register.required')
    const birth = new Date(v)
    const now = new Date()
    const age = now.getFullYear() - birth.getFullYear() - (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate()) ? 1 : 0)
    if (age < 18) return t('register.age_min')
    return true
  }
}

import { ref as vueRef } from 'vue'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
const formRef = vueRef()

const onSubmit = async () => {
  // Validation du formulaire (Vuetify 3 : validate() retourne { valid })
  const result = await formRef.value?.validate?.()
  if (!result || result.valid === false) return
  let payload: RegisterPayload
  if (type.value === 'pro') {
    payload = {
      email: form.value.email,
      password: form.value.password,
      lastName: form.value.lastName,
      firstName: form.value.firstName,
      phone: form.value.phone,
      role: 'pro',
      companyName: form.value.companyName,
      companyAddress: form.value.companyAddress,
    }
  } else {
    payload = {
      email: form.value.email,
      password: form.value.password,
      lastName: form.value.lastName,
      firstName: form.value.firstName,
      role: 'client',
      phone: form.value.phone,
      birthDate: form.value.birthDate
    }
  }
  await userStore.register(payload)
  if (!userStore.error) {
    router.push('/')
  }
}

if(userStore.error){
    toastersStore.addToaster({
        title: t('toasters.register_error_title'),
        content: userStore.error,
        level: ToasterLevel.ERROR,
        lifeTime: 10,
        showMoreInfoButton: false,
    });
}
</script>

<template>
  <v-card class="mx-auto my-8" max-width="500">
    <v-card-title>{{ t('register.title') }}</v-card-title>
    <v-card-text>
      <v-btn-toggle v-model="type" class="mb-4" mandatory>
        <v-btn value="client">{{ t('register.client') }}</v-btn>
        <v-btn value="pro">{{ t('register.pro') }}</v-btn>
      </v-btn-toggle>
      <v-form ref="formRef" @submit.prevent="onSubmit">
        <v-text-field v-model="form.email" :label="t('register.email')" :rules="[rules.required, rules.email]" required />
        <v-text-field v-model="form.password" :label="t('register.password')" type="password" :rules="[rules.required, rules.password]" required />
        <template v-if="type === 'pro'">
          <v-text-field v-model="form.lastName" :label="t('register.legal_lastName')" :rules="[rules.required, rules.name]" required />
          <v-text-field v-model="form.firstName" :label="t('register.legal_firstName')" :rules="[rules.required, rules.name]" required />
        </template>
        <template v-else>
          <v-text-field v-model="form.lastName" :label="t('register.lastName')" :rules="[rules.required, rules.name]" required />
          <v-text-field v-model="form.firstName" :label="t('register.firstName')" :rules="[rules.required, rules.name]" required />
        </template>
        <v-text-field v-model="form.phone" :label="t('register.phone')" :rules="[rules.required]" required />
        <v-text-field v-model="form.birthDate" :label="t('register.birthDate')" type="date" :rules="[rules.required, rules.birthDate]" required />
        <template v-if="type === 'pro'">
          <v-text-field v-model="form.companyName" :label="t('register.companyName')" :rules="[rules.required]" required />
          <v-text-field v-model="form.companyAddress" :label="t('register.companyAddress')" :rules="[rules.required]" required />
        </template>
        <v-alert v-if="userStore.error" type="error" class="mt-2">{{ userStore.error }}</v-alert>
        <v-btn :loading="userStore.loading" type="submit" color="primary" class="mt-4" block>{{ t('register.submit') }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-btn-toggle {
  display: flex;
  justify-content: center;
}
</style>
