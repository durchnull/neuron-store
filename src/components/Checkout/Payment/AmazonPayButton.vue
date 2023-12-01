<script setup>
import {onMounted, ref} from "vue";
import {useCartStore} from "@/stores/CartStore";
import {useLoadingStore} from "@/stores/LoadingStore";
import {AmazonPayCheckout} from "@/services/AmazonPayCheckout";
import Spinner from "@/components/Spinner.vue";

const props = defineProps({
    payment: Object
})

const cartStore = useCartStore()
const show = ref(false)

const init = (amazonPayment) => {

    AmazonPayCheckout(amazonPayment.init.region).then(() => {
        const amazonPayButton = amazon.Pay.renderButton('#amazon-pay-button', amazonPayment.init);

        amazonPayButton.onClick(async () => {
            try {
                if (cartStore.cart.payment.id !== amazonPayment.id) {
                    await cartStore.updatePayment(amazonPayment.id)
                }

                await cartStore.amazonPayButton()
                    .then(data => {
                        useLoadingStore.setLoading(true)
                        amazonPayButton.initCheckout(data)
                    })

            } catch (error) {
                console.error('Amazon Pay Button', error, error?.code)
            }
        });

        show.value = true
    })
}

onMounted(() => {
    if (props.payment && props.payment.init) {
        init(props.payment)
    } else {
        console.warn('No amazon pay init')
    }
})
</script>
<template>
    <div v-show="show"
         class="flex items-center gap-4"
    >
        <div id="amazon-pay-button"></div>
        <Spinner/>
    </div>
</template>