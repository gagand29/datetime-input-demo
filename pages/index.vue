<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8"
  >
    <!-- Header -->
    <div class="flex flex-col items-center gap-2 text-center mb-8">
      <h1 class="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
        <span class="text-blue-500">📅</span>
        <span>Schedule Your Event</span>
      </h1>

      <div class="mt-2 text-blue-700 font-semibold text-center">
        <span class="text-sm text-gray-500">Selected date and time is:</span>
        <span class="ml-2">
          {{ selectedDate ? selectedDate.toLocaleString() : "None selected" }}
        </span>
      </div>
    </div>

    <!-- Card with DateTimeInput + Submit -->
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      class="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md flex flex-col items-center"
    >
      <DateTimeInput v-model="selectedDate" />
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, useForm } from "vee-validate";
import * as yup from "yup";
import DateTimeInput from "~/components/DateTimeInput.vue";

const selectedDate = ref(null);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    date: yup
      .date()
      .typeError("Invalid format: YYYY-MM-DD HH:mm")
      .required("Date/time is required"),
  }),
});

const onSubmit = handleSubmit((values) => {
  selectedDate.value = values.date;
  console.log("✅ Submitted:", values.date);
});
</script>
