<script setup>
import {useOptionsStore} from "@/stores/OptionsStore";
import {useCartStore} from "@/stores/CartStore";
import PaymentOption from "@/components/Checkout/Payment/PaymentOption.vue";

const cartStore = useCartStore()
const payments = useOptionsStore().slowPayments

const updatePayment = (paymentId) => {
    if (cartStore.cart.payment.id !== paymentId) {
        cartStore.updatePayment(paymentId)
    }
}

</script>
<template>
    <div class="grid gap-2 my-4">
        <PaymentOption
            v-for="(payment, index) in payments"
            :key="payment.id"
            :payment="payment"
            @click="updatePayment(payment.id)"
            :class="'order-' + payment.position"
        />
    </div>
</template>