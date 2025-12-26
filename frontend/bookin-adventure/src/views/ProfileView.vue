<script lang="ts" setup>
import ProfileDisplay from '@/components/profile/ProfileDisplay.vue';
import PasswordDisplay from '@/components/profile/PasswordDisplay.vue';
import ProfileUpdate from '@/components/profile/ProfileUpdate.vue';
import { ref } from 'vue';
const showProfileUpdate = ref(false);
</script>
<template>
    <ProfileDisplay @edit="showProfileUpdate = true"  v-if="!showProfileUpdate"/>
    {{ showProfileUpdate }}
    <ProfileUpdate v-if="showProfileUpdate" />
    <PasswordDisplay/>
</template>