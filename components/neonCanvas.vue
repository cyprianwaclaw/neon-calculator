<!-- <template>
    <div>
        <canvas ref="myCanvas" width="400" height="200" class="canvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const myCanvas = ref<HTMLCanvasElement | null>(null);

const drawText = () => {
    if (!myCanvas.value) return;

    const context = myCanvas.value.getContext('2d');
    if (!context) return;

    // Ustawienia tekstu
    context.font = '30px Arial'; // Ustawia czcionkę i rozmiar
    context.fillStyle = 'blue'; // Ustawia kolor tekstu
    context.textAlign = 'center'; // Ustawia wyrównanie tekstu

    // Rysowanie tekstu
    context.fillText('Witaj na Canvasie!', myCanvas.value.width / 2, myCanvas.value.height / 2);
};

onMounted(() => {
    drawText();
});
</script>

<style lang="scss" scoped>
.canvas {
    border: 1px solid black; // Dodaje obramowanie do canvasu
    display: block; // Wyrównanie do bloku, aby uniknąć marginesów
    margin: 0 auto; // Wyśrodkowanie canvasu
}
</style> -->

<!-- <template>
  <div>
    <canvas ref="myCanvas" width="600" height="200" class="canvas"></canvas>
    <div class="dimensions">
      Rozmiar canvasu: {{ width }} px x {{ height }} px
    </div>
    <div v-if="hoveredLetter" class="letter-info">
      Litera: {{ hoveredLetter.char }} | Szerokość: {{ hoveredLetter.width }} px | Wysokość: {{ hoveredLetter.height }} px
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const myCanvas = ref<HTMLCanvasElement | null>(null);
const width = ref(600);  // Szerokość canvasu
const height = ref(200);  // Wysokość canvasu

// Tekst do wyświetlenia
const text = 'Witaj na Canvasie!';
const hoveredLetter = ref<{ char: string; width: number; height: number } | null>(null); // Obiekt przechowujący informacje o najechanej literze

// Funkcja dzieląca tekst na litery i zwracająca ich położenie
const getLettersWithPositions = (text: string, startX: number, startY: number) => {
  const letters = [];
  const fontSize = 30;

  // Ustawienie czcionki
  const canvas = myCanvas.value;
  if (canvas) {
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px Arial`;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = startX + context.measureText(text.substring(0, i)).width; // Obliczenie pozycji x
      const width = context.measureText(char).width; // Szerokość litery
      const height = fontSize; // Domyślna wysokość litery

      // Użycie measureText do obliczenia wysokości litery
      const metrics = context.measureText(char);
      const actualHeight = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent); // Oblicz wysokość

      letters.push({ char, x, y: startY, width, height: actualHeight });
    }
  }

  return letters;
};

const drawText = () => {
  if (!myCanvas.value) return;

  const context = myCanvas.value.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, width.value, height.value); // Czyszczenie canvasu

  // Rysowanie liter
  const letters = getLettersWithPositions(text, 20, 100);
  letters.forEach(({ char, x, y }, index) => {
    context.font = '30px Arial'; // Ustawienia tekstu
    context.fillStyle = hoveredLetter.value?.char === char ? 'red' : 'blue'; // Kolor tekstu zmienia się na czerwony, gdy jest najechany
    context.fillText(char, x, y); // Rysowanie litery
  });
};

// Funkcja do sprawdzania kliknięcia w litery
const handleClick = (event: MouseEvent) => {
  if (!myCanvas.value) return;

  const rect = myCanvas.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Sprawdzenie, czy kliknięto w którąkolwiek literę
  const letters = getLettersWithPositions(text, 20, 100);
  letters.forEach(({ char, x, y }, index) => {
    const textWidth = 30; // Szerokość tekstu
    const textHeight = hoveredLetter.value?.height || 30; // Wysokość litery, gdy hoveruje

    if (mouseX >= x && mouseX <= x + textWidth && mouseY >= y - textHeight && mouseY <= y) {
      alert(`Kliknięto literę: ${char}`);
    }
  });
};

// Funkcja do obsługi najechania kursora
const handleMouseMove = (event: MouseEvent) => {
  if (!myCanvas.value) return;

  const rect = myCanvas.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const letters = getLettersWithPositions(text, 20, 100);
  hoveredLetter.value = null; // Resetowanie indeksu hover

  // Sprawdzenie, która litera jest najechana
  letters.forEach(({ x, width, height, char }) => {
    if (mouseX >= x && mouseX <= x + width && mouseY >= 100 - height && mouseY <= 100) {
      hoveredLetter.value = { char, width, height }; // Ustawienie informacji o najechanej literze
    }
  });

  drawText(); // Ponowne rysowanie tekstu
};

onMounted(() => {
  drawText();
  myCanvas.value?.addEventListener('click', handleClick); // Dodajemy nasłuchiwacz kliknięć
  myCanvas.value?.addEventListener('mousemove', handleMouseMove); // Dodajemy nasłuchiwacz ruchu myszy
});
</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid black; // Dodaje obramowanie do canvasu
  display: block; // Wyrównanie do bloku, aby uniknąć marginesów
  margin: 0 auto; // Wyśrodkowanie canvasu
}

.dimensions {
  text-align: center; // Wyśrodkowanie tekstu wymiarów
  margin-top: 10px; // Margines nad wymiarami
}

.letter-info {
  text-align: center; // Wyśrodkowanie informacji o literze
  margin-top: 10px; // Margines nad informacjami o literze
  font-weight: bold; // Pogrubienie tekstu
}
</style> -->


<template>
  <div>
    <canvas ref="myCanvas" width="600" height="200" class="canvas"></canvas>
    <div class="dimensions">
      Rozmiar canvasu: {{ width }} px x {{ height }} px
    </div>
    <div v-if="hoveredLetter" class="letter-info">
      Litera: {{ hoveredLetter.char }} | Szerokość: {{ hoveredLetter.width }} px | Wysokość: {{ hoveredLetter.height }} px
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const myCanvas = ref<HTMLCanvasElement | null>(null);
const width = ref(500);  // Szerokość canvasu
const height = ref(200);  // Wysokość canvasu

// Tekst do wyświetlenia
const text = 'Witaj na Canvasie!';
const hoveredLetter = ref<{ char: string; width: number; height: number; x: number; y: number } | null>(null); // Obiekt przechowujący informacje o najechanej literze
const clickedLetter = ref<{ char: string; x: number; y: number } | null>(null); // Obiekt przechowujący klikniętą literę

// Funkcja dzieląca tekst na litery i zwracająca ich położenie
const getLettersWithPositions = (text: string, startX: number, startY: number) => {
  const letters = [];
  const fontSize = 30;

  // Ustawienie czcionki
  const canvas = myCanvas.value;
  if (canvas) {
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px Arial`;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = startX + context.measureText(text.substring(0, i)).width; // Obliczenie pozycji x
      const width = context.measureText(char).width; // Szerokość litery

      // Użycie measureText do obliczenia wysokości litery
      const metrics = context.measureText(char);
      const actualHeight = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent); // Oblicz wysokość

      letters.push({ char, x, y: startY, width, height: actualHeight });
    }
  }

  return letters;
};

