📅 Nuxt 3 + Vuetify Date & Time Picker
This is a simple project I made using Nuxt 3 and Vuetify where users can select a date and time, and see the selected value formatted below.
![Preview](./screenshot.png)
![Preview](./screenshot2.png)

 How I Set It Up
1. Create Nuxt App
bash
Copy
Edit
npx nuxi init datetime-input-demo
cd datetime-input-demo
npm install
2. Install Vuetify
bash
Copy
Edit
npm install vuetify
3. Setup Vuetify Plugin
Created a file plugins/vuetify.ts and added:

ts
Copy
Edit
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labs,
    },
    directives,
    ssr: true,
  })

  nuxtApp.vueApp.use(vuetify)
})
4. Add styles in app.vue
vue
Copy
Edit
<script setup>
import 'vuetify/styles'
</script>
Features
Clean & simple UI

Works on desktop and mobile

Uses Vuetify labs VDateInput and VTimePicker

Time picker opens on click with "OK" and "Cancel"

Shows selected date & time

