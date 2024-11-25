<template>
    <div class="flex flex-col w-full gap-[21px]">
        <div v-if="isChangeLetterColor.length > 0">
        <div v-for="( single, index) in isChangeLetterColor" :key="index">
            <p>
                Litera:{{ single.letter }}
            </p>
            <CardsColors :colors="colors" :isLetter="true" />
        </div>
        </div>
        <CardsColors :colors="colors" />
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { step, isChangeLetterColor } = storeToRefs(neonState)

const colors = [
    { color: 'rgba(0, 255, 255, 1)', isActive: true, colorName: 'Cyjan', shadow: '' }, // Cyjan
    { color: 'rgba(0, 0, 255, 1)', isActive: true, colorName: 'Niebieski', shadow: '' }, // Niebieski
    { color: 'rgba(0, 255, 0, 1)', isActive: true, colorName: 'Zielony', shadow: '' }, // Zielony
    { color: 'rgba(255, 255, 0, 1)', isActive: true, colorName: 'Żółty', shadow: '' }, // Żółty
    { color: 'rgba(128, 0, 128, 1)', isActive: true, colorName: 'Fioletowy', shadow: '' }, // Fioletowy
    { color: 'rgba(255, 165, 0, 1)', isActive: true, colorName: 'Pomarańczowy', shadow: '' }, // Pomarańczowy
    { color: 'rgba(255, 192, 203, 1)', isActive: true, colorName: 'Różowy', shadow: '' }, // Różowy
    { color: 'rgba(139, 69, 19, 1)', isActive: true, colorName: 'Brązowy', shadow: '' }, // Brązowy
    { color: 'rgba(169, 169, 169, 1)', isActive: true, colorName: 'Szary', shadow: '' }, // Szary
    { color: 'rgba(0, 0, 0, 1)', isActive: true, colorName: 'Czarny', shadow: '' }  // Czarny
]

</script>