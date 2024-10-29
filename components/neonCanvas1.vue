<template>
  <svg ref="svg" @mousemove="handleMouseMove"  width="1000" height="500">
    <g v-if="neonShape">
      <text
        v-for="(char, index) in neonShape"
        @mousemove="getCharacterSize"
        :key="index"
        :x="getX(index)"
        :y="canvasHeight / 2"
        class="test"
        :style="`font-family: ${fontFamily}; font-size: ${neonSize}px;`"
        >
        <!-- :class="getCharClass(index)" -->
        {{ char }}
      </text>
    </g>
  </svg>
  <div v-if="characterInfo" class="text-white">
    <p>Litera: {{ characterInfo.char }}</p>
    <p>Szerokość: {{ characterInfo.width }}px</p>
    <p>Wysokość: {{ characterInfo.height }}px</p>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData";
import { ref, watch, onMounted } from 'vue';

const neonState = useNeon();
const { neonSize, fontFamily, neonShape } = storeToRefs(neonState);

const svg = ref<SVGSVGElement | null>(null);
const characterInfo = ref<{ char: string; width: number; height: number } | null>(null);
const charPositions = ref<{ char: string; x: number; width: number; height: number }[]>([]);
const hoveredCharIndex = ref<number | null>(null);

const canvasHeight = 500;
let drawTimeout: NodeJS.Timeout | null = null;
const charDimensions = new Map<string, { width: number; height: number }>();

onMounted(() => {
  drawText(); // Rysowanie tekstu przy montowaniu komponentu
});

// Monitoruj zmiany neonSize, fontFamily i neonShape, aby aktualizować SVG
watch([neonSize, fontFamily, neonShape], () => {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(() => {
    drawText(); // Rysowanie tekstu po pewnym czasie od ostatniej zmiany
  }, 100); // Ustal opóźnienie, np. 100 ms
});

const getX = (index: number) => {
  let x = 0;
  for (let i = 0; i < index; i++) {
    x += charPositions.value[i]?.width || 0;
  }
  return x;
};

const getCharClass = (index: number) => {
  return hoveredCharIndex.value === index ? 'neon-red' : 'neon-cyan';
};

const drawText = () => {
  charPositions.value = [];
  let x = 0;

  for (const char of neonShape.value) {
    if (!charDimensions.has(char)) {
      const charWidth = measureCharacterWidth(char);
      const charHeight = measureCharacterHeight(char);
      charDimensions.set(char, { width: charWidth, height: charHeight });
    }

    const { width: charWidth, height: charHeight } = charDimensions.get(char)!;
    charPositions.value.push({ char, x, width: charWidth, height: charHeight });
    x += charWidth;
  }
};

const measureCharacterWidth = (char: string): number => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.font = `${neonSize.value}px ${fontFamily.value}`;
  return tempCtx.measureText(char).width;
};

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
};

const handleMouseMove = (event: MouseEvent) => {
  const svgRect = svg.value?.getBoundingClientRect();
  const mouseX = event.clientX - (svgRect?.left || 0);
  const mouseY = event.clientY - (svgRect?.top || 0);

  hoveredCharIndex.value = null;

  for (let i = 0; i < charPositions.value.length; i++) {
    const { x, width, height } = charPositions.value[i];

    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= canvasHeight / 2 - height / 2 &&
        mouseY <= canvasHeight / 2 + height / 2) {
      hoveredCharIndex.value = i;
      break;
    }
  }

  // Rysuj tylko, gdy zmienił się indeks
  if (hoveredCharIndex.value !== null) {
    drawText(); // Rysowanie tekstu tylko, gdy jest zmiana
  }
};

const getCharacterSize = (event: MouseEvent) => {
  const svgRect = svg.value?.getBoundingClientRect();
  const x = event.clientX - (svgRect?.left || 0);
  const y = event.clientY - (svgRect?.top || 0);

  for (const { char, x: charX, width, height } of charPositions.value) {
    if (x >= charX && x <= charX + width &&
        y >= canvasHeight / 2 - height / 2 &&
        y <= canvasHeight / 2 + height / 2) {
      characterInfo.value = {
        char,
        width,
        height
      };
      return;
    }
  }

  characterInfo.value = null;
};
</script>

<style scoped>
svg {
  width: 100%;
  height: auto;
}

.neon-cyan {
  fill: rgba(0, 255, 255, 1);
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.2));
}

.neon-red {
  fill: red;
  filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5)) drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
}


.test{
  cursor: pointer;
 fill: rgba(0, 255, 255, 1);
  /* drop-shadow(0 0 5px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.2)); */

}
.test:hover{
fill: rgb(0, 4, 255);
  /* filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.2)); */

}
svg {
   fill: rgba(0, 255, 255, 1);
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.3)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.2));
  
  /* filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4)); */
}
</style>
