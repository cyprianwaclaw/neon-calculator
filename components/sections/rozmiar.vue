<template>
    <div class="flex w-full gap-[21px]">
        <InputsRange :max="100" :maxValue="size" @update:maxValue="updateNeonSize" />
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { neonSize } = storeToRefs(neonState);

const size = ref(neonSize.value);

const updateNeonSize = (value:any) => {
     neonSize.value = value;
}

</script>