<script setup>
import {useLoadingStore} from "@/stores/LoadingStore";
import Spinner from "@/components/Spinner.vue";
</script>
<template>
    <span class="relative flex items-center justify-center h-5 w-5">
        <span class="absolute"
              :class="{ 'opacity-0' : useLoadingStore.isLoading }"
        >→</span>
        <Spinner class="absolute"/>
    </span>
</template>