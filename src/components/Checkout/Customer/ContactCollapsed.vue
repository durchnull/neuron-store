<script setup>
import {useCartStore} from "@/stores/CartStore";
import Collapsed from "@/components/Checkout/Collapsed.vue";

const customer = useCartStore().cart.customer
</script>
<template>
    <Collapsed
        label="contact"
    >
        <template v-slot:action>
            <router-link :to="{ name: 'information' }"
                         class="p-2 text-xs text-blue-400 hover:text-blue-500"
            >
                Change
            </router-link>
        </template>
        <div v-if="customer">{{ customer.email }}<span v-if="customer.phone">, {{ customer.phone }}</span></div>
    </Collapsed>
</template>