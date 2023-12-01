<script setup>
import {useCartStore} from "@/stores/CartStore";
import Translate from "@/components/Translate.vue";
import Collapsed from "@/components/Checkout/Collapsed.vue";

const shippingAddress = useCartStore().cart.shipping_address

const shippingAddressSummary = shippingAddress ? [
    shippingAddress.street + ' ' + shippingAddress.number,
    shippingAddress.postal_code,
    shippingAddress.city,
    shippingAddress.country_code,
].join(', ') : null

</script>
<template>
    <Collapsed
        label="shipping-address"
    >
        <template v-slot:action>
            <router-link :to="{ name: 'information' }"
                         id="changeAddress"
                         class="p-2 text-xs text-blue-400 hover:text-blue-500"
            >
                Change
            </router-link>
        </template>
        {{ shippingAddressSummary }}
    </Collapsed>
</template>