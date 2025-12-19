<script setup lang="ts">
import ToasterTemplate from '@/components/toaster/ToasterTemplate.vue'
import type { ToasterData } from '@/interfaces/ToasterData'

import { v4 as uuidv4 } from 'uuid'
import { computed, ref, type ComponentPublicInstance } from 'vue'

type ToasterInstance = ComponentPublicInstance &
  InstanceType<typeof ToasterTemplate>

const toastersRefs = ref<ToasterInstance[]>([])

function setToasterRef(
  el: Element | ComponentPublicInstance | null,
  index: number,
) {
  if (el && isVueComponent(el)) {
    toastersRefs.value[index] = el as ToasterInstance
  } else {
    toastersRefs.value.splice(index, 1)
  }
}

function isVueComponent(
  el: Element | ComponentPublicInstance | null,
): el is ComponentPublicInstance {
  return !!(el as ComponentPublicInstance)?.$el
}

const props = defineProps<{
  modelValue: ToasterData[]
}>()

const emit = defineEmits(['update:modelValue', 'showMoreInfo'])

// Ajout automatique de UUID aux toasts sans id
const localModel = computed({
  get() {
    // Ajoute un id aux nouveaux toasts sans en modifier la réactivité du tableau parent
    const withIds = props.modelValue.map(toast => ({
      ...toast,
      id: toast.id ?? uuidv4(),
    }))

    // Si on détecte que certains objets n'ont pas d'id dans le tableau d'origine, on pousse une version corrigée au parent
    if (withIds.some((t, i) => props.modelValue[i] && t.id !== props.modelValue[i].id)) {
      emit('update:modelValue', withIds)
    }

    return withIds
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const visibleToasts = computed(() => localModel.value.slice(0, 4))

function deleteToastr(id: string) {
  localModel.value = localModel.value.filter(toast => toast.id !== id)
}

function pauseEveryToaster() {
  toastersRefs.value.forEach((toaster: { pauseToaster: () => void }) => {
    toaster?.pauseToaster()
  })
}

function resumeEveryToaster() {
  toastersRefs.value.forEach((toaster: { resumeToaster: () => void }) => {
    toaster?.resumeToaster()
  })
}

function onShowMoreInfo(toast: ToasterData) {
  emit('showMoreInfo', toast)
}
</script>

<template>
  <div class="l-toaster-queue">
    <transition-group name="fade">
      <ToasterTemplate
        v-for="(value, index) in visibleToasts"
        :ref="(el: Element | ComponentPublicInstance | null) => setToasterRef(el, index)"
        :key="value.id"
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
