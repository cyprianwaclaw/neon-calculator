import { defineStore } from 'pinia';

export const useNeon = defineStore('neon', {
    state: () => ({
        step: 'start' as any,
        neonShape: '' as any,
        font: 'Arial' as string,
        neonSize: 50 as number,
    }),

    actions: {
        changeStep(name: string) {
            this.step = name;
        },
    }
});