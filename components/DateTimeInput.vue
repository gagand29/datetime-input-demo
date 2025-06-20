<template>
  <div class="datetime-input max-w-md mx-auto w-full">
    <Field
      name="date"
      :rules="dateRules"
      v-slot="{ field, errorMessage, meta, setTouched, setValue }"
    >
      <VueDatePicker
        v-model="pickerValue"
        mode="dateTime"
        :format="format"
        placeholder="YYYY-MM-DD HH:mm"
        clearable
        text-input
        class="w-full"
        :class="{
          'dp-error': meta.touched && errorMessage,
          'dp-success': meta.touched && !errorMessage && pickerValue,
        }"
        @update:model-value="(val) => handleSelect(val, setValue)"
        @text-input="
          (input, isValid) => handleTextInput(input, isValid, setValue, meta)
        "
        @blur="() => setTouched(true)"
      />

      <p
        v-if="meta.touched && errorMessage"
        class="text-red-600 text-sm mt-1 font-semibold"
      >
        {{ errorMessage }}
      </p>
      <p v-else class="text-xs text-gray-500 mt-1">
        Format: <span class="font-mono">{{ format }}</span> (e.g., 2024-12-25
        14:30)
      </p>
    </Field>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Field } from "vee-validate";
import * as yup from "yup";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({ modelValue: Date });
const emit = defineEmits(["update:modelValue"]);

const format = "yyyy-MM-dd HH:mm";
const pickerValue = ref(props.modelValue ?? null);

watch(
  () => props.modelValue,
  (val) => {
    pickerValue.value = val;
  }
);

const dateRules = yup
  .date()
  .typeError(`Invalid format: ${format}`)
  .required("Date/time is required and must follow the format YYYY-MM-DD HH:mm");

function handleSelect(val, setValue) {
  pickerValue.value = val;
  if (val instanceof Date && !isNaN(val)) {
    setValue(val);
    emit("update:modelValue", val);
  }
}

function handleTextInput(input, isValid, setValue, meta) {
  // Only mark as touched on blur, not while typing
  if (isValid) {
    const parsed = new Date(input);
    if (!isNaN(parsed)) {
      setValue(parsed);
      pickerValue.value = parsed;
      emit("update:modelValue", parsed);
      return;
    }
  }
  setValue(null);
  emit("update:modelValue", null);
}
</script>

<style scoped>
::v-deep(.dp__input) {
  border-color: #d1d5db !important; /* default gray-300 */
  border-width: 1px;
  transition: border 0.2s;
}
::v-deep(.dp-error .dp__input) {
  border-color: #f87171 !important; /* red-400 */
  border-width: 2px;
}
::v-deep(.dp-success .dp__input) {
  border-color: #22c55e !important; /* green-500 */
  border-width: 2px;
}
</style>