const drawText = () => {
  if (!myCanvas.value) return;

  const context = myCanvas.value.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, width.value, height.value); // Czyszczenie canvasu

  // Rysowanie liter
  const letters = getLettersWithPositions(text, 20, 100);
  letters.forEach(({ char, x, y, width, height }) => {
    context.font = '30px Arial'; // Ustawienia tekstu
    // Ustawienie koloru na podstawie najechania lub kliknięcia
    if (hoveredLetter.value && hoveredLetter.value.char === char) {
      context.fillStyle = 'red'; // Kolor dla najechanej litery
    } else if (clickedLetter.value && clickedLetter.value.char === char) {
      context.fillStyle = 'green'; // Kolor dla klikniętej litery
    } else {
      context.fillStyle = 'blue'; // Kolor domyślny
    }
    context.fillText(char, x, y); // Rysowanie litery
  });
};

// Funkcja do sprawdzania kliknięcia w litery
const handleClick = (event: MouseEvent) => {
  if (!myCanvas.value) return;

  const rect = myCanvas.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Sprawdzenie, czy kliknięto w którąkolwiek literę
  const letters = getLettersWithPositions(text, 20, 100);
  clickedLetter.value = null; // Resetowanie klikniętej litery

  letters.forEach(({ char, x, width, height }) => {
    if (mouseX >= x && mouseX <= x + width && mouseY >= 100 - height && mouseY <= 100) {
      clickedLetter.value = { char, x, y: 100 }; // Ustawienie klikniętej litery
    }
  });

  drawText(); // Ponowne rysowanie tekstu
};

// Funkcja do obsługi najechania kursora
const handleMouseMove = (event: MouseEvent) => {
  if (!myCanvas.value) return;

  const rect = myCanvas.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const letters = getLettersWithPositions(text, 20, 100);
  hoveredLetter.value = null; // Resetowanie indeksu hover

  // Sprawdzenie, która litera jest najechana
  letters.forEach(({ x, width, height, char }) => {
    if (mouseX >= x && mouseX <= x + width && mouseY >= 100 - height && mouseY <= 100) {
      hoveredLetter.value = { char, width, height, x, y: 100 }; // Ustawienie informacji o najechanej literze
    }
  });

  drawText(); // Ponowne rysowanie tekstu
};

onMounted(() => {
  drawText();
  myCanvas.value?.addEventListener('click', handleClick); // Dodajemy nasłuchiwacz kliknięć
  myCanvas.value?.addEventListener('mousemove', handleMouseMove); // Dodajemy nasłuchiwacz ruchu myszy
});
</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid black; // Dodaje obramowanie do canvasu
  display: block; // Wyrównanie do bloku, aby uniknąć marginesów
  margin: 0 auto; // Wyśrodkowanie canvasu
}

.dimensions {
  text-align: center; // Wyśrodkowanie tekstu wymiarów
  margin-top: 10px; // Margines nad wymiarami
}

.letter-info {
  text-align: center; // Wyśrodkowanie informacji o literze
  margin-top: 10px; // Margines nad informacjami o literze
  font-weight: bold; // Pogrubienie tekstu
}
</style>