<script setup>
import Translate from "@/components/Translate.vue";

const props = defineProps({
    modelValue: String,
    type: String,
    label: String,
    placeholder: String,
    required: Boolean,
    errors: Object,
})

defineEmits([
    'update:modelValue'
])

const id = props.label
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
</script>

<template>
    <div class="relative"
         :class="{ 'text-red-500' : errors }"
    >
        <label :for="id"
               class="absolute block px-4 pt-3 text-xs opacity-50"
        >
            <Translate :me="label"/>
            <span v-if="required"
                  class="text-blue-500"
                  :class="{ 'text-red-500' : errors }"
            >*</span>
        </label>
        <input
            :type="type"
            :id="id"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full px-4 pt-7 pb-3 rounded border border-gray-200"
            :class="{ 'border-red-300' : errors }"
        />

        <ul v-if="errors"
            class="p-2 text-xs text-red-500">
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </div>
</template>