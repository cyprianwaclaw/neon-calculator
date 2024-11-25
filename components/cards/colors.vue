<template>
    <div class=" grid w-full grid-cols-4 pt-[35px] px-[13px] pb-[20px] gap-[21px]">
        <!-- {{ props?.isLetter }} -->
        <div v-for="(item, index) in array" :key="index" class="circle"
            :style="{ backgroundColor: item.color, boxShadow: item.shadow }" @click="handleClick(index)"
            @mouseenter="hovering = index" @mouseleave="hovering = null">
            <div v-if="hovering === index" class="tooltip">
                {{ item.colorName }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNeon } from "@/store/useNeonData"

const neonState = useNeon()
const { neonColor } = storeToRefs(neonState)

const props = defineProps<{
    colors: { color: string; isActive: boolean; colorName: string, shadow: any }[],
    isLetter: boolean,
}>();

const array = ref(props.colors)
const hovering = ref<number | null>(null)

const handleClick = (index: number) => {

    if (props.isLetter === true) {
        console.log('Clicked on letter');
    }
    props.colors.forEach((item, i) => {
        if (i === index) {
            item.shadow = `0 1px 12px 3px ${item.color}`
            neonColor.value = item.color
        } else {
            item.shadow = '';
        }
    });
    array.value = [...array.value];
};

onMounted(() => {
    const test = props.colors.findIndex((single: any) =>
        single.color == neonColor.value
    )
    array.value[test].shadow = `0 1px 12px 3px ${neonColor.value}`;
    // console.log(test)
    // console.log(array.value[test])
    // console.log(props.colors)
    // console.log(neonColor.value)

    // if(neonColor){
    // array.value.forEach((item) => {
    //     if (item.color === neonColor.value) {
    //         item.shadow = `0 1px 12px 3px ${item.color}`;
    //         console.log('dxfdsf')
    //     } else {
    //         item.shadow = '';
    //     }
    // });
    // array.value = [...array.value];
    // }
})
</script>

<style lang="scss" scoped>
.circle {
    width: 50px;
    height: 50px;
    border-radius: 1000px;
    transition: background-color 0.15s, box-shadow 0.15s;
    position: relative;

    &:hover {
        cursor: pointer;
    }
}

.tooltip {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 6px;
    border-radius: 5px;
    font-size: 13px;
    white-space: nowrap;
    z-index: 50;
}
</style>