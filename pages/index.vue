<template>
    <NuxtLayout name="page">
        <template v-slot:content>
            <h1 class="text-white">Stwórz swój wymarzony neon</h1>
        </template>
        <template v-slot:sidebar>
            <div class="relative h-full">
                <h1 class="mt-[21px]">Stwórz swój wymarzony neon</h1>
                <div class="flex w-full gap-[21px] my-[50px]">
                    <div @click="handleSelect('text')" :class="select === 'text' ? 'active-card' : 'nonactive-card'"
                        class="w-full h-[115px] border-radius-base flex flex-col justify-center items-center space-y-[5px]">
                        <Icon name="fluent:text-16-regular" size="46" class="color-primary" />
                        <h5 class="color-primary">Wpisz tekst</h5>
                    </div>
                    <div @click="handleSelect('image')" :class="select === 'image' ? 'active-card' : 'nonactive-card'"
                        class="w-full h-[115px] border-radius-base flex flex-col justify-center items-center space-y-[5px]">
                        <Icon name="fluent:image-20-regular" size="46" class="color-primary" />
                        <h5 class="color-primary">Wybierz zdjęcie</h5>
                    </div>
                </div>
                <div v-if="select === 'image'" class="w-full">
                    <button>Wgraj zdjęcie</button>
                </div>
                <div class="absolute w-full bottom-4">
                    <button :disabled="disabled">dsadsa</button>
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
// import { storeToRefs } from 'pinia';
// import { useNeonData } from "@/store/useNeonData";
const disabled = ref(true)

const select = ref()
const handleSelect = (name: string) => {
    name == 'text' ? select.value = 'text' : select.value = 'image'
}
// const neonState = useNeonData()
// const { user } = storeToRefs(neonState);
// neonState.login()
</script>

<style lang="scss" scoped></style>
