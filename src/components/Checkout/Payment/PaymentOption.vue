<script setup>
import {inject, onMounted, ref, watch} from "vue";
import {useCartStore} from "@/stores/CartStore";
import {useLoadingStore} from "@/stores/LoadingStore";
import Logo from "@/components/Logo.vue";
import Price from "@/components/MiniCart/Price.vue";
import Translate from "@/components/Translate.vue";
import Spinner from "@/components/Spinner.vue";
import Button from "@/components/Checkout/Buttons/Button.vue";

const props = defineProps({
    payment: Object,
    active: Boolean
})

const links = inject('links');

const cartStore = useCartStore()
const useMollieComponents = props.payment.provider === 'mollie' && props.payment.method === 'creditcard'

const mollie = ref(null)

const active = (paymentId) => {
    return cartStore.cart.payment.id === paymentId
}

const initMollieComponents = () => {
    if (!(useMollieComponents && active(props.payment.id) && mollie.value === null)) {
        return
    }

    const script = document.createElement('script')
    script.src = 'https://js.mollie.com/v1/mollie.js'

    script.onload = () => {
        mollie.value = Mollie(props.payment.init.profile_id, {
            locale: props.payment.init.locale,
            testmode: props.payment.init.testmode
        });

        let cardComponent = mollie.value.createComponent('card');
        cardComponent.mount('#mollie-card');
    }

    document.head.appendChild(script)
}

const place = async () => {
    let mollieToken = null

    if (useMollieComponents) {
        console.log('Create mollie token')
        try {
            let {token, error} = await mollie.value.createToken();

            if (error) {
                console.error('Mollie token', error)
            }

            mollieToken = token
        } catch (error) {
            console.error('Mollie token', error)
        }
    }

    await cartStore.place({
        card_token: mollieToken
    }).then(() => {
        console.log('transactions', cartStore.cart.transactions)
        const checkoutUrl = cartStore.cart.transactions[0]?.checkout_url

        console.log('checkoutUrl', checkoutUrl)
        if (checkoutUrl.length) {
            window.location = checkoutUrl
        // @todo use constants 'pending', ...
        } else if (cartStore.cart.status === 'pending') {
            this.$router.push({ name: 'processing' })
        } else if (cartStore.cart.status === 'accepted' || cartStore.cart.status === 'confirmed') {
            const orderLocation = links.shopUrl + '/order/' + cartStore.cart.id + '/' + cartStore.cart.number
            cartStore.clear()
            window.location = orderLocation
            return false
        } else {
            // @todo
            console.log('No action with checkoutUrl', checkoutUrl)
        }
    })
}

onMounted(() => {
    initMollieComponents()
})

watch(() => props.active, () => {
    initMollieComponents()
})
</script>
<template>
    <div class="p-4 border rounded-lg"
         :class="{
             'shadow-lg border-gray-400' : active(payment.id),
             'cursor-pointer hover:border-gray-400' : !active(payment.id),
         }"
    >
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center justify-center w-4 h-4 border rounded-full border-gray-400">
                <div v-show="active(payment.id)"
                     class="w-2 h-2 rounded-full bg-gray-700"></div>
            </div>
            <div class="flex justify-between items-center flex-1">{{ payment.name }}
                <span v-if="payment.provider === 'neuronpayment'"
                      class="font-mono text-xs mx-2"
                >Neuron Payment</span>
            </div>
            <div v-if="payment.provider === 'mollie' && payment.method === 'creditcard'"
                 class="flex gap-2"
            >
                <Logo name="american-express"
                      class="w-10"
                />
                <Logo name="visa"
                      class="w-10"
                />
                <Logo name="mastercard"
                      class="w-10"
                />
            </div>
            <Logo v-else
                  :name="payment.method"
                  class="w-10"
            />
        </div>
        <div v-show="active(payment.id)">
            <div v-if="useMollieComponents">
                <div class="flex gap-4 text-xs my-4">
                    <div class="bg-gray-50 p-4 rounded">
                        <div class="mb-1 text-gray-400">American Express</div>
                        <div>3782 822463 10005</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded">
                        <div class="mb-1 text-gray-400">Mastercard</div>
                        <div>2223 0000 1047 9399</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded">
                        <div class="mb-1 text-gray-400">Visa</div>
                        <div>4543 4740 0224 9996</div>
                    </div>
                </div>
                <div id="mollie-card"></div>
            </div>
            <div class="flex items-center justify-end gap-4 my-4">
                <img v-if="payment.provider === 'mollie'"
                     src="../../../assets/logos/powered_by_mollie.jpg"
                     class="h-6"
                />
                <Button @click="place()">
                    <span :class="{ 'opacity-0' : useLoadingStore.isLoading }">
                        <Translate me="buy-now"/>
                        ·
                        <Price :amount="cartStore.cart.amount"/>
                    </span>
                    <Spinner class="absolute"/>
                </Button>
            </div>
        </div>
    </div>
</template>
<style>
#mollie-card {

}

.mollie-card-component {
    display: block;
    align-items: center;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.mollie-component {
    padding: 0.5rem 0;
}

.mollie-card-component__label {
    display: block;
    font-size: 0.75rem;
    color: #aaa;
}

.is-touched {
}

.is-invalid {
    color: green;
}

.mollie-component-hidden-input {
    background: green;
}

.mollie-components__hidden-input {
    background: green;
}

.mollie-card-component__error {
    color: red;
    font-size: 0.75rem;
}
</style>