<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import { ToasterLevel } from '@/interfaces/ToasterLevel'

const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()

const open = computed({
  get: () => commonStore.dialogs.forgotPassword,
  set: (value: boolean) => {
    commonStore.dialogs.forgotPassword = value
  }
})

const email = ref('')
const isLoading = ref(false)

const requestResetCode = async () => {
  if (!email.value) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: t('backend.error.email_required'),
      level: ToasterLevel.ERROR,
      lifeTime: 5,
      showMoreInfoButton: false,
    })
    return
  }

  isLoading.value = true
  try {
    await userStore.passwordRequestCode(email.value)
    open.value = false
    
    // Ouvre le dialog OTP
    commonStore.dialogs.resetPasswordOtp = true
    commonStore.resetPasswordEmail = email.value
    
    commonStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.reset_code_sent'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
  } catch (err: any) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: t('backend.' + err?.response?.data?.error) || t('toasters.errorCommon.common'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-dialog v-model="open" width="400">
    <v-card>
      <v-card-title>{{ t('dialogs.forgot_password.title') }}</v-card-title>
      <v-card-text>
        <p class="text-body-2 mb-4">
          {{ t('dialogs.forgot_password.description') }}
        </p>
        <v-text-field
          v-model="email"
          :label="t('dialogs.forgot_password.email')"
          type="email"
          required
          :disabled="isLoading"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn 
          color="primary" 
          :loading="isLoading"
          @click="requestResetCode"
        >
          {{ t('dialogs.forgot_password.submit') }}
        </v-btn>
        <v-btn text @click="open = false">
          {{ t('common.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
