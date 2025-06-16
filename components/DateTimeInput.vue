<script setup>
import { ref, computed, watch } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'

const props = defineProps({
  label: String,
  modelValue: Date,
  mode: {
    type: String,
    default: 'both' // 'date', 'time', or 'both'
  }
})

const emit = defineEmits(['update:modelValue'])

const date = ref(null)
const time = ref(null)
const timeMenu = ref(false)

//combine both value
const combinedDateTime = computed(() => {
  if (props.mode === 'date') return date.value

  if (props.mode === 'time') {
    if (!props.modelValue || !time.value) return null
    const [hh, mm] = time.value.split(':').map(Number)
    const updated = new Date(props.modelValue)
    updated.setHours(hh)
    updated.setMinutes(mm)
    return updated
  }

  if (!date.value || !time.value) return null
  const [hh, mm] = time.value.split(':').map(Number)
  const result = new Date(date.value)
  result.setHours(hh)
  result.setMinutes(mm)
  return result
})

watch(combinedDateTime, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Show Date Picker -->
    <VDateInput
      v-if="mode !== 'time'"
      v-model="date"
      :label="label || 'Select Date'"
      class="w-full"
    />

    <!-- Show Time Picker -->
    <VMenu
      v-if="mode !== 'date'"
      v-model="timeMenu"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <VTextField
          v-bind="props"
          :label="label || 'Select Time'"
          v-model="time"
          readonly
          placeholder="HH:mm"
        />
      </template>
      <VTimePicker v-model="time" format="24hr" />
    </VMenu>
  </div>
</template>
