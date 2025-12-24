<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const formRefVerify = ref();
import { useUserStore } from '@/stores/user.store';
import { watch } from 'vue';
import router from '@/plugins/router';
import { useCommonStore } from '@/stores/common.store';
const userStore = useUserStore();
const commonStore = useCommonStore();
const otp = ref('');

const OTP_LENGTH = 6; // adapte selon ton besoin

const props = defineProps<{
  type: 'password' | 'account';
}>();


const genrateCode = async () => {
  if(!userStore.user?.email) return;
   await userStore.passwordRequestCode(userStore.user?.email)
};

onMounted(async () => {
  // if(props.type === 'password' && userStore.user?.email){
  //   genrateCode();
  // }
});


const submit = async () => {
if(props.type === 'account') {
    await handleAccountVerification();
  } else if (props.type === 'password') {
    await handlePasswordConfirmCode();
  }
};

const handleAccountVerification = async () => {
  const response = await userStore.verifyAccount(otp.value);
  if (response?.user.isVerified) {
    // Rediriger ou afficher un message de succès
    router.push('/client-profile');
  } else {
    // Gérer les erreurs
    console.error(userStore.error);
  }
};

const handlePasswordConfirmCode = async () => {
  const response = await userStore.passwordConfirmCode(userStore.user?.email || '', otp.value);
  console.log('Response passwordConfirmCode:', response);
  if (response?.success) {
    // toto affiche le success et ouvre le dialog  
    commonStore.dialogs.passwordUpdate = true;
  } else {
    // Gérer les erreurs
    console.error(userStore.error);
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
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="genrateCode">TODO généré un nouveau code</v-btn> 
    </v-card-actions>
</v-card>

</template>
