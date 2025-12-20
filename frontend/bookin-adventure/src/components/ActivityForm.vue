<script setup lang="ts">
import { ref } from 'vue';
import { useActivityStore } from '../stores/activity.store';
import { useI18n } from 'vue-i18n';
import { useToastersStore } from '@/stores/toasters';
import { ToasterLevel } from '@/interfaces/ToasterLevel';

const valid = ref(false);
const activity = ref({
  title: '',
  description: '',
  mainPhoto: null,
  gallery: [],
  location: '',
  category: '',
  duration: '',
  maxPlaces: null,
  animator: '',
  color: '#1976D2',
});
const { t } = useI18n();
const categories = [
  t('activity.category.coaching'),
  t('activity.category.surf'),
  t('activity.category.yoga'),
  t('activity.category.vente'),
  t('activity.category.cuisine'),
];
const animators = [
  'Jean Dupont', 'Marie Martin', 'Sophie Durand', // À remplacer par la liste réelle
];
const rules = {
  required: (v: any) => !!v || 'Ce champ est requis',
  positive: (v: any) => v > 0 || 'Doit être positif',
};



const activityStore = useActivityStore();
const toastersStore = useToastersStore();
const proId = 'demo-pro-id'; // À remplacer par l'id réel du pro

const onSubmit = async () => {
  if (valid.value) {
    await activityStore.createActivity(proId, { ...activity.value });
    if (!activityStore.error) {
      await activityStore.fetchActivities(proId);
      toastersStore.addToaster({
        title: t('activity.toaster.success_title'),
        content: t('activity.toaster.success_content'),
        level: ToasterLevel.SUCCESS,
        lifeTime: 6,
        showMoreInfoButton: false,
      });
    } else {
      toastersStore.addToaster({
        title: t('activity.toaster.error_title'),
        content: t(activityStore.error),
        level: ToasterLevel.ERROR,
        lifeTime: 10,
        showMoreInfoButton: false,
      });
    }
  }
};
</script>

<template>
  <v-card class="pa-6" max-width="600">
    <v-card-title>{{ t('activity.title') }}</v-card-title>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        v-model="activity.title"
        :label="t('activity.fields.title')"
        :rules="[rules.required]"
        required
      />
      <v-textarea
        v-model="activity.description"
        :label="t('activity.fields.description')"
        :rules="[rules.required]"
        required
      />
      <v-file-input
        v-model="activity.mainPhoto"
        :label="t('activity.fields.mainPhoto')"
        accept="image/*"
        :rules="[rules.required]"
        required
      />
      <v-file-input
        v-model="activity.gallery"
        :label="t('activity.fields.gallery')"
        accept="image/*"
        multiple
      />
      <v-text-field
        v-model="activity.location"
        :label="t('activity.fields.location')"
      />
      <v-select
        v-model="activity.category"
        :items="categories"
        :label="t('activity.fields.category')"
        :rules="[rules.required]"
        required
      />
      <v-text-field
        v-model="activity.duration"
        :label="t('activity.fields.duration')"
        :rules="[rules.required]"
        required
      />
      <v-text-field
        v-model="activity.maxPlaces"
        :label="t('activity.fields.maxPlaces')"
        type="number"
        :rules="[rules.required, rules.positive]"
        required
      />
      <v-select
        v-model="activity.animator"
        :items="animators"
        :label="t('activity.fields.animator')"
        :rules="[rules.required]"
        required
      />
      <v-color-picker
        v-model="activity.color"
        :label="t('activity.fields.color')"
        hide-canvas
        hide-inputs
        class="mt-4"
      />
      <v-btn type="submit" color="primary" class="mt-6">{{ t('activity.submit') }}</v-btn>
    </v-form>
  </v-card>
</template>



<style scoped>
.v-card {
  margin: auto;
}
</style>
