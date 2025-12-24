<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserForm } from '@/composables/useUserForm'
import type { User } from '@/interfaces/User';


const props = defineProps<{
  mode: 'register' | 'edit' | 'pro-client',
  initial?: User, // initial form data for edit mode
  loading?: boolean,
  error?: string,
  onSubmit: (payload: any, type: string) => Promise<void>
}>()

const { t } = useI18n()
const { type, form, rules } = useUserForm(props.initial)
const formRef = ref()

const submit = async () => {
  const result = await formRef.value?.validate?.()
  if (!result || result.valid === false) return
  await props.onSubmit({ ...form.value }, type.value)
}
</script>

<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-btn-toggle v-if="props.mode === 'register'" v-model="type" class="mb-4" mandatory>
      <v-btn value="client">{{ t('register.client') }}</v-btn>
      <v-btn value="pro">{{ t('register.pro') }}</v-btn>
    </v-btn-toggle>
    <v-text-field v-model="form.email" :label="t('register.email')" :rules="[rules.required, rules.email]" :disabled="props.mode === 'edit'" required />
    <template v-if="props.mode !== 'pro-client' && props.mode !== 'edit'">
      <v-text-field v-model="form.password" :label="t('register.password')" type="password" :rules="[rules.required, rules.password]" required />
    </template>
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
    <!-- <v-alert v-if="props.error" type="error" class="mt-2">{{ props.error }}</v-alert> -->
    <v-btn :loading="props.loading" type="submit" color="primary" class="mt-4" block>
      {{ props.mode === 'register' ? t('register.submit') : t('edit.submit') }}
    </v-btn>
  </v-form>
</template>

<style scoped>
.v-btn-toggle {
  display: flex;
  justify-content: center;
}
</style>
