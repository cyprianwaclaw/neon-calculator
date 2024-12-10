<template>
    <div class="px-[50px] py-[16px] flex justify-between header-border fixed z-20 bg-white w-full non-select">
        <img src="@/assets/files/logo.png" class="w-[180px]" />
        <NuxtLink to="https://doojhuunig.cfolks.pl/produkcja/napisyled/product-category/napisy-led/" class="flex place-items-center gap-[7px]">
            <Icon name="ph:arrow-left" size="22" class="text-[#1B0E0E]"/>
            <p class="font-medium text-[17px] text-[#1B0E0E]">Zamknij konfigurator</p>
        </NuxtLink>
    </div>
</template>
<script lang="ts" setup>

</script>
<style scoped lang="scss">

.header-border {
    border-bottom: 1px solid #E3E3E3;
}
</style>
