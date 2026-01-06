<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGoogleMaps } from '@/composables/useGoogleMaps'
import type { Address } from '@/interfaces/Address'
import { useI18n } from 'vue-i18n'
import { useUserForm } from '@/composables/useUserForm'
import type { User } from '@/interfaces/User'
const { t } = useI18n()

// Props
const props = defineProps<{
  modelValue?: Address | null
  initial?: User
  rules?: Array<(v: any) => boolean | string>
}>()

const { rules } = useUserForm(props.initial)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Address | null): void
}>()

// Refs
const search = ref('')
const select = ref<{ title: string; value: string } | null>(null)
const items = ref<Array<{ title: string; value: string }>>([])
const loading = ref(false)
const selectedAddress = ref<Address | null>(props.modelValue || null)
const errorMessage = ref('')

// Google Maps
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
const { searchPlaces, getPlaceDetails } = useGoogleMaps(GOOGLE_MAPS_API_KEY)

// Synchroniser avec modelValue
watch(() => props.modelValue, (val) => {
  if (val) {
    selectedAddress.value = val
    // Ne pas mettre à jour select pour éviter de déclencher le watch
  } else {
    selectedAddress.value = null
    select.value = null
  }
}, { immediate: true })

// Recherche d'adresses
watch(search, async (val) => {
  if (!val || val.length < 3) {
    items.value = []
    return
  }

  loading.value = true
  try {
    const results = await searchPlaces(val)
    items.value = results.map((r) => ({
      title: r.title,
      value: r.placeId,
    }))
  } catch (error) {
    console.error('Error searching places:', error)
    errorMessage.value = 'Erreur lors de la recherche d\'adresses'
    items.value = []
  } finally {
    loading.value = false
  }
})

// Sélection d'une adresse
watch(select, async (selected, oldSelected) => {
  if (!selected) {
    selectedAddress.value = null
    emit('update:modelValue', null)
    return
  }

  // Ignorer si c'est le même objet
  if (selected === oldSelected) {
    return
  }

  const placeId = selected.value
  console.log('Selected placeId:', placeId)

  loading.value = true
  try {
    const address = await getPlaceDetails(placeId)
    selectedAddress.value = address
    errorMessage.value = ''
    emit('update:modelValue', address)
  } catch (error) {
    console.error('Error getting place details:', error)
    errorMessage.value = 'Erreur lors de la récupération des détails de l\'adresse'
    selectedAddress.value = null
    emit('update:modelValue', null)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="address-autocomplete">
    <v-autocomplete
      v-model="select"
      v-model:search="search"
      :items="items"
      :loading="loading"
      autocomplete="off"
      density="comfortable"
      :label="t('register.companyAddress')"
      item-title="title"
      item-value="value"
      :error-messages="errorMessage"
      :rules="[rules.required]"
      required
      clearable
      no-filter
      return-object
    >
      <template #no-data>
        <v-list-item>
          <v-list-item-title>
            {{ search.length < 3 ? 'Saisissez au moins 3 caractères' : 'Aucune adresse trouvée' }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<style scoped>
.address-autocomplete {
  width: 100%;
}

.selected-address-chip {
  margin-top: 8px;
}
</style>
