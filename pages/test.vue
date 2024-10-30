<!-- <template>
    <div>
        <h1>Informacje o czcionce OTF</h1>
        <input type="file" @change="onFileChange" accept=".otf" />
        <div v-if="font">
            <h2>Nazwa czcionki: {{ font.names?.fontFamily }}</h2>
            <p>Liczba glyphów: {{ font.numGlyphs }}</p>
            <h3>Glyphy:</h3>
            <ul>
                <li v-for="glyph in font.glyphs.glyphs" :key="glyph.id">
                    ID: {{ glyph.id }}, Unicode: {{ glyph.unicode !== undefined ? String.fromCharCode(glyph.unicode) : 'N/A'
                    }}
                </li>
            </ul>
            <h2>LIGATURY</h2>

            <ul>
                <li v-for="glyph in font.glyphs.glyphs" :key="glyph.id">
                    ID: {{ glyph.id }}, Unicode: {{ glyph.unicode !== undefined ? String.fromCharCode(glyph.unicode) : 'N/A'
                    }}
                    <span v-if="glyph.isLigature">(Ligatura)</span>
                </li>
            </ul>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import opentype from 'opentype.js';

const font = ref<any>(null);

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        // Użyj opentype.load bezpośrednio na obiekcie File
        opentype.load(URL.createObjectURL(file), (err, loadedFont) => {
            if (err) {
                console.error('Błąd podczas wczytywania czcionki:', err);
                return;
            }
            font.value = loadedFont;
        });
    }
};
</script>

<style scoped>
/* Stylizacja komponentu */body {
  font-variant-ligatures: contextual;
}
</style> -->


<!-- <template>
    <div>
        <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg">
            <circle :cx="size / 2" :cy="size / 2" :r="radius" fill="blue" />
            <g v-for="(letter, index) in letters" :key="index">
                <text :x="size / 2 + (index - letters.length / 2) * 20" :y="size / 2 + 5" font-size="20"
                    text-anchor="middle" fill="white">
                    {{ letter }}
                </text>
            </g>
        </svg>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

// Zmienna tekstowa
const text = ref('sdadsd');
const size = ref(300); // Zwiększono rozmiar SVG
const radius = ref(100);

// Obliczanie liter z tekstu
const letters = computed(() => text.value.split(''));
</script>

<style scoped>
svg {
    border: 1px solid black;
    /* Opcjonalna ramka dla SVG */
}
</style> -->



<template>
    <div>
        <!-- Wyświetlenie wygenerowanego SVG -->
        <div ref="svgContainer"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const svgContainer = ref<HTMLElement | null>(null);

// Funkcja do stworzenia SVG z tekstem jako ścieżką
function createTextPathSVG(text: string, fontSize = 24, fontFamily = 'Arial') {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");

    const textElement = document.createElementNS(svgNS, "text");
    textElement.setAttribute("x", "10");
    textElement.setAttribute("y", "50");
    textElement.setAttribute("font-size", fontSize.toString());
    textElement.setAttribute("font-family", fontFamily);
    textElement.setAttribute("fill", "black");
    textElement.textContent = text;

    svg.appendChild(textElement);

    return svg;
}

// Dodanie SVG do kontenera po zamontowaniu komponentu
onMounted(() => {
    if (svgContainer.value) {
        const svgIcon = createTextPathSVG("T");
        svgContainer.value.appendChild(svgIcon);
    }
});
</script>




<!-- 
<template>
    <div>
        <h1>Znajdowanie ligatur w czcionkach</h1>
        <input type="text" v-model="inputText" placeholder="Wpisz tekst..." />
        <button @click="findLigatures">Znajdź ligatury</button>

        <div v-if="ligatureResult">
            <h2>Wynik ligatur:</h2>
            <pre>{{ ligatureResult }}</pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import fontLigatures from 'font-ligatures';

const inputText = ref('');
const ligatureResult = ref<string | null>(null);

const findLigatures = async () => {
    try {
        const font = await fontLigatures.load('Arial');
        const result = font.findLigatures(inputText.value);
        ligatureResult.value = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Błąd podczas ładowania czcionki:', error);
        ligatureResult.value = 'Wystąpił błąd przy ładowaniu czcionki.';
    }
};
</script>

<style scoped>
/* Stylizacja komponentu */
input {
    margin-bottom: 10px;
    padding: 8px;
    width: 300px;
}

button {
    padding: 8px 12px;
}

pre {
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ddd;
}
</style> -->
