<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserForm } from '@/composables/useUserForm'
import type { User } from '@/interfaces/User';
import { formatISO, parse, format, parseISO } from 'date-fns';
import AddressInput from './AddressInput.vue';


const props = defineProps<{
  mode: 'register' | 'edit' | 'pro-client',
  initial?: User, // initial form data for edit mode
  loading?: boolean,
  error?: string,
  onSubmit: (payload: any, type: string) => Promise<void>
}>()

const { t } = useI18n()
const { type, form, rules, onBirthDateInput } = useUserForm(props.initial)


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

const birthDateProxy = computed({
  get: () => birthDateDisplay.value,
  set: (val: string) => onBirthDateInput(val, birthDateDisplay, form)
})



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
        v-model="birthDateProxy"
        :label="t('register.legal_birthDate')"
        :rules="[rules.required, rules.birthDate]"
        placeholder="JJ/MM/AAAA"
        required
      />   
      <v-text-field v-model="form.phone" :label="t('register.legal_phone')" :rules="[rules.required]" required />      
    </template>
    <template v-else>
      <v-text-field v-model="form.lastName" :label="t('register.lastName')" :rules="[rules.required, rules.name]" required />
      <v-text-field v-model="form.firstName" :label="t('register.firstName')" :rules="[rules.required, rules.name]" required />
      <v-text-field
        v-model="birthDateProxy"
        :label="t('register.birthDate')"
        :rules="[rules.required, rules.birthDate]"
        placeholder="JJ/MM/AAAA"
        required
      />         
      <v-text-field v-model="form.phone" :label="t('register.phone')" :rules="[rules.required]" required />
    </template>
 
    

    <template v-if="type === 'pro'">
      <v-text-field v-model="form.companyName" :label="t('register.companyName')" :rules="[rules.required]" required />
      <AddressInput 
        :initial="props.initial"
        v-model="form.companyAddress" 
      />
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
