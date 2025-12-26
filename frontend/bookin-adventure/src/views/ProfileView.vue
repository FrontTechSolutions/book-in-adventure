<script lang="ts" setup>
import ProfileDisplay from '@/components/profile/ProfileDisplay.vue';
import PasswordDisplay from '@/components/profile/PasswordDisplay.vue';
import ProfileUpdate from '@/components/profile/ProfileUpdate.vue';
import { computed, ref } from 'vue';
import PasswordUpdate from '@/components/profile/PasswordUpdate.vue';
import EmailDisplay from '@/components/profile/EmailDisplay.vue';
import EmailUpdate from '@/components/profile/EmailUpdate.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const showProfileUpdate = ref(false);
const showPasswordUpdate = computed(() => route.query.showPasswordUpdate === 'true')
const showEmailUpdate = computed(() => route.query.showEmailUpdate === 'true')

</script>
<template>
    <ProfileUpdate v-if="showProfileUpdate" :open="showProfileUpdate" @close="showProfileUpdate = false" />
    
    <PasswordUpdate v-else-if="showPasswordUpdate" />

    <EmailUpdate v-else-if="showEmailUpdate" />

    <template v-else>
        <ProfileDisplay @edit="showProfileUpdate = true" />
        <PasswordDisplay />
        <EmailDisplay/>
    </template>
</template>