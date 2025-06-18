<template>
  <div class="datetime-input max-w-md mx-auto w-full">
    <Field name="date" :rules="dateRules" v-slot="{ field, errors, meta }">
      <VueDatePicker
        v-model="field.value"
        mode="dateTime"
        :format="format"
        placeholder="YYYY-MM-DD HH:mm"
        clearable
        text-input
        class="w-full"
        :class="{ 'dp-error': meta.touched && errors.length }"
      />

      <p v-if="meta.touched && errors[0]" class="text-red-600 text-sm mt-1 font-semibold">
        {{ errors[0] }}
      </p>
      <p v-else class="text-xs text-gray-500 mt-1">
        Format: <span class="font-mono">{{ format }}</span> (e.g., 2024-12-25 14:30)
      </p>
    </Field>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import * as yup from "yup";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const format = "yyyy-MM-dd HH:mm";

const dateRules = yup
  .date()
  .typeError(`Invalid format: ${format}`)
  .required("Date/time is required");
</script>

<style scoped>
::v-deep(.dp-error .dp__input) {
  border-color: #f87171 !important;
  border-width: 2px;
}
</style>
