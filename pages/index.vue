<script setup>
import { ref, computed } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { VTextField, VMenu } from "vuetify/components";

const selectedDate = ref(null);
const selectedTime = ref(null);
const timeMenu = ref(false);

const formatted = computed(() => {
  if (!selectedDate.value || !selectedTime.value) return "No date & time selected";

  const [hh, mm] = selectedTime.value.split(':');
  const datetime = new Date(selectedDate.value);
  datetime.setHours(Number(hh));
  datetime.setMinutes(Number(mm));

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(datetime);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
    <div class="flex flex-col items-center gap-3 text-center mb-8">
      <h1 class="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
        <span class="text-blue-500">📅</span>
        <span> Schedule Your Event</span>
      </h1>
      <p class="text-md text-blue-600 font-semibold mt-2 px-4 py-2 bg-blue-50 rounded-lg shadow-sm">
        {{ formatted }}
      </p>
    </div>

    <v-app>
      <v-container class="bg-white rounded-2xl p-8 shadow-lg w-[360px] border border-gray-100">
        <v-date-input
          v-model="selectedDate"
          label="Select Date"
          variant="outlined"
          density="comfortable"
          color="blue-lighten-1"
          class="mb-6 rounded-lg"
          clearable
      
        />

        <v-menu v-model="timeMenu" :close-on-content-click="false" transition="scale-transition">
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Select Time"
              v-model="selectedTime"
              variant="outlined"
              density="comfortable"
              readonly
              placeholder="HH:mm"
              class="w-full rounded-lg"
              color="blue-lighten-1"
              clearable
              prepend-inner-icon="mdi-clock-time-four-outline"
            />
          </template>

          <v-time-picker
            v-model="selectedTime"
            format="24hr"
            full-width
            color="blue"
            class="rounded-lg shadow-xl"
          >
            <template #actions>
              <v-spacer></v-spacer>
              <v-btn color="grey-darken-1" variant="text" @click="timeMenu = false">Cancel</v-btn>
              <v-btn color="blue" variant="text" @click="timeMenu = false">OK</v-btn>
            </template>
          </v-time-picker>
        </v-menu>
      </v-container>
    </v-app>
  </div>
</template>

<style scoped>
.v-menu__content {
  z-index: 999 !important;
}

.v-field--variant-outlined .v-field__outline {
  border-color: rgba(0, 0, 0, 0.1) !important;
}

.v-field--variant-outlined.v-field--focused .v-field__outline {
  border-width: 2px !important;
  border-color: #2196F3 !important;
}
</style>
