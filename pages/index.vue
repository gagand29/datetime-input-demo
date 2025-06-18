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
        <span class="ml-2">{{
          appointment ? appointment.toLocaleString() : "None selected"
        }}</span>
      </div>
    </div>

    <!-- Card with DateTimeInput -->
    <div
      class="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md border border-gray-100 flex flex-col items-center"
    >
      <DateTimeInput v-model="appointment" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DateTimeInput from "~/components/DateTimeInput.vue";

const appointment = ref(null);
</script>
