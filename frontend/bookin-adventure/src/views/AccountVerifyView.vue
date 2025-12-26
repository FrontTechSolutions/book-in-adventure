<script lang="ts" setup>
import OtpForm from '@/components/OtpForm.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const allowedTypes = ['account', 'password', 'email'];
let verificationType: 'account' | 'password' | 'email' = 'account';
if (typeof route.query.verificationType === 'string' && allowedTypes.includes(route.query.verificationType)) {
  verificationType = route.query.verificationType as 'account' | 'password' | 'email';
}
</script>

<template>
  <otp-form :type="verificationType || 'account'"></otp-form>
</template>
