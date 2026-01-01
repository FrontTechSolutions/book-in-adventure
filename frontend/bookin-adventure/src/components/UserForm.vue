<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserForm } from '@/composables/useUserForm'
import type { User } from '@/interfaces/User';
import { formatISO, parse, format, parseISO } from 'date-fns';


const props = defineProps<{
  mode: 'register' | 'edit' | 'pro-client',
  initial?: User, // initial form data for edit mode
  loading?: boolean,
  error?: string,
  onSubmit: (payload: any, type: string) => Promise<void>
}>()

const { t } = useI18n()
const { type, form, rules } = useUserForm(props.initial)
console.log('form.value.birthDate:', form.value.birthDate)


const formRef = ref()

// birthDate affichée au format dd/MM/yyyy
const birthDateDisplay = ref('');
if (form.value.birthDate) {
  if (/^\d{4}-\d{2}-\d{2}T/.test(form.value.birthDate)) {
    birthDateDisplay.value = format(parseISO(form.value.birthDate), 'dd/MM/yyyy');
  } else {
    birthDateDisplay.value = form.value.birthDate;
  }
}

function onBirthDateInput(val: string) {
  birthDateDisplay.value = val;
  // Met à jour form.value.birthDate en ISO pour le backend
  if (val) {
    form.value.birthDate = formatISO(parse(val, 'dd/MM/yyyy', new Date()));
  } else {
    form.value.birthDate = undefined;
  }
}

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
      <v-text-field
        v-model="birthDateDisplay"
        :label="t('register.legal_birthDate')"
        :rules="[rules.required, rules.birthDate]"
        required
        @update:modelValue="onBirthDateInput"
      />   
      <v-text-field v-model="form.phone" :label="t('register.legal_phone')" :rules="[rules.required]" required />      
    </template>
    <template v-else>
      <v-text-field v-model="form.lastName" :label="t('register.lastName')" :rules="[rules.required, rules.name]" required />
      <v-text-field v-model="form.firstName" :label="t('register.firstName')" :rules="[rules.required, rules.name]" required />
      <v-text-field
        v-model="birthDateDisplay"
        :label="t('register.birthDate')"
        :rules="[rules.required, rules.birthDate]"
        required
        @update:modelValue="onBirthDateInput"
      />         
      <v-text-field v-model="form.phone" :label="t('register.phone')" :rules="[rules.required]" required />
    </template>
 
    

    <template v-if="type === 'pro'">
      <v-text-field v-model="form.companyName" :label="t('register.companyName')" :rules="[rules.required]" required />
      <v-text-field v-model="form.companyAddress" :label="t('register.companyAddress')" :rules="[rules.required]" required />
    </template>
    <!-- <v-alert v-if="props.error" type="error" class="mt-2">{{ props.error }}</v-alert> -->
    <slot name="actions" />
  </v-form>
</template>

<style scoped>
.v-btn-toggle {
  display: flex;
  justify-content: center;
}
</style>
