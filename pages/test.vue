<!-- <template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (canvasContainer.value) {
    // Tworzenie sceny, kamery i renderera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    canvasContainer.value.appendChild(renderer.domElement)

    // Tworzenie sześcianu
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Ładowanie czcionki i dodanie tekstu 3D
    const fontLoader = new THREE.FontLoader()
    fontLoader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      (font) => {
        const textGeometry = new THREE.TextGeometry('Hello, 3D World!', {
          font: font,
          size: 1,
          height: 0.2
        })
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)

        // Ustawienie pozycji tekstu
        textMesh.position.set(-5, 2, 0)
        scene.add(textMesh)
      },
      // Opcjonalnie: funkcje do śledzenia postępu ładowania i obsługi błędów
      (progress) => {
        console.log('Loading font:', progress.loaded / progress.total * 100, '%')
      },
      (error) => {
        console.error('Error loading font:', error)
      }
    )

    // Ustawienie kamery
    camera.position.z = 5

    // Funkcja animująca
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    
    animate()
  }
})
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style> -->
<template>
  <div class="flex text-wrap gap-[10px] ml-[100px]">
    <p class="text">
      {{ text }}
    </p>
      <p class="text">
    {{ text1 }}
    </p>
    
    <!-- {{ text2 }}
    {{ text3 }}
    {{ text4 }} -->
    <!-- </p> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definiujemy zmienną tekstową
const text = ref('I');
const text1 = ref('z');
const text2 = ref('o');
const text3 = ref('m');
const text4 = ref('e');

</script>

<style scoped lang="scss">
// .text-wrap {
//   perspective: 1000px;
//   perspective-origin: 50% 50%;
//   margin-top: 300px;
// }

// .text {
//   text-align: center;
//   color: #fff;
//   font-size: 5em;
//   font-weight: bold;
//   font-family: Helvetica;
//   transition: 0.35s;
//   transform: rotateX(10deg) rotateY(1deg) rotateZ(-4deg);
//   text-shadow:
//     -1px 1px 0 #ccc,
//     -2px 2px 0 #c9c9c9,
//     -3px 3px 0 #bbb,
//     -4px 4px 0 #b9b9b9,
//     -5px 5px 0 #aaa,
//     -6px 6px 1px rgba(0, 0, 0, .1),
//     -1px 1px 3px rgba(0, 0, 0, .3),
//     -3px 3px 5px rgba(0, 0, 0, .2),
//     -5px 5px 10px rgba(0, 0, 0, .25),
//     -10px 10px 10px rgba(0, 0, 0, .2),
//     -20px 20px 20px rgba(0, 0, 0, .15);
// }
.text {
  text-align: center;
  color: #fff;
  font-size: 5em;
  font-weight: bold;
  font-family: Helvetica;
  transition: 0.35s;
  transform: rotateX(10deg) rotateY(1deg) rotateZ(-4deg);
  text-shadow:
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
    -20px 20px 20px rgba(0, 0, 0, .15);
}

.text::before {
  content: attr(data-text); /* kopiowanie tekstu */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  color: rgba(0, 0, 0, 0.5); /* cień */
  text-shadow: none; /* brak cienia w pseudo elemencie */
}
</style>


