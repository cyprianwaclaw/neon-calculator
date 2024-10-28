<template>
    <div class="grid w-full grid-cols-2 gap-4 non-select">
        <div v-for="(singleFont, index) in fontsArray" :key="index" class="w-full">
            <div @click="selectedFont(singleFont)" :class="singleFont === font ? 'active-card' : 'nonactive-card'"
                class="h-[70px] flex place-items-center justify-center text-[17px] color-primary "
                :style="{ fontFamily: `${singleFont}, sans-serif` }">
                {{ singleFont }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { font } = storeToRefs(neonState);

const fontsArray = ref([
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Geologica',
    'Verdana',
    'Georgia',
    'Courier New',
    'Brush Script MT',
    'Comic Sans MS',
    'Impact',
    'Lucida Console',
    'Palatino Linotype',
    'Trebuchet MS',
    'La Belle Aurore',
    'Gill Sans',
    'Tahoma',
    'Frank Ruhl Libre',
    'Montserrat',
    'Lora',
    'Open Sans',
    'Roboto',
    'Poppins',
    'Raleway',
    'Fira Sans',
    'Noto Sans',
    'Dancing Script',
    'Baskerville',
    'Merriweather',
    'Source Sans Pro',
    'Inconsolata',
    // Add more font names here if needed
]);

const selectedFont = (fontNam: string) => {
    font.value = fontNam;
}
</script>
<style scoped>
/* .geologica {
    font-family: "Geologica", sans-serif;
}

.inter {
    font-family: "Inter", sans-serif;
} */

</style>