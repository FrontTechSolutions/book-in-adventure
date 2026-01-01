<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from 'vue'
import ToasterTemplate from '@/components/toaster/ToasterTemplate.vue'
import type { ToasterData } from '@/interfaces/ToasterData'
import { useCommonStore } from '@/stores/common.store'

const commonStore = useCommonStore()


const toastersRefs = ref<(ComponentPublicInstance | Element)[]>([])

const visibleToasts = computed(() => commonStore.toasters.slice(0, 4))

const deleteToastr = (id: string) => {
  commonStore.removeToaster(id)
}

const pauseEveryToaster = () => {
  toastersRefs.value.forEach(toaster => {
    if (toaster && typeof (toaster as any).pauseToaster === 'function') {
      (toaster as any).pauseToaster()
    }
  })
}

const resumeEveryToaster = () => {
  toastersRefs.value.forEach(toaster => {
    if (toaster && typeof (toaster as any).resumeToaster === 'function') {
      (toaster as any).resumeToaster()
    }
  })
}

const emit = defineEmits<{
  showMoreInfo: [toast: ToasterData]
}>()

const onShowMoreInfo = (toast: ToasterData) => {
  emit('showMoreInfo', toast)
}
</script>

<template>
  <div class="l-toaster-queue">
    <transition-group name="fade">
      <ToasterTemplate
        v-for="(value, index) in visibleToasts"
        :key="value.id"
        :ref="el => { if (el) toastersRefs[index] = el }"
        :title="value.title"
        :content="value.content"
        :life-time="value.lifeTime"
        :transparent="value.transparent"
        :level="value.level"
        :show-more-info-button="value.showMoreInfoButton"
        @delete-toaster="deleteToastr(value.id ?? '')"
        @pause-every-toaster="pauseEveryToaster"
        @resume-every-toaster="resumeEveryToaster"
        @show-more-info="onShowMoreInfo(value)"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.l-toaster-queue {
  position: fixed;
  bottom: 10px;
  right: 10px;

  display: flex;
  flex-direction: column-reverse;
  gap: 5px;
  z-index: 9999999;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}
</style>