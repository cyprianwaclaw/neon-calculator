<template>
    <div class="relative h-full non-select">
        <h1 class="pt-[8px]">Stwórz swój wymarzony neon</h1>
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
        <div v-if="select === 'text'">
            <InputsTextArea v-model="textareaValue" label="Wpisz tekst neonu" placeholder="O czym mam Ci przypominać ?" />
        </div>
        <div class="absolute bottom-0 w-full">
            <button :disabled="changeDisabledButton(select, textareaValue)" @click="startingConfigureNeon()">dsadsa</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon() 
const { neonShape } = storeToRefs(neonState);

const select = ref() as any
const textareaValue = ref('') as any
const handleSelect = (name: string) => {
    name == 'text' ? select.value = 'text' : select.value = 'image'
}

watch(textareaValue, (newValue: string) => {
    neonShape.value = newValue
})

const changeDisabledButton = (select: string, data: any) => {
    if (select == 'text' && data.length > 1 && data.length < 50) {
        return false
    }
    if (select == 'image' && data.length < 1) {
        return true
    }
    return true
}


const startingConfigureNeon = () => {
   neonState.changeStep('font')
}

</script>