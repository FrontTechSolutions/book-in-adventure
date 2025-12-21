<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface ActivityDisplayProps {
  activity: {
    title: string;
    description: string;
    mainPhotoUrl?: string;
    galleryUrls?: string[];
    location?: string;
    category: string;
    duration: string;
    maxPlaces: number | null;
    animator: string;
    color: string;
  };
}

defineProps<ActivityDisplayProps>();

</script>


<template>
  <v-card class="pa-6" max-width="600">
    <v-img v-if="activity.mainPhotoUrl" :src="activity.mainPhotoUrl" height="200" class="mb-4" cover />
    <v-card-title>{{ activity.title }}</v-card-title>
    <v-card-subtitle>{{ t('activity.fields.category') }} : {{ activity.category }}</v-card-subtitle>
    <v-card-text>
      <div class="mb-2">
        <strong>{{ t('activity.fields.description') }} :</strong>
        <div>{{ activity.description }}</div>
      </div>
      <div v-if="activity.location" class="mb-2">
        <strong>{{ t('activity.fields.location') }} :</strong>
        <span>{{ activity.location }}</span>
      </div>
      <div class="mb-2">
        <strong>{{ t('activity.fields.duration') }} :</strong>
        <span>{{ activity.duration }}</span>
      </div>
      <div class="mb-2">
        <strong>{{ t('activity.fields.maxPlaces') }} :</strong>
        <span>{{ activity.maxPlaces }}</span>
      </div>
      <div class="mb-2">
        <strong>{{ t('activity.fields.animator') }} :</strong>
        <span>{{ activity.animator }}</span>
      </div>
      <div class="mb-2">
        <strong>{{ t('activity.fields.color') }} :</strong>
        <v-avatar size="24" :color="activity.color" class="ml-2"></v-avatar>
      </div>
      <div v-if="activity.galleryUrls && activity.galleryUrls.length">
        <strong>{{ t('activity.fields.gallery') }} :</strong>
        <v-row class="mt-2" dense>
          <v-col v-for="(img, i) in activity.galleryUrls" :key="i" cols="4">
            <v-img :src="img" height="80" cover />
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>



<style scoped>
.v-card {
  margin: auto;
}
</style>
