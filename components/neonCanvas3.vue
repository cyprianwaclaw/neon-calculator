<!-- <template>
  <div>
    <div class="text-wrap non-select mt-[300px]">

  
      <p class="text" :style="{
        fontFamily: fontFamily,
        fontSize: `${neonSize}px`,
        color: neonColor,
        textShadow: shadowStyles
      }">


        {{ neonShape }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitType from 'split-type'
import { storeToRefs } from 'pinia'
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { neonSize, neonShape, fontFamily, neonColor } = storeToRefs(neonState)
const color = computed(() => neonColor.value)


const textArray = ref<any[]>([])

watch(neonShape, () => {
  textArray.value = neonState.textAsArray()
})

watch(neonColor, (newColor) => {
  // Zaktualizuj kolor każdej litery w tablicy
  textArray.value = textArray.value.map(charData => {
    return { ...charData, color: newColor }
  });
  // console.log(textArray.value)
})


const darkenColor = (baseColor: string, percent: number) => {
  const rgbaMatch = baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/)
  if (!rgbaMatch) return baseColor

  let [, r, g, b, a] = rgbaMatch.map(Number)

  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, r - amt)
  const G = Math.max(0, g - amt)
  const B = Math.max(0, b - amt)

  return `rgba(${R}, ${G}, ${B}, ${a !== undefined ? a : 1})`
}

const shadowStyles = computed(() => {
  return `
     -1px 1px 0 ${darkenColor(color.value, 20)},
    -2px 2px 0 ${darkenColor(color.value, 25)},
    -3px 3px 0 ${darkenColor(color.value, 30)},
    -4px 4px 0 ${darkenColor(color.value, 35)},
    -5px 5px 0 ${darkenColor(color.value, 40)},
    -6px 6px 1px rgba(0, 0, 0, .1),
    -1px 1px 3px rgba(0, 0, 0, .3),
    -3px 3px 5px rgba(0, 0, 0, .2),
    -5px 5px 10px rgba(0, 0, 0, .25),
    -10px 10px 10px rgba(0, 0, 0, .2),
    -20px 20px 20px rgba(0, 0, 0, .15)
  `
})

onMounted(() => {
  // Pobieramy tekst z Pinia
  textArray.value = neonState.textAsArray();
  // const split = new SplitType(".text", {
  //   types: "chars",
  // });

  // console.log(split)
  
});
</script>

<style scoped lang="scss">
.text-wrap {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  // margin-top: 300px;
}

.text {
  text-align: center;
  // display: ;
  font-weight: bold;
  transition: 0.35s;
  transform: rotateX(0deg) rotateY(10deg) rotateZ(-3deg);
}
</style> -->

<!-- 
<template>
  <div>
    <div class="text-wrap non-select mt-[300px]">
      <p class="text" :style="{
        fontFamily: fontFamily,
        fontSize: `${neonSize}px`,
        color: neonColor,
        textShadow: shadowStyles
      }">
        <span v-for="(letter, index) in letters" :key="index"
              :id="`letter-${index}`"
              class="letter"
              :style="{ color: selectedLetter && selectedLetter.index === index ? selectedLetter.color : neonColor }"
              @click="selectLetter(index)">
          {{ letter }}
        </span>
      </p>
    </div>

    <div v-if="selectedLetter" class="letter-dimensions">
      <p>Wymiary klikniętej litery: {{ getLetterDimensions(selectedLetter.index) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { neonSize, neonShape, fontFamily, neonColor } = storeToRefs(neonState)
const color = computed(() => neonColor.value)

// Przechowujemy tablicę liter i informacje o klikniętej literze
const letters = ref<string[]>([])
const selectedLetter = ref<{ index: number; color: string } | null>(null)

watch(neonShape, () => {
  letters.value = neonShape.value.split('') // Dzielimy tekst na litery
})

watch(neonColor, (newColor) => {
  if (selectedLetter.value) {
    // Zaktualizuj kolor klikniętej litery
    letters.value[selectedLetter.value.index] = newColor
  }
})

// Funkcja zmieniająca kolor klikniętej litery
const selectLetter = (index: number) => {
  selectedLetter.value = {
    index,
    color: letters.value[index] === neonColor.value ? 'black' : neonColor.value, // Zmienia kolor na nowy lub na domyślny
  }
}

// Funkcja obliczająca wymiary litery
const getLetterDimensions = (index: number) => {
  const span = document.getElementById(`letter-${index}`)
  if (span) {
    const rect = span.getBoundingClientRect()
    return `${rect.width}px x ${rect.height}px`
  }
  return '0px x 0px'
}

const shadowStyles = computed(() => {
  return `
     -1px 1px 0 ${darkenColor(color.value, 20)},
    -2px 2px 0 ${darkenColor(color.value, 25)},
    -3px 3px 0 ${darkenColor(color.value, 30)},
    -4px 4px 0 ${darkenColor(color.value, 35)},
    -5px 5px 0 ${darkenColor(color.value, 40)},
    -6px 6px 1px rgba(0, 0, 0, .1),
    -1px 1px 3px rgba(0, 0, 0, .3),
    -3px 3px 5px rgba(0, 0, 0, .2),
    -5px 5px 10px rgba(0, 0, 0, .25)},
    -10px 10px 10px rgba(0, 0, 0, .2),
    -20px 20px 20px rgba(0, 0, 0, .15)
  `
})

const darkenColor = (baseColor: string, percent: number) => {
  const rgbaMatch = baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/)
  if (!rgbaMatch) return baseColor

  let [, r, g, b, a] = rgbaMatch.map(Number)

  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, r - amt)
  const G = Math.max(0, g - amt)
  const B = Math.max(0, b - amt)

  return `rgba(${R}, ${G}, ${B}, ${a !== undefined ? a : 1})`
}

