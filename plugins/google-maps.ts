import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin(nuxtApp => {
   nuxtApp.vueApp.use(VueGoogleMaps, {
      load: {
         key: useRuntimeConfig().public.gmapKey,
         libraries: 'places'
      }
   })
})