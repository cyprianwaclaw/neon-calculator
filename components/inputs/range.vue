<template>
    <div class="w-full">
        <div class="w-full range-wrapper">
            <div class="w-full range">
                <div ref="slider" class="w-full">
                    <input
                        type="range"
                        name="max"
                        id="max"
                        :min="min"
                        :max="max"
                        :value="sliderMaxValue"
                        step="1"
                        @input="updateSliderMaxValue"
                        class="z-10 w-full"
                    />
                    <div class="w-full bar-container">
                        <div class="w-full bar"></div>
                        <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
                    </div>
                </div>
            </div>
            <div class="w-full justify-end flex mt-[58px]">
                <input type="number" class=" size-input" step="1" v-model="sliderMaxValue" />
                <p class="ml-[10px] text-[#211f1f] mt-[9px]">cm</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';

const { min, max, minValue, maxValue } = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    minValue: { type: Number, default: 50 },
    maxValue: { type: Number, default: 80 },
});

const emit = defineEmits(["update:minValue", "update:maxValue"]);

const slider = ref(null);
const sliderMinValue = ref(minValue);
const sliderMaxValue = ref(maxValue);

const getPercent = (value: any, min: any, max: any) => {
    return ((value - min) / (max - min)) * 100;
}

const progressBarWidth = computed(() => {
    return `${getPercent(sliderMaxValue.value, min, max)}%`;
})

const updateSliderMaxValue = (event: any) => {
    sliderMaxValue.value = parseFloat(event.target.value);
    emit("update:maxValue", sliderMaxValue.value);
}

watchEffect(() => {
    if (sliderMaxValue.value < sliderMinValue.value) {
        sliderMinValue.value = sliderMaxValue.value;
        emit("update:minValue", sliderMinValue.value);
    }
})
</script>

<style scoped lang="scss">

.bar-container {
    position: relative;
    height: 7px;
    border-radius: 5px;
    background-color: #ddd;
    overflow: hidden;
}

.bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    background-color: rgb(208, 202, 240);
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #7500F8;
    z-index: 2;
}

.range {
    position: relative;
    height: 6px;
    background: transparent;
    border-radius: 5px;
}

input[type="range"] {
    appearance: none; 
    -webkit-appearance: none;
    height: 6px;
    background: transparent;
    position: relative;
    z-index: 3;
    cursor: pointer;
    width: 100%;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: 26px;
    border-radius:50px ;
    background-color: #7500F8 !important;
    height: 25px;
    width: 25px;
    z-index: 4;
}
.size-input {
    background-color: #ececec98;
    padding: 7px 10px;
    width: 57px;
    color: #211f1f;
    font-size: 16px;
    letter-spacing: 0.17px;
    border: 2px solid transparent;
    outline: none;
    border-radius: 8px;
    font-weight: 400;
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
    resize: none;
    overflow-y: auto;
    &:focus {
        background-color: #ffffff;
        border-color: #7500F8;
        border-width: 2px;
        letter-spacing: 0.17px;
        font-weight: 400;
    }
    &::placeholder {
        letter-spacing: 0.17px;
        font-size: 16px;
        font-weight: 400;
        color: #9D9D9D;
    }
    &:focus::placeholder {
        font-weight: 400;
        color: #d9d9d9;
    }
}
.size-input::-webkit-outer-spin-button,
.size-input::-webkit-inner-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
}

</style>