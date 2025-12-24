<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
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

function login() {
  // Ajoute ici la logique de connexion
  userStore.login({ email: email.value, password: password.value })
  open.value = false
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
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="login">{{ $t('dialogs.login.submit') }}</v-btn>
        <v-btn text @click="open = false">{{ $t('dialogs.login.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>