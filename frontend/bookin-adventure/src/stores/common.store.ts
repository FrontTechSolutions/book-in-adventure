import { defineStore } from "pinia";
import {  ref, type Ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { type ToasterData as LToasterData } from '@/interfaces/ToasterData';

type AlertData = {
    text: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    id?: string;
}

export const useCommonStore = defineStore('common', () => {
    const dialogs = ref({
        login: false,
        passwordUpdate: false,
        forgotPassword: false,
        resetPasswordOtp: false
    })

    const resetPasswordEmail = ref('')

    const alerts: Ref<AlertData[]> = ref([]);   


    const addAlert= (alert: AlertData) => {
        // Ajoute automatiquement un ID si non fourni
        const alertWithId = {
            ...alert,
            id: alert.id ?? uuidv4()
        }
        alerts.value.push(alertWithId)
    }   
    
    const removeAlert = (id: string) => {
        alerts.value = alerts.value.filter(alert => alert.id !== id)
    }    
    
    


    const toasters: Ref<LToasterData[]> = ref([])
    
    const addToaster = (toaster: LToasterData) => {
        // Ajoute automatiquement un ID si non fourni
        const toasterWithId = {
            ...toaster,
            id: toaster.id ?? uuidv4()
        }
        toasters.value.push(toasterWithId)
    }

    const removeToaster = (id: string) => {
        toasters.value = toasters.value.filter(toast => toast.id !== id)
    }

    const clearAllToasters = () => {
        toasters.value = []
    }




    return {
        dialogs,
        resetPasswordEmail,
        alerts, addAlert, removeAlert,
        toasters, addToaster, removeToaster, clearAllToasters
    }    
})


