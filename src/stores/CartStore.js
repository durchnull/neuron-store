import {defineStore} from "pinia";
import {useApiClient} from "@/services/ApiClient";
import {useStorage} from "@vueuse/core";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        cart: useStorage('neuron_cart', {})
    }),
    getters: {
        exist(state) {
            return typeof state.cart !== 'undefined' && Object.keys(state.cart).length > 0;
        },
        id(state) {
            return state.cart.id
        },
        empty(state) {
            return state.cart.items.length === 0
        },
        items(state) {
            return state.cart.items.sort((item1, item2) => {
                return item1.position > item2.position
            })
        },
        itemsQuantity() {
            return this.items.reduce((sum, item) => sum + item.quantity, 0)
        },
        customerExist(state) {
            return state.cart.customer !== null
        },
        activeTransaction(state) {
            // @todo improve
            return state.cart.transactions.find((transaction) => transaction.status === 'created')
        }
    },
    actions: {
        clear() {
            this.cart = {}
        },
        async cartMiddleware(apiCall) {
            return await apiCall().then(cart => {
                this.cart = cart
            })
        },
        async create(shippingId, paymentId) {
            return this.cartMiddleware(() => {
                return useApiClient().create(shippingId, paymentId)
            })
        },
        async get() {
            return this.cartMiddleware(() => {
                return useApiClient().get(this.cart.id)
            })
        },
        async itemAdd(productId, quantity, configuration = null) {
            return this.cartMiddleware(() => {
                return useApiClient().itemAdd(this.cart.id, productId, quantity, configuration)
            })
        },
        async itemRemove(itemId) {
            return this.cartMiddleware(() => {
                return useApiClient().itemRemove(this.cart.id, itemId)
            })
        },
        async updateCustomer(email, phone = null, note = null, shippingAddress, billingAddress = null) {
            return this.cartMiddleware(() => {
                return useApiClient().updateCustomer(this.cart.id, email, phone, note, shippingAddress, billingAddress)
            })
        },
        async couponRedeem(code) {
            return this.cartMiddleware(() => {
                return useApiClient().couponRedeem(this.cart.id, code)
            })
        },
        async couponRemove(code) {
            return this.cartMiddleware(() => {
                return useApiClient().couponRemove(this.cart.id, code)
            })
        },
        async updateShipping(shippingId) {
            return this.cartMiddleware(() => {
                return useApiClient().updateShipping(this.cart.id, shippingId)
            })
        },
        async updatePayment(paymentId) {
            return this.cartMiddleware(() => {
                return useApiClient().updatePayment(this.cart.id, paymentId)
            })
        },
        async place(paymentData = {}) {
            return this.cartMiddleware(() => {
                return useApiClient().place(this.cart.id, paymentData)
            })
        },
        async amazonPayButton() {
            return useApiClient().amazonPayButton(this.cart.id)
        },
        async transactionCreate(data = {}) {
            return this.cartMiddleware(() => {
                return useApiClient().transactionCreate(this.cart.id, data)
            })
        },
    }
})