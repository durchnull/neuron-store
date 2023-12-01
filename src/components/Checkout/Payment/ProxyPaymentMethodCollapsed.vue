<script setup>
import Collapsed from "@/components/Checkout/Collapsed.vue";

/*
 amazon.Pay.bindChangeAction('#changePayment', {
            amazonCheckoutSessionId: cartStore.activeTransaction.resource_id,
            changeAction: 'changePayment'
        });
 */
</script>
<template>
    <Collapsed
        label="payment-method"
    >
        <template v-slot:action>
            <button id="changePayment"
                    class="p-2 text-xs text-blue-400 hover:text-blue-500">
                Change
            </button>
        </template>
        todo
    </Collapsed>
</template>