<script setup>
import {onMounted, ref} from "vue";
import {PaypalSdk} from "@/services/PaypalSdk";

const props = defineProps({
    payment: Object
})

const show = ref(false)

const init = (payment) => {
    PaypalSdk(payment.init.client_id).then(() => {
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal'
            }
        }).render('#paypal-button-container');

        show.value = true
    })
}

onMounted(() => {
    if (props.payment && props.payment.init) {
        init(props.payment)
    } else {
        console.warn('No paypal payment init')
    }
})
</script>
<template>
    <div v-show="show"
         id="paypal-button-container"></div>
</template>