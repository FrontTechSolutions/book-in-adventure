<script lang="ts" setup>

import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import UserForm from '@/components/UserForm.vue'
import { useToastersStore } from '@/stores/toasters.store'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import { computed } from 'vue'
import { useRegisterPayload } from '@/composables/useRegisterPayload'




const { t } = useI18n()
const userStore = useUserStore()
const toastersStore = useToastersStore()
const userProfile = computed(() => userStore.user);
const { buildRegisterPayload } = useRegisterPayload();


const emit = defineEmits(['close'])


const onSubmit = async (formData: any, type: string) => {
  const payload = buildRegisterPayload(formData, type);
  try {
    await userStore.update(payload);
    emit('close');
    toastersStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.profile_update_success'),
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
  <v-card class="ma-4">
      <v-card-title>{{ t('userProfileUpdate.title') }}</v-card-title>
      <v-card-text>
          <UserForm mode="edit" :initial="userProfile" :onSubmit="onSubmit">
            <template #actions>
              <v-card-actions>
                <v-btn :loading="false" type="submit" color="primary">
                  {{ t('userProfileUpdate.submit') }}
                </v-btn>
                <v-btn @click="emit('close')">{{ t('userProfileUpdate.cancel') }}</v-btn>
              </v-card-actions>
            </template>
          </UserForm>
      </v-card-text>
  </v-card>
</template>