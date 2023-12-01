import {useLoadingStore} from "@/stores/LoadingStore";

const requestInit = (token, method, body = null) => {
    return {
        mode: "cors",
        credentials: "same-origin",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: method,
        body: (body !== null && typeof body === 'object') ? JSON.stringify(body) : null,
    }
}

const middleware = async (promise) => {
    return await promise
        .then(response => {
            useLoadingStore.setLoading(false)

            if (!response.ok) {
                return response.json().then(response => {
                    const error = new Error('Cart Error')
                    error.code = response?.code || 'cart-error'
                    error.messages = response?.messages || {}

                    throw error;
                });
            }

            console.log(response.status, response.url)

            return response
        })
        .then(response => response.json())
        .then(response => response.data)
}

class ApiClient {
    constructor(url, token) {
        this.url = url
        this.token = token
    }
    async _get(endpoint) {
        useLoadingStore.setLoading(true)

        return middleware(
            fetch(
                this.url + endpoint,
                requestInit(this.token, 'GET')
            )
        )
    }
    async _post(endpoint, parameters) {
        useLoadingStore.setLoading(true)

        return middleware(
            fetch(
                this.url + endpoint,
                requestInit(this.token, 'POST', parameters)
            )
        )
    }
    async options() {
        return this._get('/cart/options')
    }
    async get(id) {
        return this._get('/cart/' + id)
    }
    async create(shippingId, paymentId) {
        return this._post('/cart/create', {
            shipping_id: shippingId,
            payment_id: paymentId,
        })
    }
    async itemAdd(cartId, productId, quantity, configuration = null) {
        return this._post('/cart/item/add', {
            cart_id: cartId,
            product_id: productId,
            quantity: quantity,
            configuration: configuration,
        })
    }
    async itemRemove(cartId, cartItemId) {
        return this._post('/cart/item/remove', {
            cart_id: cartId,
            cart_item_id: cartItemId,
        })
    }
    async updateCustomer(cartId, email, phone = null, note = null, shippingAddress, billingAddress = null) {
        return this._post('/cart/update/customer', {
            cart_id: cartId,
            email: email,
            phone: phone || null,
            note: note || null,
            shipping_address: {
                salutation: shippingAddress.salutation,
                company: shippingAddress.company || null,
                first_name: shippingAddress.first_name,
                last_name: shippingAddress.last_name,
                street: shippingAddress.street,
                number: shippingAddress.number,
                additional: shippingAddress.additional || null,
                postal_code: shippingAddress.postal_code,
                city: shippingAddress.city,
                country_code: shippingAddress.country_code,
            },
            billing_address: billingAddress !== null
                ? {
                    salutation: billingAddress.salutation,
                    company: billingAddress.company || null,
                    first_name: billingAddress.first_name,
                    last_name: billingAddress.last_name,
                    street: billingAddress.street,
                    number: billingAddress.number,
                    additional: billingAddress.additional || null,
                    postal_code: billingAddress.postal_code,
                    city: billingAddress.city,
                    country_code: billingAddress.country_code,
                } : null
        })
    }
    async couponRedeem(cartId, code) {
        return this._post('/cart/coupon/redeem', {
            cart_id: cartId,
            code: code,
        })
    }
    async couponRemove(cartId, code) {
        return this._post('/cart/coupon/remove', {
            cart_id: cartId,
            code: code,
        })
    }
    async updateShipping(cartId, shippingId) {
        return this._post('/cart/update/shipping', {
            cart_id: cartId,
            shipping_id: shippingId,
        })
    }
    async updatePayment(cartId, paymentId) {
        return this._post('/cart/update/payment', {
            cart_id: cartId,
            payment_id: paymentId,
        })
    }
    async amazonPayButton(cartId) {
        return this._post('/cart/amazon-pay-button', {
            cart_id: cartId,
        })
    }
    async transactionCreate(cartId, data = {}) {
        return this._post('/cart/transaction/create', {
            cart_id: cartId,
            ...data
        })
    }
    async place(cartId, paymentData = {}) {
        return this._post('/cart/place', {
            cart_id: cartId,
            payment_data: paymentData
        })
    }
}

let apiClient = null;

export function useApiClient(url, token) {
    if (!apiClient) {
        apiClient = new ApiClient(url, token);
    }
    return apiClient;
}