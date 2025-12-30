<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const formRefVerify = ref();
import { useUserStore } from '@/stores/user.store';
import { watch } from 'vue';
import router from '@/plugins/router';
import { useCommonStore } from '@/stores/common.store';
import { useToastersStore } from '@/stores/toasters.store';
import { ToasterLevel } from '@/interfaces/ToasterLevel';
const userStore = useUserStore();
const commonStore = useCommonStore();
const toastersStore = useToastersStore();

const otp = ref('');

const OTP_LENGTH = 6; // adapte selon ton besoin

const props = defineProps<{
  type: 'password' | 'account' | 'email';
}>();


const genrateCode = async () => {
  if(!userStore.user?.email) return;
   await userStore.passwordRequestCode(userStore.user?.email)
};

const submit = async () => {
if(props.type === 'account') {
    await handleAccountVerification();
  } else if (props.type === 'password') {
    await handlePasswordConfirmCode();
  } else if (props.type === 'email') {
    await handleEmailConfirmCode();
  }
};

const handleAccountVerification = async () => {
  try {
    const response = await userStore.verifyAccount(otp.value);
    if (response?.user.isVerified) {
      router.push('/client-profile');
      toastersStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.register_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })       
    } 
  } catch (err: any) {
    toastersStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters..errorCommon'),
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
      toastersStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.password_update_code_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })       
    } 
  } catch (err: any) {
    toastersStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters..errorCommon'),
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
      router.push('/client-profile');
      toastersStore.addToaster({
        title: t('toasters.success'),
        content: t('toasters.content.email_update_success'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 10,
        showMoreInfoButton: false,
      })       
    } 
  } catch (err: any) {
    toastersStore.addToaster({
      title: t('toasters.error'),
      content: userStore.error || t('toasters..errorCommon'),
      level: ToasterLevel.ERROR,
      lifeTime: 10,
      showMoreInfoButton: true,
    });
  }
};


const cancel = () => {
  if(props.type === 'account') {
    router.push({ path: '/' });
  }else{
    console.log('cancel password reset');
    router.replace({ name: 'client-profile', query: { showPasswordUpdate: 'false' } });
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
        {{ props.type === 'account' ? t('verifyAccount.title') : t('passwordReset.verifyTitle') }}
    </v-card-title>
    <v-card-text>
        {{ props.type === 'account' ? t('verifyAccount.instruction') : t('passwordReset.verifyInstruction') }}
    <v-form ref="formRefVerify">
        <v-otp-input v-model="otp" focus-all></v-otp-input>
    </v-form>  
    </v-card-text>  
    <v-card-actions>
        <v-btn color="primary" @click="genrateCode">TODO généré un nouveau code</v-btn>
        <v-btn  @click="cancel">cancel</v-btn>
    </v-card-actions>
</v-card>

</template>
