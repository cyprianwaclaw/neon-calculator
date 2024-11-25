<template>
  <div class="mt-20" ref="svgContainer" style="position: relative;">
    <svg :width="500" :height="500" xmlns="http://www.w3.org/2000/svg">
      <p class="text-white">
        {{ textArray }}
      </p>
      <text :x="10" y="300" :font-size="neonSize" :font-family="fontFamily" @mouseleave="hideDimensions">
        <tspan v-for="(charData, index) in textArray" :key="index" :fill="charData.color" :x="getXPosition(index)"
          @mouseover="showDimensions(index, $event)" @click="handleLetterClick(index)"
          :style="getTextStyle(charData.color)" class="text-neon">
          {{ charData.char }}
        </tspan>
      </text>
    </svg>
    <div v-if="hoveredIndex !== null" class="tooltip" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }">
      Szerokość: {{ dimensions.width }} px, Wysokość: {{ dimensions.height }} px
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { neonSize, neonShape, fontFamily, neonColor, step, isChangeLetterColor } = storeToRefs(neonState)

const textArray = ref<any[]>([])

// Używamy watch, aby reagować na zmiany koloru neonowego
watch(neonColor, (newColor) => {
  // Zaktualizuj kolor każdej litery w tablicy
  textArray.value = textArray.value.map(charData => {
    return { ...charData, color: newColor }
  });
  // console.log(textArray.value)
});

// Aktualizujemy tablicę tekstową, kiedy zmienia się neonShape
watch(neonShape, () => {
  textArray.value = neonState.textAsArray()
});

// Funkcja do generowania stylów tekstu z efektem neonowego światła
function getTextStyle(color: string) {
  return {
    filter: `
      drop-shadow(0 1px 28px ${color}) 
      drop-shadow(0 0px 10px ${color.replace('1', '0.15')}) 
      drop-shadow(0 0 20px ${color.replace('1', '0.16')}) 
      drop-shadow(0 0 7px ${color.replace('1', '0.16')})
    `
  };
}

const hoveredIndex = ref<number | null>(null);
const dimensions = ref({ width: 0, height: 0 })
const tooltipX = ref(0);
const tooltipY = ref(0);

// Funkcja obsługująca kliknięcie w literę
const handleLetterClick = (index: number) => {
  console.log(textArray.value[index]);
  if (step.value == 'kolor') {
    isChangeLetterColor.value.push({ index, color: textArray.value[index].color, letter: textArray.value[index].char });
    textArray.value[index].color = 'rgba(230, 42, 44, 1)';  // Przykładowa zmiana koloru na czerwony
  }
}

// Funkcja do uzyskiwania pozycji X litery w tekście
const getXPosition = (index: number) => {
  let xPosition = 10; // Punkt początkowy
  for (let i = 0; i < index; i++) {
    const char = textArray.value[i].char;
    const bbox = measureCharacterWidth(char);
    xPosition += bbox + 0; // Dodanie odstępu między literami
  }
  return xPosition;
}

// Funkcja do pomiaru szerokości znaku
const measureCharacterWidth = (char: string): number => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = neonSize.value * 2;
  tempCanvas.height = neonSize.value * 2;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.font = `${neonSize.value}px ${fontFamily.value}`;
  const metrics = tempCtx.measureText(char);
  return metrics.width;
}

// Funkcja do pokazywania wymiarów literki przy najechaniu
function showDimensions(index: number, event: MouseEvent) {
  const char = textArray.value[index].char;
  const width = measureCharacterWidth(char);
  const height = measureCharacterHeight(char);

  dimensions.value.width = width;
  dimensions.value.height = height;

  tooltipX.value = event.clientX + window.scrollX;
  tooltipY.value = event.clientY + window.scrollY - height - 10; // Pozycja nad literą
  hoveredIndex.value = index;
}

// Funkcja do ukrywania wymiarów przy opuszczeniu literki
function hideDimensions() {
  hoveredIndex.value = null;
}

// Funkcja do pomiaru wysokości znaku
const measureCharacterHeight = (char: string): number => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = neonSize.value * 2;
  tempCanvas.height = neonSize.value * 2;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.font = `${neonSize.value}px ${fontFamily.value}`;
  tempCtx.fillText(char, neonSize.value, neonSize.value);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const pixels = imageData.data;

  let top = neonSize.value * 2;
  let bottom = 0;

  for (let y = 0; y < tempCanvas.height; y++) {
    for (let x = 0; x < tempCanvas.width; x++) {
      const alpha = pixels[(y * tempCanvas.width + x) * 4 + 3];
      if (alpha > 0) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }

  return bottom - top;
}

onMounted(() => {
  // Pobieramy tekst z Pinia
  textArray.value = neonState.textAsArray();
});
</script>

<style scoped>
.text-neon:hover {
  cursor: pointer !important;
  transition: 0.35s;
}

.tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  padding: 5px;
  font-size: 12px;
  pointer-events: none;
}
</style>