<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import { ToasterLevel } from '@/interfaces/ToasterLevel'

const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()

const open = computed({
  get: () => commonStore.dialogs.resetPasswordOtp,
  set: (value: boolean) => {
    commonStore.dialogs.resetPasswordOtp = value
  }
})

const otp = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const step = ref<'otp' | 'password'>('otp')

const OTP_LENGTH = 6

const verifyCode = async () => {
  if (otp.value.length !== OTP_LENGTH) return

  isLoading.value = true
  try {
    await userStore.passwordConfirmCode(commonStore.resetPasswordEmail, otp.value)
    step.value = 'password'
    commonStore.addToaster({
      title: t('toasters.success'),
      content: t('backend.success.code_valid'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 5,
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

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: t('dialogs.reset_password_otp.password_mismatch'),
      level: ToasterLevel.ERROR,
      lifeTime: 5,
      showMoreInfoButton: false,
    })
    return
  }

  if (newPassword.value.length < 6) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: t('register.password_min'),
      level: ToasterLevel.ERROR,
      lifeTime: 5,
      showMoreInfoButton: false,
    })
    return
  }

  isLoading.value = true
  try {
    // Utilise passwordConfirm avec le code OTP stocké
    await userStore.passwordConfirm(newPassword.value, newPassword.value)
    open.value = false
    step.value = 'otp'
    otp.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    commonStore.resetPasswordEmail = ''
    
    commonStore.addToaster({
      title: t('toasters.success'),
      content: t('backend.success.password_updated'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
    
    // Ouvre le dialog de connexion
    commonStore.dialogs.login = true
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

const resendCode = async () => {
  isLoading.value = true
  try {
    await userStore.passwordRequestCode(commonStore.resetPasswordEmail)
    commonStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.code_resent'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 5,
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

watch(otp, (val) => {
  if (val.length === OTP_LENGTH && step.value === 'otp') {
    verifyCode()
  }
})
</script>

<template>
  <v-dialog v-model="open" width="400" persistent>
    <v-card>
      <v-card-title>
        {{ step === 'otp' ? t('dialogs.reset_password_otp.title_otp') : t('dialogs.reset_password_otp.title_password') }}
      </v-card-title>
      
      <v-card-text v-if="step === 'otp'">
        <p class="text-body-2 mb-4">
          {{ t('dialogs.reset_password_otp.description_otp', { email: commonStore.resetPasswordEmail }) }}
        </p>
        <v-otp-input
          v-model="otp"
          :length="OTP_LENGTH"
          :disabled="isLoading"
        />
        <div class="text-center mt-4">
          <v-btn
            variant="text"
            size="small"
            :disabled="isLoading"
            @click="resendCode"
          >
            {{ t('common.resend_code') }}
          </v-btn>
        </div>
      </v-card-text>

      <v-card-text v-else>
        <p class="text-body-2 mb-4">
          {{ t('dialogs.reset_password_otp.description_password') }}
        </p>
        <v-text-field
          v-model="newPassword"
          :label="t('dialogs.reset_password_otp.new_password')"
          type="password"
          :disabled="isLoading"
          required
        />
        <v-text-field
          v-model="confirmPassword"
          :label="t('dialogs.reset_password_otp.confirm_password')"
          type="password"
          :disabled="isLoading"
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="step === 'password'"
          color="primary"
          :loading="isLoading"
          @click="resetPassword"
        >
          {{ t('dialogs.reset_password_otp.submit') }}
        </v-btn>
        <v-btn text @click="open = false">
          {{ t('common.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
