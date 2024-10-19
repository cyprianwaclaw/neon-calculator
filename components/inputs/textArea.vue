<template>
    <div class="relative flex flex-col w-full">
        <label class="mb-[11px] font-[18px]">{{ label }}</label>
        <textarea v-model="internalValue" :class="internalValue.length < 50 ? 'text-[#211f1f]' : 'text-[#F21A1A] border-[#F21A1A]'"
            :placeholder="placeholder">
        </textarea>
        <p v-if="internalValue.length" :class="internalValue.length < 50 ? 'text-[#cccccc]' : 'text-[#F21A1A]'"
            class="-mt-[36px] justify-end flex mr-5 text-[14px]">{{ internalValue.length }}/50</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
    label: string;
    placeholder: string;
}>()
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue || '')

watch(internalValue, (newValue: string) => {
    emit('update:modelValue', newValue);
})
</script>