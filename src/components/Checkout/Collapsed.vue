<script setup>
import Translate from "@/components/Translate.vue";
defineProps({
    label: String
})
</script>
<template>
    <div class="rounded border border-gray-200 bg-gray-50 px-4 py-3">
        <div class="flex justify-between items-center text-xs text-gray-500">
            <span class="py-2">
                <Translate :me="label"/>
            </span>
            <slot name="action"></slot>
        </div>
        <slot/>
    </div>
</template>