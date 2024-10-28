<template>
    <div>
        <NavsHeader />
        <div class="flex w-full">
            <div class="relative flex-grow">
                <div class="absolute z-50 mx-20 my-20 bg-white">
                    <!-- <p class="neon-text">neopn</p> -->
                    <NeonCanvas />
                </div>
                <div class="relative h-screen">
                    <img src="@/assets/files/neon-bg.webp" class="absolute inset-0 object-cover w-full h-full" />
                </div>
            </div>
            <div class="pt-[82px] bg-white w-[460px] flex h-screen flex-col">
                <div class="p-[50px] w-full flex-grow relative">
                    <NavsMain v-if="step !== 'start'" />
                    <SectionsStart v-if="step == 'start'" />
                    <div class="overflow-scroll" style="max-height: calc(100vh - 82px - 123px - 260px);">
                        <SectionsFont v-if="step == 'font'" />
                        <SectionsRozmiar v-if="step == 'rozmiar'" />
                        <SectionsKolor v-if="step == 'kolor'" />
                        <SectionsDodatki v-if="step == 'dodatki'" />
                    </div>
                </div>
                <div v-if="step !== 'start'" class="absolute bottom-[50px] right-[50px] w-[360px]">
                    <button class="px-[18px] py-[15px] text-[17px] " @click="setStepSummary()">
                        <div class="flex justify-between">
                            <p>Podsumowanie</p>
                            <p>1200zł</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData";
const neonState = useNeon();
const { step } = storeToRefs(neonState);

const setStepSummary = () => {
    neonState.changeStep('podsumowanie');
}
</script>

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