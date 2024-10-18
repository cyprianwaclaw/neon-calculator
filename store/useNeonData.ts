import { defineStore } from 'pinia';

export const useNeonData = defineStore('neon', {
    state: () => ({
        user: null as any,
    }),

    actions: {
        login() {
            this.user = "dasdsad";
        }
    }
});