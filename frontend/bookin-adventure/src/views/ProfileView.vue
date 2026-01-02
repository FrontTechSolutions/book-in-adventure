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
    <v-container class="pa-4">
        <v-row v-if="showProfileUpdate || showPasswordUpdate || showEmailUpdate">
            <v-col cols="12">
                <ProfileUpdate v-if="showProfileUpdate" :open="showProfileUpdate" @close="showProfileUpdate = false" />
            </v-col>
            <v-col cols="12">
                <PasswordUpdate v-if="showPasswordUpdate" />
            </v-col>        
            <v-col cols="12">
                <EmailUpdate v-if="showEmailUpdate" />
            </v-col>            
        </v-row>

        <v-row v-else>
            <v-col cols="12" md="4">
                <ProfileDisplay @edit="showProfileUpdate = true" />
            </v-col>
            <v-col cols="12" md="4">
                <PasswordDisplay />
            </v-col>
            <v-col cols="12" md="4">
                <EmailDisplay/>
            </v-col>
        </v-row>
    </v-container>
</template>