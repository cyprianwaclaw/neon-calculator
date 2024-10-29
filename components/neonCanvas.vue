
<template>
  <canvas ref="canvas" @mousemove="handleMouseMove" @click="getCharacterSize" />
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

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const fontSize = ref(neonSize.value);
const fontStyle = ref(fontFamily.value);
const characterInfo = ref<{ char: string; width: number; height: number } | null>(null);
const charPositions = ref<{ char: string; x: number; width: number; height: number }[]>([]);
const hoveredCharIndex = ref<number | null>(null);

const canvasWidth = 1000;
const canvasHeight = 500;

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = canvasWidth;
    canvas.value.height = canvasHeight;
    ctx.value = canvas.value.getContext('2d');
    drawText();
  }
});

// Monitoruj zmiany neonSize, fontFamily i neonShape, aby aktualizować canvas
watch([neonSize, fontFamily, neonShape], ([newSize, newFont, newText]) => {
  fontSize.value = newSize;
  fontStyle.value = newFont;
  drawText(); // Przerysowanie tekstu przy zmianie rozmiaru, rodziny czcionek lub tekstu
});

const measureCharacterHeight = (char: string): number => {
  if (!ctx.value) return 0;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = fontSize.value * 2;
  tempCanvas.height = fontSize.value * 2;
  const tempCtx = tempCanvas.getContext('2d')!;

  tempCtx.font = `${fontSize.value}px ${fontStyle.value}`;
  tempCtx.fillText(char, fontSize.value, fontSize.value);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const pixels = imageData.data;

  let top = fontSize.value * 2;
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

const drawText = () => {
  charPositions.value = [];
  ctx.value!.clearRect(0, 0, canvas.value!.width, canvas.value!.height);

  let x = 0;
  ctx.value!.font = `${fontSize.value}px ${fontStyle.value}`;
  ctx.value!.textAlign = 'left';
  ctx.value!.textBaseline = 'middle';

  for (const char of neonShape.value) {
    const charWidth = ctx.value?.measureText(char).width || 0;
    const charHeight = measureCharacterHeight(char);

    charPositions.value.push({ char, x, width: charWidth, height: charHeight });
    x += charWidth;
  }

  renderText();
};


const setShadow = (ctx, color, blur) => {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = 0; // Przesunięcie cienia w poziomie
  ctx.shadowOffsetY = 0; // Przesunięcie cienia w pionie
};


const renderText = () => {
  let x = 0;

  for (let i = 0; i < neonShape.value.length; i++) {
    const char = neonShape.value[i];
    const charWidth = charPositions.value[i].width;

    // Ustawienia kolorów tekstu i cienia
    if (hoveredCharIndex.value === i) {
      ctx.value.fillStyle = 'red'; // Kolor tekstu dla aktywnego indeksu
      setShadow(ctx.value, 'rgba(255, 0, 0, 0.8)', 15); // Cień dla aktywnego indeksu
    } else {
      ctx.value.fillStyle = 'cyan'; // Kolor tekstu dla pozostałych
      setShadow(ctx.value, 'rgba(0, 255, 255, 0.8)', 15); // Cień dla pozostałych
    }

    // Rysowanie tekstu
    ctx.value.fillText(char, x, canvas.value!.height / 2);
    x += charWidth;

    // Resetowanie efektów cienia po rysowaniu tekstu
    ctx.value.shadowColor = 'transparent'; // Wyłączenie cienia
    ctx.value.shadowBlur = 0; // Resetowanie rozmycia cienia
  }
};


const handleMouseMove = (event: MouseEvent) => {
  const canvasRect = canvas.value?.getBoundingClientRect();
  const mouseX = event.clientX - (canvasRect?.left || 0);
  const mouseY = event.clientY - (canvasRect?.top || 0);

  hoveredCharIndex.value = null;

  for (let i = 0; i < charPositions.value.length; i++) {
    const { x, width, height } = charPositions.value[i];

    if (mouseX >= x && mouseX <= x + width &&
      mouseY >= canvas.value!.height / 2 - height / 2 &&
      mouseY <= canvas.value!.height / 2 + height / 2) {
      hoveredCharIndex.value = i;
      break;
    }
  }

  renderText();
};

const getCharacterSize = (event: MouseEvent) => {
  const canvasRect = canvas.value?.getBoundingClientRect();
  const x = event.clientX - (canvasRect?.left || 0);
  const y = event.clientY - (canvasRect?.top || 0);

  for (const { char, x: charX, width, height } of charPositions.value) {
    if (x >= charX && x <= charX + width &&
      y >= canvas.value!.height / 2 - height / 2 &&
      y <= canvas.value!.height / 2 + height / 2) {
      characterInfo.value = {
        char,
        width,
        height
      };
      return;
    }
  }

  characterInfo.value = null;
}
</script>

<style scoped>
canvas {
  /* border: 1px solid black; */
  width: 100%;
  height: auto;
}

.neon-text {
  color: rgba(0, 255, 255, 1);
  /* Główny kolor tekstu */
  text-shadow:
    0 0 5px rgba(0, 255, 255, 0.7),
    0 0 10px rgba(0, 255, 255, 0.5),
    0 0 20px rgba(0, 255, 255, 0.5),
    0 0 30px rgba(0, 255, 255, 0.3),
    0 0 40px rgba(0, 255, 255, 0.2);
}

.neon-red {
  color: red;
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.5), 0 0 10px rgba(255, 0, 0, 0.5);
}

.neon-cyan {
  color: rgb(0, 255, 85);
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.5);
}
</style>