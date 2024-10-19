import { defineStore } from 'pinia';

export const useNeon = defineStore('neon', {
    state: () => ({
        step: 'start' as any,
    }),

    actions: {
        changeStep(name: string) {
            this.step = name;
        }
    }
});