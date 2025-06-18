<template>
  <div class="datetime-input max-w-md mx-auto">
    <VueDatePicker
      v-model="internal"
      mode="dateTime"
      :text-input="true"
      :format="format"
      placeholder="YYYY-MM-DD HH:mm"
      clearable
      :class="{ 'border-red-500': !!error }"
      @text-input="onTextInput"
      @update:model-value="onUpdate"
    />
    <p class="text-xs text-gray-500 mt-1">
      Format: <span class="font-mono">YYYY-MM-DD HH:mm</span> (e.g., 2024-12-25
      14:30)
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
const internal = ref(props.modelValue);
const rawInput = ref("");
const error = ref("");

function onTextInput(value, isValid) {
  rawInput.value = value;
  if (!value) {
    error.value = "";
    emit("update:modelValue", null);
    return;
  }
  if (!isValid) {
    error.value =
      "Invalid format. Use: YYYY-MM-DD HH:mm (e.g., 2024-12-25 14:30)";
    emit("update:modelValue", null);
  } else {
    error.value = "";
  }
}

function onUpdate(val) {
  error.value = "";
  rawInput.value = formatVal(val);
  emit("update:modelValue", val);
}

watch(
  () => props.modelValue,
  (v) => {
    rawInput.value = v ? formatVal(v) : "";
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
</script>

<style scoped>
.datetime-input input {
  transition: border 0.2s, box-shadow 0.2s;
}
.datetime-input input:focus {
  outline: none;
}
</style>
