<script setup lang="ts">
import type { ToasterData } from '@/interfaces/ToasterData';
import { ToasterLevel } from '@/interfaces/ToasterLevel';
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<ToasterData>(), {
  title: undefined,
  lifeTime: 5,
  transparent: false,
  level: ToasterLevel.INFO,
  showMoreInfoButton: false,
})

const computedLifeTime = computed(() =>
  props.level == ToasterLevel.ERROR ? -1 : props.lifeTime,
)

const emits = defineEmits([
  'deleteToaster',
  'pauseEveryToaster',
  'resumeEveryToaster',
  'showMoreInfo',
])
defineExpose({ pauseToaster, resumeToaster })

function pauseToaster() {
  isToasterPaused.value = true
}
function resumeToaster() {
  isToasterPaused.value = false
}

function onHoverToaster() {
  isHoveringToaster.value = true
  emits('pauseEveryToaster')
}
function onUnhoverToaster() {
  isHoveringToaster.value = false
  emits('resumeEveryToaster')
}
function closeToast() {
  isHoveringToaster.value = false
  emits('resumeEveryToaster')
  emits('deleteToaster')
}

const isHoveringToaster = ref(false)
const isToasterPaused = ref(false)
const progressBarValue = ref(100)

onMounted(() => {
  if (computedLifeTime.value >= 0) {
    let timeLeft = computedLifeTime.value * 10

    const interval = setInterval(() => {
      if (!isToasterPaused.value) {
        timeLeft--
      }
      if (timeLeft <= 0) {
        clearInterval(interval)
        emits('deleteToaster')
      }

      progressBarValue.value = (timeLeft * 10) / computedLifeTime.value
    }, 100)
  }
})

let toasterIcon: string
switch (props.level) {
  case ToasterLevelEnum.INFO:
    toasterIcon = 'mdi-information-outline'
    break
  case ToasterLevelEnum.SUCCESS:
    toasterIcon = 'mdi-check-circle-outline'
    break
  case ToasterLevelEnum.WARNING:
    toasterIcon = 'mdi-alert-outline'
    break
  case ToasterLevelEnum.ERROR:
    toasterIcon = 'mdi-close-circle-outline'
    break
  default:
    break
}
</script>

<template>
  <div
    class="l-toaster"
    :class="[
      'l-toaster-' + level,
      transparent && !isHoveringToaster ? 'l-transparent-toaster' : '',
    ]"
    @mouseenter="onHoverToaster"
    @mouseleave="onUnhoverToaster"
  >
    <div class="l-toaster-content-wrapper">
      <div class="l-toaster-icon">
        <v-icon>{{ toasterIcon }}</v-icon>
      </div>
      <div class="l-toaster-content">
        <div v-if="title" class="l-toaster-content-title">{{ title }}</div>
        <div class="l-toaster-content-subtitle">{{ content }}</div>
      </div>
      <div class="l-toaster-buttons">
        <div v-if="showMoreInfoButton" class="l-toaster-more-info-btn">
          <v-icon size="x-small" @click="emits('showMoreInfo')"
            >mdi-magnify-expand</v-icon
          >
        </div>
        <div class="l-toaster-close-btn">
          <v-icon size="small" @click="closeToast">mdi-close</v-icon>
        </div>
      </div>
    </div>
    <div v-if="computedLifeTime >= 0" class="l-toaster-progress-bar">
      <v-progress-linear
        :model-value="progressBarValue"
        :class="'progress-bar-' + level"
      ></v-progress-linear>
    </div>
  </div>
</template>

<style scoped>
.l-transparent-toaster {
  opacity: 0.7;
}

.l-toaster-INFO {
  background-color: rgb(var(--v-theme-info200));
}
.progress-bar-INFO {
  color: rgb(var(--v-theme-info100));
}
.l-toaster-SUCCESS {
  background-color: rgb(var(--v-theme-success200));
}
.progress-bar-SUCCESS {
  color: rgb(var(--v-theme-success100));
}
.l-toaster-WARNING {
  background-color: rgb(var(--v-theme-warning200));
}
.progress-bar-WARNING {
  color: rgb(var(--v-theme-warning100));
}
.l-toaster-ERROR {
  background-color: rgb(var(--v-theme-error200));
}
.progress-bar-ERROR {
  color: rgb(var(--v-theme-error100));
}

.l-toaster {
  width: 320px;
  height: 60px;
  max-height: 60px;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.2s ease-in-out all;
}

.l-toaster-content-wrapper {
  display: grid;
  grid-template-columns: 50px 200px 70px;
  height: 100%;
  max-height: 60px;
}
.l-toaster-content-wrapper > * {
  height: 100%;
  display: flex;
  align-items: center;
}
.l-toaster-icon {
  justify-content: center;
  max-height: 60px;
}
.l-toaster-buttons {
  max-height: 60px;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 10px;
}
.l-toaster-close-btn > * {
  cursor: pointer;
}
.l-toaster-content {
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 14px;
  line-height: 18px;
}
.l-toaster-content-subtitle {
  line-height: 16px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  width: 200px;
  overflow: hidden;
}
.l-toaster-content-title {
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}
.l-toaster-progress-bar {
  transform: translateY(-3px);
}
</style>
