import { defineStore } from 'pinia';

export const useNeon = defineStore('neon', {
    state: () => ({
        step: 'start' as any,
        neonShape: '' as any,
        fontFamily: 'Arial' as string,
        neonSize: 70 as number,
    }),

    actions: {
        changeStep(name: string) {
            this.step = name;
        },
    }
});