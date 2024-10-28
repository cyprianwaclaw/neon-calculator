<template>
    <div class="-mt-[21px] non-select">
        <div class="flex w-full own-border">
            <div v-for="(card, index) in array" :key="index" class="flex w-full">
                <div @click="setStep(card.name)"
                    class="w-full h-[85px] border-radius-base flex flex-col justify-center items-center space-y-[8px]"
                    :class="step == card.name.toLowerCase() ? '' : 'hover:bg-[#f8f6ffb5] hover:border-[#7400f8] hover:border hover:cursor-pointer'">
                    <Icon :name="card.icon" size="32"
                        :class="step == card.name.toLowerCase() ? 'color-primary' : 'text-[#b7b7b7]'" />
                    <h5 :class="step == card.name.toLowerCase() ? 'color-primary' : 'text-[#1B0E0E]'">
                        {{ card.name }}
                    </h5>
                </div>
            </div>
        </div>
        <h2 class="pb-[14px]">{{ capitalizeFirstLetter(step) }}</h2>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData";

const neonState = useNeon();
const { step } = storeToRefs(neonState);

const array = ref([
    { name: 'Font', icon: 'fluent:text-case-title-24-regular' },
    { name: 'Rozmiar', icon: 'fluent:arrow-maximize-24-regular' },
    { name: 'Kolor', icon: 'fluent:color-24-regular' },
    { name: 'Dodatki', icon: 'fluent:remix-add-24-regular' },
])

const setStep = (name: string) => {
    const changeName = name.toLowerCase() as any
    neonState.changeStep(changeName)
}
const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

</script>
<style lang="scss" scoped>
.own-border {
    border-bottom: 1px solid #E3E3E3;
    padding-bottom: 24px;
    margin-bottom: 40px;
}
</style>
