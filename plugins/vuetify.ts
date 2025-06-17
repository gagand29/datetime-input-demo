// plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import {VTimePicker} from 'vuetify/labs/VTimePicker'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      VDateInput, 
      VTimePicker,
    },
    directives,
    icons: {
      defaultSet: 'mdi', 
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
