
<template>
    <div>
        <NavsHeader />
        <div class="flex w-full">
            <div class="relative flex-grow">
                <div class="absolute z-50 mx-20 my-20">
                    <p class="neon-text">neopn</p>
                </div>
                <div class="relative h-screen">
                    <img src="@/assets/files/neon-bg.webp" class="absolute inset-0 object-cover w-full h-full" />
                </div>
            </div>
            <div class="pt-[82px] bg-white w-[460px] flex h-screen">
                <div class="p-[50px] w-full relative">
                    <NavsConf v-if="step !== 'start'" />
                    <component :is="currentComponent" />
                    <div v-if="step !== 'start'" class="absolute bottom-[50px] right-[50px] left-[50px]">
                        <button class="px-[18px] py-[15px] text-[17px]">
                            <div class="flex justify-between">
                                <p>Podsumowanie</p>
                                <p>1200zł</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData";
import Start from '../components/Sections/start.vue';
import Font from '@/components/Sections/font.vue';
import { ref, watch } from 'vue';

const neonState = useNeon();
const { step } = storeToRefs(neonState);

// Stałe komponenty
const components = {
    start: Start,
    font: Font,
};

const currentComponent = ref(components[step.value] || null);

watch(step, (newStep) => {
    currentComponent.value = components[newStep] || null;
});
</script>


<!-- <template>
    <div>
        <NavsHeader />
        <div class="flex w-full">
            <div class="relative flex-grow">
                <div class="absolute z-50 mx-20 my-20">
                    <p class="neon-text">neopn</p>
                </div>
                <div class="relative h-screen">
                    <img src="@/assets/files/neon-bg.webp" class="absolute inset-0 object-cover w-full h-full" />
                </div>
            </div>
                <div class="pt-[82px] bg-white w-[460px] flex h-screen">
                    <div class="p-[50px] w-full relative">
                        <NavsConf v-if="step != 'start'" />
                        <component :is="currentComponent" />
                        <div v-if="step != 'start'" class="absolute bottom-[50px] right-[50px] left-[50px]">
                            <button class="px-[18px] py-[15px] text-[17px]">
                                <div class="flex justify-between">
                                    <p>Podsumowanie</p>
                                    <p>1200zł</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData";
import { markRaw, watch, ref, defineAsyncComponent } from 'vue';

const neonState = useNeon();
const { step } = storeToRefs(neonState);

const currentComponent = ref(markRaw(defineAsyncComponent(() => import(`../components/Sections/${step.value}.vue`))));

watch(step, async (newStep) => {
    try {
        currentComponent.value = markRaw(defineAsyncComponent(() => import(`../components/Sections/${newStep}.vue`)));
    } catch (error) {
        console.error(`Error loading component for step ${newStep}:`, error);
    }
});
</script> -->
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.neon-text {
    color: #39ff14;
    /* Kolor tekstu - zielony neon */
    font-size: 2em;
    /* Rozmiar czcionki */
    text-align: center;
    /* Wyśrodkowanie tekstu */
    text-shadow:
        0 0 5px #39ff14,
        /* Blask wewnętrzny */
        0 0 10px #39ff14,
        /* Blask zewnętrzny */
        0 0 15px #39ff14,
        /* Blask zewnętrzny */
        0 0 20px #ff00ff,
        /* Kolor różowy na zewnątrz */
        0 0 30px #ff00ff,
        /* Kolor różowy na zewnątrz */
        0 0 40px #ff00ff,
        /* Kolor różowy na zewnątrz */
        0 0 50px #ff00ff;
    /* Kolor różowy na zewnątrz */
}
</style>