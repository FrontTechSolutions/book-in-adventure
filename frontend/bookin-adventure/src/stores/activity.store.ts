import { defineStore } from 'pinia';
import type { ActivityPayload } from '../interfaces/payload/ActivityPayload';
import type { Activity } from '@/interfaces/Activity';



interface State {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

export const useActivityStore = defineStore('activity', {
  state: (): State => ({
    activities: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchActivities(proId: string) {
      this.loading = true;
      try {
        // Remplacer par l'appel API réel
        // const res = await axios.get(`/pros/${proId}/activities`);
        // this.activities = res.data;
        this.activities = [];
        this.error = null;
      } catch (e: any) {
        this.error = e.message || 'activity.error.fetch';
      } finally {
        this.loading = false;
      }
    },
    async createActivity(proId: string, payload: ActivityPayload) {
      this.loading = true;
      try {
        // Remplacer par l'appel API réel
        // await axios.post(`/pros/${proId}/activities`, payload);
        // Pour la démo, on ajoute le payload comme une activité (cast partiel)
        this.activities.push(payload as any);
        this.error = null;
      } catch (e: any) {
        this.error = e.message || 'activity.error.create';
      } finally {
        this.loading = false;
      }
    },
    async updateActivity(proId: string, activityId: string, payload: ActivityPayload) {
      this.loading = true;
      try {
        // Remplacer par l'appel API réel
        // await axios.patch(`/pros/${proId}/activities/${activityId}`, payload);
        const idx = this.activities.findIndex(a => a.title === payload.title);
        if (idx !== -1) this.activities[idx] = payload as any;
        this.error = null;
      } catch (e: any) {
        this.error = e.message || 'activity.error.update';
      } finally {
        this.loading = false;
      }
    },
    async deleteActivity(proId: string, activityId: string) {
      this.loading = true;
      try {
        // Remplacer par l'appel API réel
        // await axios.delete(`/pros/${proId}/activities/${activityId}`);
        this.activities = this.activities.filter(a => a.title !== activityId);
        this.error = null;
      } catch (e: any) {
        this.error = e.message || 'activity.error.delete';
      } finally {
        this.loading = false;
      }
    },
  },
});
