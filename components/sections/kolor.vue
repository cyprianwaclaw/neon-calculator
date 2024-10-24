<template>
    <div class="flex w-full gap-[21px]">
        fdfdfgg  koloor
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { step } = storeToRefs(neonState);

</script>