<template>
  <div class="datetime-input max-w-md mx-auto">
    <VueDatePicker
      v-model="internal"
      mode="dateTime"
      :text-input="{ format }"
      :format="format"
      placeholder="YYYY-MM-DD HH:mm"
      clearable
      @update:model-value="onUpdate"
      @blur="onBlur"
      class="w-full border rounded-md p-2 focus-within:ring"
      :class="
        error ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-blue-200'
      "
    />
    <p
      v-if="error && internal !== null"
      class="text-red-600 text-sm mt-1 font-semibold"
    >
      {{ error }}<br />
      <span class="text-xs text-gray-500 font-normal">
        Format: <span class="font-mono">YYYY-MM-DD HH:mm</span> (e.g.,
        2024-12-25 14:30)
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);

const format = "yyyy-MM-dd HH:mm";
const displayValue = ref(props.modelValue ? formatVal(props.modelValue) : "");
const internal = ref(props.modelValue);
const error = ref("");

// Watch the internal value for changes (from typing or picking)
watch(internal, (val) => {
  const str = formatVal(val);
  if (!val) {
    error.value =
      "Date/time is required. Format: YYYY-MM-DD HH:mm (e.g., 2024-12-25 14:30)";
    emit("update:modelValue", null);
    return;
  }
  // Strict format and value validation
  const formatPattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (!/^\d{4}/.test(str)) {
    error.value = "Year must start with 4 digits (e.g., 2024)";
    emit("update:modelValue", null);
    return;
  }
  if (/[^\d-]/.test(str.slice(0, 10))) {
    error.value = "Date part must use only digits and dashes (YYYY-MM-DD)";
    emit("update:modelValue", null);
    return;
  }
  if (!formatPattern.test(str)) {
    error.value =
      "Invalid format. Use: YYYY-MM-DD HH:mm (e.g., 2024-12-25 14:30)";
    emit("update:modelValue", null);
    return;
  }
  // Parse as date
  const [datePart, timePart] = str.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const date = new Date(year, month - 1, day, hour, minute);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    error.value =
      "Invalid date/time value (e.g., February 30th does not exist)";
    emit("update:modelValue", null);
    return;
  }
  // All good
  error.value = "";
  emit("update:modelValue", date);
});

// Keep displayValue in sync with parent modelValue
watch(
  () => props.modelValue,
  (v) => {
    displayValue.value = v ? formatVal(v) : "";
    internal.value = v;
    error.value = "";
  }
);

function formatVal(dt) {
  if (!dt) return "";
  const yyyy = dt.getFullYear();
  const MM = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  const HH = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
}

function onBlur() {
  // If error, re-open the picker (pseudo-code, depends on picker API)
  if (error.value) {
    // Try to re-focus or re-open the picker
    // e.g., this.$refs.datepicker.open() or similar
  }
}
</script>

<style scoped>
.datetime-input input {
  transition: border 0.2s, box-shadow 0.2s;
}
.datetime-input input:focus {
  outline: none;
}
</style>
