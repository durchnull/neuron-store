<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useCartStore} from "@/stores/CartStore";
import FormInput from "@/components/Checkout/Form/FormInput.vue";
import Headline from "@/components/Headline.vue";
import ActionsContainer from "@/components/Checkout/ActionsContainer.vue";
import BackButton from "@/components/Checkout/Buttons/BackButton.vue";
import Translate from "@/components/Translate.vue";
import ButtonLoading from "@/components/ButtonLoading.vue";
import Button from "@/components/Checkout/Buttons/Button.vue";

const cartStore = useCartStore()

const customer = cartStore.cart.customer
const shippingAddress = cartStore.cart.shipping_address

const errors = ref(null)

const email = ref(customer ? customer.email : '')
const phone = ref(customer ? customer.phone : '')
const note = ref(customer ? customer.note : '')

const salutation = ref(shippingAddress ? shippingAddress.salutation : '')
const firstName = ref(shippingAddress ? shippingAddress.first_name : '')
const lastName = ref(shippingAddress ? shippingAddress.last_name : '')
const street = ref(shippingAddress ? shippingAddress.street : '')
const number = ref(shippingAddress ? shippingAddress.number : '')
const postalCode = ref(shippingAddress ? shippingAddress.postal_code : '')
const city = ref(shippingAddress ? shippingAddress.city : '')
const countryCode = ref(shippingAddress ? shippingAddress.country_code : '')

const router = useRouter()

const updateCustomer = async (event) => {
    try {
        await cartStore.updateCustomer(
            email.value,
            phone.value,
            note.value,
            {
                salutation: salutation.value,
                // company: company.value,
                first_name: firstName.value,
                last_name: lastName.value,
                street: street.value,
                number: number.value,
                // additional: additional.value,
                postal_code: postalCode.value,
                city: city.value,
                country_code: countryCode.value,
            },
        );

        await router.push({name: 'shipping'})
    } catch (error) {
        errors.value = error.messages
    }
};

const defaults = () => {
    email.value = 'john@doe.de'
    phone.value = '+49123456788'
    note.value = 'This is a customer note'
    salutation.value = 'mr'
    firstName.value = 'John'
    lastName.value = 'Doe'
    street.value = 'Johnstreet'
    number.value = '10'
    postalCode.value = '10249'
    city.value = 'Berlin'
    countryCode.value = 'DE'
}
</script>
<template>
    <button @click="defaults()"
            class="bg-gray-100 p-2 text-gray-500 rounded my-4 hover:bg-gray-200"
    >defaults
    </button>

    <form @submit.prevent="updateCustomer">
        <Headline>Contact</Headline>
        <div class="grid grid-cols-2 gap-4 my-4">
            <FormInput type="email"
                       v-model="email"
                       :required="true"
                       label="Email"
                       placeholder="john@doe.com"
                       :errors="errors?.['email']"
            />
            <FormInput type="text"
                       v-model="phone"
                       label="Phone"
                       placeholder="+49123456789"
                       :errors="errors?.['phone']"
            />
            <FormInput type="text"
                       v-model="note"
                       label="note"
                       placeholder="Special note for the order"
                       class="col-span-2"
                       :errors="errors?.['note']"
            />
        </div>
        <Headline>
            <Translate me="shipping-address"/>
        </Headline>
        <div class="grid grid-cols-2 gap-4">
            <FormInput type="text"
                       v-model="salutation"
                       :required="true"
                       label="Salutation"
                       placeholder="Mr"
                       class="col-span-2"
                       :errors="errors?.['shipping_address.salutation']"
                       @keyup="delete errors?.['shipping_address.salutation']"
            />
            <FormInput type="text"
                       v-model="firstName"
                       :required="true"
                       label="First Name"
                       placeholder="John"
                       :errors="errors?.['first_name']"
            />
            <FormInput type="text"
                       v-model="lastName"
                       :required="true"
                       label="Last Name"
                       placeholder="Doe"
                       :errors="errors?.['last_name']"
            />
            <FormInput type="text"
                       v-model="street"
                       :required="true"
                       label="Street"
                       placeholder="Musterstrasse"
                       :errors="errors?.['street']"
            />
            <FormInput type="text"
                       v-model="number"
                       :required="true"
                       label="Number"
                       placeholder="12a"
                       :errors="errors?.['number']"
            />
            <FormInput type="text"
                       v-model="postalCode"
                       :required="true"
                       label="Postal code"
                       placeholder="10249"
                       :errors="errors?.['postal_code']"
            />
            <FormInput type="text"
                       v-model="city"
                       :required="true"
                       label="City"
                       placeholder="Berlin"
                       :errors="errors?.['city']"
            />
            <FormInput type="text"
                       v-model="countryCode"
                       :required="true"
                       label="Country code"
                       placeholder="DE"
                       :errors="errors?.['country_code']"
            />
        </div>
        <ActionsContainer>
            <router-link :to="{ name: 'cart' }">
                <BackButton>
                    <Translate me="back-to-cart"/>
                </BackButton>
            </router-link>
            <Button type="submit">
                <Translate me="select-shipping-method"/>
                <ButtonLoading/>
            </Button>
        </ActionsContainer>
    </form>
</template>