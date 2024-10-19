<template>
        <div class="flex w-full gap-[21px]">
            <div class="w-full h-full bg-slate-400">
                fdfdfgg
            </div>
        </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { step } = storeToRefs(neonState);

</script>