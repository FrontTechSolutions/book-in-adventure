<script setup lang="ts">

</script>
<template>
    <v-img
    :height="300"
    aspect-ratio="16/9"
    cover
    src="/src/assets/design/banner.png"
  >
    <v-container class="fill-height d-flex flex-column justify-end pb-6">
      <h1 class="text-white text-center w-100">{{ $t('home.welcome') }}</h1>
      <h2 class="text-white text-center w-100">{{ $t('home.subtitle') }}</h2>
    </v-container>
  </v-img>

</template>
<style scoped lang="scss">
    h1{
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        text-transform: uppercase !important;
        font-size: 3rem;
    }
    h2{
        font-weight: normal;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
        margin-top: 0.5rem;
        font-size: 1.5rem !important;
    }
</style>