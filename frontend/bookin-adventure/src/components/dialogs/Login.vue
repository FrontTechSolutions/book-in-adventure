<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import { useToastersStore } from '@/stores/toasters.store'
const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()
const toastersStore = useToastersStore()

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
    toastersStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.login_success'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 10,
      showMoreInfoButton: false,
    })    
  } catch (err:any) {
    toastersStore.addToaster({
      title: t('toasters.error'),
      content: t('backend.' + err?.response.data.error)  || t('toasters..errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
  }
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