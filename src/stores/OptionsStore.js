import {defineStore} from "pinia";
import {useApiClient} from "@/services/ApiClient";
import {useStorage} from '@vueuse/core';

const quickPaymentProviders = ['amazonpay', 'paypal']

export const useOptionsStore = defineStore("OptionsStore", {
    state: () => ({
        options: useStorage('neuron_options', {})
    }),
    actions: {
        clear() {
            this.options = {}
        },
        async load() {
            try {
                await useApiClient().options()
                    .then(options => this.options = options)
            } catch (error) {
                console.error('Error loading options:', error);
                throw error;
            }
        },
    },
    getters: {
        payments(state) {
            return (state?.options?.payments || []).sort((payment1, payment2) => {
                return payment1.position > payment2.position
            })
        },
        shippings(state) {
            return state?.options?.shippings || []
        },
        products(state) {
            return state?.options?.products || []
        },
        defaultShippingId(state) {
            return state.options.shippings.find(shipping => shipping.default).id;
        },
        defaultPaymentId(state) {
            return state.options.payments.find(payment => payment.default).id;
        },
        getProductById: (state) => {
            return (id) => state.options.products.find(product => product.id === id);
        },
        shippingsByCountry(state) {
            return (countryCode) => {
                return (this.shippings).filter((shipping) => shipping.country_code === countryCode);
            };
        },
        quickPayments: (state) => {
            return state.options.payments.filter(payment => quickPaymentProviders.includes(payment.provider))
        },
        slowPayments: (state) => {
            return state.options.payments.filter(payment => !quickPaymentProviders.includes(payment.provider))
        }
    }
})