Sure! Here's your complete, clean `README.md` content — just copy and paste it into your `README.md` file:

````markdown
# 📅 Nuxt 3 + Vuetify Date & Time Picker

This is a simple project I made using **Nuxt 3** and **Vuetify**.  
Users can select a **date** and **time**, and see the selected value formatted nicely below.

---

## Preview

> Make sure the images are inside your `/public` folder.

![Date Picker](./public/screenshot.png)  
![Time Picker](./public/Screenshot2.png)  
![Formatted Output](./public/Screenshot3.png)

---

## How I Set It Up

### 1. Create Nuxt App

```bash
npx nuxi init datetime-input-demo
cd datetime-input-demo
npm install
````

### 2. Install Vuetify

```bash
npm install vuetify
```

### 3. Create Vuetify Plugin

In `plugins/vuetify.ts`, I added:

```ts
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
```

### 4. Import Styles Globally

In `app.vue` or root setup:

```vue
<script setup>
import 'vuetify/styles'
</script>
```

---