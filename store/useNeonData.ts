import { defineStore } from 'pinia';

export const useNeon = defineStore('neon', {
    state: () => ({
        step: 'start' as any,
        type: 'Neon' as string,
        neonShape: '' as any,
        neonColor: 'rgba(0, 255, 255, 1)' as any,
        fontFamily: 'Arial' as string,
        neonSize: 70 as number,
        isChangeLetterColor:[]
    }),

    actions: {
        changeStep(name: string) {
            this.step = name;
        },
        textAsArray() {
            let array = []
            for (let i = 0; i < this.neonShape.length; i++) {
                array.push({ char: this.neonShape[i], color: this.neonColor })
            }
            return array

        }
    }
})