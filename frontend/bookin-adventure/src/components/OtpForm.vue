<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const formRefVerify = ref();
import { useUserStore } from '@/stores/user.store';
import { watch } from 'vue';
import router from '@/plugins/router';
import { useCommonStore } from '@/stores/common.store';

import { ToasterLevel } from '@/interfaces/ToasterLevel';
const userStore = useUserStore();
const commonStore = useCommonStore();
const otp = ref('');
const isResending = ref(false);

const OTP_LENGTH = 6; // adapte selon ton besoin

const props = defineProps<{
  type: 'password' | 'account' | 'email';
  newEmail?: string;
  password?: string;
}>();




const submit = async () => {
if(props.type === 'account') {
  console.log('Submitting account verification code:', otp.value);
    await handleAccountVerification();
  } else if (props.type === 'password') {
    await handlePasswordConfirmCode();
  } else if (props.type === 'email') {
    await handleEmailConfirmCode();
  }
};

const handleAccountVerification = async () => {
  try {
    console.log('----handleAccountVerification', otp.value);
    const response = await userStore.verifyAccount(otp.value);
    if (response?.user.isVerified) {
      router.push('/client-profile');
      commonStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.register_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })       
    }else{
      console.log('Account verification failed:', response);
    }
  } catch (err: any) {
    console.log('Error during account verification:', err);
    commonStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters.errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: true,
    });
  }
};

const handlePasswordConfirmCode = async () => {
  try {
    const response = await userStore.passwordConfirmCode(userStore.user?.email || '', otp.value);
    if (response?.success) {
      router.push({ name: 'client-profile', query: { showPasswordUpdate: 'false' } })
      commonStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.password_update_code_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })       
    } 
  } catch (err: any) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters.errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: true,
    });
  }
};


const handleEmailConfirmCode = async () => {
  try {
    console.log('Submitting email confirm code:', otp.value);
    const response = await userStore.emailConfirmCode(otp.value);
    if (response?.success) {
      router.push({ name: 'client-profile', query: { showEmailUpdate: 'false' } });
      commonStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.email_update_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })       
    } 
  } catch (err: any) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters.errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: true,
    });
  }
};


const cancel = () => {
  if(props.type === 'account') {
    router.push({ name: 'client-profile' });
  }else if (props.type === 'password') {
    console.log('cancel password reset');
    router.replace({ name: 'client-profile', query: { showPasswordUpdate: 'false' } });
  }else if (props.type === 'email') {
    router.push({ path: '/client-profile', query: { showEmailUpdate: 'false' } });
  }
  
};

const resendCode = async () => {
  isResending.value = true;
  try {
    if (props.type === 'account') {
      await userStore.resendVerificationCode(userStore.user?.email || '');
      commonStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.code_resent'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 5,
      });
    } else if (props.type === 'password') {
      await userStore.passwordRequestCode(userStore.user?.email || '');
      commonStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.code_resent'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 5,
      });
    }
  } catch (err: any) {
    commonStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters.errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: true,
    });
  } finally {
    isResending.value = false;
  }
};

// Surveille la valeur de l'OTP
watch(otp, (val) => {
  if (val.length === OTP_LENGTH) {
    submit();
  }
});
</script>

<template>
<v-card>
    <v-card-title>
      <span v-if="props.type === 'account'">{{ t('verifyAccount.title') }}</span>
      <span v-else-if="props.type === 'email'">{{ t('emailUpdate.verifyTitle') }}</span>
      <span v-else>{{ t('passwordReset.verifyTitle') }}</span>
    </v-card-title>
    <v-card-text>
      <span v-if="props.type === 'account'">{{ t('verifyAccount.instruction') }}</span>
      <span v-else-if="props.type === 'email'">{{ t('emailUpdate.verifyInstruction') }}</span>
      <span v-else>{{ t('passwordReset.verifyInstruction') }}</span>
    <v-form ref="formRefVerify">
        <v-otp-input v-model="otp" focus-all></v-otp-input>
    </v-form>  
    </v-card-text>  
    <v-card-actions>
        <v-btn v-if="type !== 'email'" color="secondary" variant="text" @click="resendCode" :loading="isResending">
          {{ t('common.resend_code') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">{{ t('common.cancel') }}</v-btn>
    </v-card-actions>
</v-card>

</template>
