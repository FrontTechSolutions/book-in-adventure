<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import { useCommonStore } from '@/stores/common.store'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import UserForm from './UserForm.vue'
import { useRegisterPayload } from '@/composables/useRegisterPayload'

const { buildRegisterPayload } = useRegisterPayload();

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const commonStore = useCommonStore()


const onSubmit = async (formData: any, type: string) => {
  const payload = buildRegisterPayload(formData, type);
  try {
    await userStore.register(payload)
    router.push({ path: '/verify-otp', query: { verificationType: 'account' } })
    commonStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.register_success'),
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

</script>

<template>
  <v-card>
    <v-card-title>{{ t('register.title') }}</v-card-title>
    <v-card-text>
      <UserForm
        mode="register"
        :loading="userStore.loading"
        :error="userStore.error"
        :onSubmit="onSubmit"
      >
        <template #actions>
          <v-card-actions>
            <v-btn :loading="false" type="submit" color="primary">
              {{ t('register.submit') }}
            </v-btn>
            <v-btn text @click="router.push('/')">{{ t('register.cancel') }}</v-btn>
          </v-card-actions>
        </template>
    </UserForm>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-btn-toggle {
  display: flex;
  justify-content: center;
}
</style>
