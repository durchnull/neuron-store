<script setup>
import {useOptionsStore} from "@/stores/OptionsStore";
import AmazonPayButton from "@/components/Checkout/Payment/AmazonPayButton.vue";
import Paypal from "@/components/Checkout/Payment/Paypal.vue";

const payments = useOptionsStore().quickPayments
const amazonPayPayment = payments.find(payment => payment.provider === 'amazonpay')
const paypalPayment = payments.find(payment => payment.provider === 'paypal')
</script>
<template>
    <div class="grid gap-4">
        <AmazonPayButton :payment="amazonPayPayment"/>
        <Paypal :payment="paypalPayment"/>
    </div>
</template>