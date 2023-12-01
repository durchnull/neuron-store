<script setup>
import {useApiClient} from "@/services/ApiClient";
import {useRouter} from "vue-router";
import {inject} from "vue";
import BackButton from "@/components/Checkout/Buttons/BackButton.vue";

const props = defineProps({
    url: String,
    token: String,
})

const links = inject('links');

useApiClient(props.url, props.token)
useRouter().push('/')

</script>
<template>
    <header class="flex items-center gap-8 p-8 mx-auto max-w-4xl">
        <a :href="links.shopUrl">
            <BackButton>Return to shop</BackButton>
        </a>
    </header>
    <main class="p-8 mx-auto max-w-4xl">
        <router-view></router-view>
    </main>
</template>