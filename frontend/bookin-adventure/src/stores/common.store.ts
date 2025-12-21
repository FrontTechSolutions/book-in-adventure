import { defineStore } from "pinia";
import {  ref } from "vue";


export const useCommonStore = defineStore('common', () => {
    const dialogs = ref({
        login: false,
        profileUpdate: false
    })
    return {
        dialogs
    }    
})