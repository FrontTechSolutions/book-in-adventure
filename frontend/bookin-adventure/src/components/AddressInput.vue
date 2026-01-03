<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useGoogleMaps } from '@/composables/useGoogleMaps';
import type { Address } from '@/interfaces/Address';

const props = defineProps<{
  modelValue?: Address | null;
  label?: string;
  rules?: Array<(v: any) => boolean | string>;
  required?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Address | null];
}>();

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const { isLoaded, initAutocomplete } = useGoogleMaps(GOOGLE_MAPS_API_KEY);
const containerRef = ref<HTMLElement | null>(null);
const displayValue = ref('');
const selectedAddress = ref<Address | null>(props.modelValue || null);
const touched = ref(false);

// Initialize display value from modelValue
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    displayValue.value = newVal.formatted;
    selectedAddress.value = newVal;
  }
}, { immediate: true });

// Initialize autocomplete when API is loaded
watch(isLoaded, (loaded) => {
  if (loaded && containerRef.value) {
    setupAutocomplete();
  }
});

onMounted(() => {
  if (isLoaded.value && containerRef.value) {
    setupAutocomplete();
  }
});

const setupAutocomplete = async () => {
  if (!containerRef.value) return;

  console.log('Setting up autocomplete');
  // On attend que l'initialisation soit terminée
  const autocompleteElement = await initAutocomplete(containerRef.value, (address: Address) => {
    console.log('Address selected:', address);
    selectedAddress.value = address;
    displayValue.value = address.formatted;
    touched.value = true;
    emit('update:modelValue', address);
    console.log('Emitted update:modelValue with:', address);
  });

  // On ajoute l'écouteur d'événement sur le composant lui-même plutôt que sur un input interne
  if (autocompleteElement) {
    autocompleteElement.addEventListener('focus', () => {
      touched.value = true;
    });
    // Pour les web components, on peut aussi écouter d'autres événements d'interaction
    autocompleteElement.addEventListener('click', () => {
      touched.value = true;
    });
  }
};

const handleInput = () => {
  // La nouvelle API gère automatiquement les changements
};

const validateAddress = (value: string) => {
  if (props.required && !selectedAddress.value) {
    return 'Veuillez sélectionner une adresse valide';
  }
  return true;
};

const combinedRules = [
  ...(props.rules || []),
  validateAddress
];
</script>

<template>
  <div class="address-input-vuetify">
    <!-- Label style Vuetify -->
    <label v-if="label" class="v-label" :class="{ 'v-label--required': required }">
      {{ label }}
    </label>
    
    <!-- Container pour le Web Component Google Maps -->
    <div ref="containerRef" class="gmp-container" :class="{ 'gmp-disabled': disabled }"></div>
    
    <!-- Affichage de l'adresse sélectionnée avec style Vuetify -->
    <div v-if="selectedAddress" class="selected-address-chip">
      <v-chip color="success" size="small" variant="flat">
        <v-icon start>mdi-check-circle</v-icon>
        {{ selectedAddress.city }}, {{ selectedAddress.postalCode }}
      </v-chip>
    </div>
    
    <!-- Message d'erreur style Vuetify -->
    <div v-if="touched && required && !selectedAddress" class="v-messages error-message">
      <div class="v-messages__message">
        Veuillez sélectionner une adresse valide
      </div>
    </div>
  </div>
</template>

<style scoped>
.address-input-vuetify {
  margin-bottom: 16px;
}

.v-label {
  display: block;
  font-size: 16px;
  line-height: 1;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  margin-bottom: 8px;
  font-weight: 400;
  letter-spacing: 0.009375em;
}

.v-label--required::after {
  content: " *";
  color: rgb(var(--v-theme-error));
}

.gmp-container {
  width: 100%;
}

.gmp-container :deep(.google-autocomplete-input) {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(var(--v-theme-on-surface), 1);
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}

.gmp-container :deep(.google-autocomplete-input:hover) {
  border-color: rgba(var(--v-theme-on-surface), 0.87);
}

.gmp-container :deep(.google-autocomplete-input:focus) {
  border-color: rgb(var(--v-theme-primary));
  border-width: 2px;
  padding: 15px; /* Compense le border-width */
}

.gmp-container :deep(gmp-place-autocomplete) {
  width: 100%;
  display: block;
}

/* Style l'input du Web Component pour ressembler à Vuetify */
.gmp-container :deep(input) {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(var(--v-theme-on-surface), 1);
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.gmp-container :deep(input:hover) {
  border-color: rgba(var(--v-theme-on-surface), 0.87);
}

.gmp-container :deep(input:focus) {
  border-color: rgb(var(--v-theme-primary));
  border-width: 2px;
  padding: 15px; /* Compense le border-width */
}

.gmp-disabled :deep(input) {
  opacity: 0.38;
  pointer-events: none;
  background: rgba(var(--v-theme-on-surface), 0.04);
}

.selected-address-chip {
  margin-top: 8px;
}

.error-message {
  color: rgb(var(--v-theme-error));
  font-size: 12px;
  margin-top: 4px;
  line-height: 12px;
  min-height: 14px;
}

.v-messages__message {
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
