import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { type ToasterData as LToasterData } from '@/interfaces/ToasterData';


export const useToastersStore = defineStore('toasters', () => {

    const toasters: Ref<LToasterData[]> = ref([])
    function addToaster(toaster: LToasterData) {
        toasters.value.push(toaster)
    }

    return { toasters, addToaster }

})
