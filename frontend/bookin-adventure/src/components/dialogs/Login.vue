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
  get: () => commonStore.dialogs.login,
  set: (value: boolean) => {
    commonStore.dialogs.login = value
  }
})

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await userStore.login({ email: email.value, password: password.value })
    open.value = false
    commonStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.login_success'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 10,
      showMoreInfoButton: false,
    })    
  } catch (err:any) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: t('backend.' + err?.response.data.error)  || t('toasters.errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
  }
}

const openForgotPassword = () => {
  open.value = false
  commonStore.dialogs.forgotPassword = true
}
</script>

<template>
  <v-dialog v-model="open" width="400">
    <v-card>
      <v-card-title>{{ t('dialogs.login.title') }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          :label="t('dialogs.login.email')"
          type="email"
          required
        />
        <v-text-field
          v-model="password"
          :label="$t('dialogs.login.password')"
          type="password"
          required
        />
        <div class="text-right mt-2">
          <a href="#" class="forgot-password-link" @click.prevent="openForgotPassword">
            {{ $t('dialogs.login.forgot_password') }}
          </a>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="login">{{ $t('dialogs.login.submit') }}</v-btn>
        <v-btn text @click="open = false">{{ $t('dialogs.login.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.forgot-password-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-size: 0.875rem;
}

.forgot-password-link:hover {
  text-decoration: underline;
}
</style>