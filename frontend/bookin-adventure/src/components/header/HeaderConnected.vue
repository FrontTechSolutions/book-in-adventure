<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LogoutMenu from './LogoutMenu.vue'
import HeaderTitle from './HeaderTitle.vue'
import { useUserStore } from '@/stores/user.store'
import router from '@/plugins/router'

const { t } = useI18n()
const userStore = useUserStore()

const items = computed(() => {
  const role = userStore.getRole()
  if (role === 'pro') {
    return [
      { title: t('navigation.pro.dashboard'), value: 'pro-dashboard' },
      { title: t('navigation.pro.activities'), value: 'pro-activities' },
      { title: t('navigation.pro.calendar'), value: 'pro-calendar' },
    ]
  } else {
    return [
      { title: t('navigation.client.dashboard'), value: 'client-dashboard' },
      { title: t('navigation.client.profile'), value: 'client-profile' },
      { title: t('navigation.client.bookings'), value: 'client-bookings' },
    ]
  }
})

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>
<template>
      <v-app-bar color="primary" class="rounded-t-lg">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <HeaderTitle />
        <LogoutMenu v-if="userStore.isLoggedIn" />
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.value"
            @click="router.push(`/${item.value}`)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

</template>