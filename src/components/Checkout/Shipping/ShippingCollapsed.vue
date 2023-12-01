<script setup>
import {useCartStore} from "@/stores/CartStore";
import {useOptionsStore} from "@/stores/OptionsStore";
import Collapsed from "@/components/Checkout/Collapsed.vue";

const cartStore = useCartStore()
const optionsStore = useOptionsStore()

// @todo refactor
const shippingAddressCountryCode = cartStore.cart.shipping_address?.country_code
const shippings = shippingAddressCountryCode
    ? optionsStore.shippingsByCountry(shippingAddressCountryCode)
    : optionsStore.shippings
const canChange = shippings.length > 1

const shipping = cartStore.cart.shipping
</script>
<template>
    <Collapsed
        label="shipping-method"
    >
        <template v-slot:action>
            <router-link :to="{ name: 'shipping' }"
                         class="p-2 text-xs text-blue-400 hover:text-blue-500"
            >
                Change
            </router-link>
        </template>
        {{ shipping.name }}
    </Collapsed>
</template>