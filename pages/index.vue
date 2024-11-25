<template>
    <div>
        <NavsHeader />
        <div class="flex w-full">
            <div class="relative flex-grow h-screen border-own">
                <div class="absolute z-50 mx-[40px]">
                    <NeonCanvas2 v-if="type == 'Neon'" />
                    <NeonCanvas3 v-if="type == 'Litery 3D'" />
                </div>
                <div v-if="step !== 'start'" class="absolute z-50 main-type bottom-[50px] left-[30px] flex">
                    <div v-for="(single, index) in typesArray" :key="index" class="" @click="selectType(single.name)">
                        <p :class="[type == single.name ? 'single-type-active' : 'single-type']" class="type-text">{{
                            single.name }}</p>
                    </div>
                </div>
                <Transition>
                        <img v-if="type === 'Neon'" src="@/assets/files/neon-bg.webp" class="absolute inset-0 object-cover w-full h-full" />
                    </Transition>
            </div>
            <div class="pt-[82px] bg-white w-[460px] flex flex-col">
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
const { step, type } = storeToRefs(neonState);

const setStepSummary = () => {
    neonState.changeStep('podsumowanie');
}

const typesArray = ref([{
    name: 'Neon'
}, {
    name: 'Kaseton'
}, {
    name: 'Napis LED'
}, {
    name: 'Litery 3D'
},])
const selectType = (name: string) => {
    type.value = name;
}
</script>

<style lang="scss" scoped>
.border-own {
    border-right: 1px solid #E3E3E3;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.type-text {
    color: #F9E132;
    font-size: 16px;

}

.single-type {
    padding: 15px 28px;
    border-radius: 999px;
    background: #808080;
    transition: all 0.14s ease-in-out;

    &:hover {
        cursor: pointer;
        background: #949494;
    }
}

.single-type-active {
    padding: 15px 28px;
    background: #4E4E4E;
    border-radius: 999px;
    // padding: 17px 32px;
    transition: all 0.14s ease-in-out;
}

.main-type {
    background: #808080;
    border-radius: 999px;
    cursor: default;
    transition: all 0.2s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.test {
    font-size: 50px;
    color: red;
    font-family: Brush Script MT;
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