onMounted(() => {
  letters.value = neonShape.value.split('') // Podziel tekst na litery przy załadowaniu
})
</script>

<style scoped lang="scss">
.text-wrap {
  perspective: 1000px;
  perspective-origin: 50% 50%;
}

.text {
  text-align: center;
  font-weight: bold;
  transition: 0.35s;
  transform: rotateX(0deg) rotateY(10deg) rotateZ(-3deg);
}

.letter {
  cursor: pointer;
  display: inline-block;
  padding: 0 5px;
  transition: color 0.3s;
}

.letter-dimensions {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}
</style> -->


<template>
  <div class="mt-20" ref="svgContainer" style="position: relative;">
    <svg :width="500" :height="500" xmlns="http://www.w3.org/2000/svg">
      <p class="text-white">
        {{ textArray }}
      </p>
      <text :x="10" y="300" :font-size="neonSize" :font-family="fontFamily" @mouseleave="hideDimensions">
        <tspan v-for="(charData, index) in textArray" :key="index" :fill="charData.color" :x="getXPosition(index)"
          @mouseover="showDimensions(index, $event)" @click="handleLetterClick(index)"
          :style="getTextStyle(charData.color)" class="text-3d">
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
  textArray.value = textArray.value.map(charData => {
    return { ...charData, color: newColor }
  });
});

// Aktualizujemy tablicę tekstową, kiedy zmienia się neonShape
watch(neonShape, () => {
  textArray.value = neonState.textAsArray()
});

// Funkcja do generowania stylów tekstu z efektem 3D
function getTextStyle(color: string) {
  return {
    textShadow: `
      -1px 1px 0 #ccc,
      -2px 2px 0 #c9c9c9,
      -3px 3px 0 #bbb,
      -4px 4px 0 #b9b9b9,
      -5px 5px 0 #aaa,
      -6px 6px 1px rgba(0, 0, 0, .1),
      -1px 1px 3px rgba(0, 0, 0, .3),
      -3px 3px 5px rgba(0, 0, 0, .2),
      -5px 5px 10px rgba(0, 0, 0, .25),
      -10px 10px 10px rgba(0, 0, 0, .2),
      -20px 20px 20px rgba(0, 0, 0, .15)
    `,
    transform: 'perspective(500px) rotateX(15deg) rotateY(15deg)', // Efekt 3D
    transformOrigin: 'center',  // Punkt początkowy transformacji
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
.text-3d {
  font-weight: bold;
  transition: 0.3s ease-in-out;
}

.text-3d:hover {
  cursor: pointer !important;
  transform: translateY(-3px); /* Mały ruch w górę na hover, aby wzmocnić efekt 3D */
  transition: 0.2s;
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