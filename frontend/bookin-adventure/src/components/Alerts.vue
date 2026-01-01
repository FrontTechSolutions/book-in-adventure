<script setup lang="ts">
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()
const router = useRouter()

const closeAlert = (id: string) => {
  commonStore.removeAlert(id)
}

const goToVerification = () => {
    console.log('click')
  router.push({ name: 'verify-otp' })
}

const VERIFY_ACCOUNT_ALERT_ID = 'verify-account-alert'

const shouldShowVerificationAlert = computed(() => {
  return !userStore.isVerifiedAccount && userStore.isLoggedIn
})

watchEffect(() => {
  if (shouldShowVerificationAlert.value) {
    // Vérifie si l'alerte n'existe pas déjà
    const alertExists = commonStore.alerts.some(a => a.id === VERIFY_ACCOUNT_ALERT_ID)
    if (!alertExists) {
      commonStore.addAlert({
        id: VERIFY_ACCOUNT_ALERT_ID,
        title: t('alerts.verify_account.title'),
        text: t('alerts.verify_account.text'),
        type: 'error',
      })
    }
  } else {
    // Supprime l'alerte si l'utilisateur se déconnecte ou vérifie son compte
    commonStore.removeAlert(VERIFY_ACCOUNT_ALERT_ID)
  }
})

</script>
    
<template>
  <div v-if="commonStore.alerts.length > 0" class="alerts-container">
    <v-alert
      v-for="alert in commonStore.alerts"
      :key="alert.id"
      :title="alert.title"
      :type="alert.type"
      closable
      @click:close="closeAlert(alert.id ?? '')"
    >
      <template v-if="alert.id === 'verify-account-alert'">
        <i18n-t keypath="alerts.verify_account.text" tag="div">
          <template #link>
            <a href="#" class="alert-link" @click.prevent="goToVerification">{{ t('alerts.verify_account.link') }}</a>
          </template>
        </i18n-t>
      </template>
      <template v-else>
        {{ alert.text }}
      </template>
    </v-alert>
  </div>
</template>

<style scoped>
.alerts-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.alert-link {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
}

.alert-link:hover {
  text-decoration: none;
}
</style>
