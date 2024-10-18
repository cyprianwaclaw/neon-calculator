<template>
    <div>
        <NavsHeader />
        <div class="flex w-full">
            <div class="relative flex-grow">
                <div class="absolute z-50 mx-20 my-20">
                    <slot name="content" />
                </div>
                <div class="relative h-screen bg-red-300">
                    <img src="@/assets/files/neon-bg.webp" class="absolute inset-0 object-cover w-full h-full" />
                </div>
            </div>
            <div class="pt-[82px] bg-[#F6F7F9] w-[460px] flex h-screen">
                <div class="p-[50px]">
                    <slot name="sidebar"/>
                </div>
            </div>
        </div>  
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped></style>