<script lang="ts" setup>
import { useCommonStore } from '@/stores/common.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import UserForm from '@/components/UserForm.vue'
import { useToastersStore } from '@/stores/toasters.store'
import { ToasterLevel } from '@/interfaces/ToasterLevel'
import { computed } from 'vue'
import { useRegisterPayload } from '@/composables/useRegisterPayload'

const { t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()
const toastersStore = useToastersStore()
const userProfile = computed(() => userStore.user);
const { buildRegisterPayload } = useRegisterPayload();


const onSubmit = async (formData: any, type: string) => {
  const payload = buildRegisterPayload(formData, type);
  try {
    await userStore.update(payload);
    commonStore.dialogs.profileUpdate = false;
    toastersStore.addToaster({
      title: t('toasters.success'),
      content: t('toasters.content.profile_update_success'),
      level: ToasterLevel.SUCCESS,
      lifeTime: 10,
      showMoreInfoButton: false,
    })    
  } catch (err:any) {
    toastersStore.addToaster({
      title: t('toasters.register_error_title'),
       content: t('backend.' + err?.response.data.error)  || t('toasters.content.error.common'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: false,
    })
  }
}

</script>
<template>

        <v-card>
            <v-card-title>{{ t('dialogs.profile_update.title') }}</v-card-title>
            <v-card-text>
                <UserForm mode="edit" :initial="userProfile" :onSubmit="onSubmit" />
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="commonStore.dialogs.profileUpdate = false">{{ t('dialogs.profile_update.cancel') }}</v-btn>
            </v-card-actions>
        </v-card>

</template>