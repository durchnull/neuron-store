<script setup>
import {useRoute, useRouter} from 'vue-router'
import Translate from "@/components/Translate.vue";

const currentRoute = useRoute()
const routes = useRouter()
    .getRoutes()
    .filter((route) => ['cart', 'information', 'shipping', 'payment'].includes(route.name));

</script>
<template>
    <ul class="flex items-center max-w-4xl mx-auto px-8 mt-8 gap-4 text-xs">
        <li v-for="(route, index) in routes">
            <span :class="{
                'font-bold' : route.name === currentRoute.name,
                'text-gray-400' : route.name !== currentRoute.name
             }">
                <Translate :me="route.name"/>
            </span>
            <span v-if="index !== routes.length - 1"
                  class="ml-4 text-gray-400"
            >→</span>
        </li>
    </ul>
</template>