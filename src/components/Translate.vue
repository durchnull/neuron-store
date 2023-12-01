<script setup>
import i18n from "@/lang/en.json"
const props = defineProps({
    me: String
})
const translation = i18n?.[props.me] || props.me
</script>
<template>
    {{ translation }}
</template>