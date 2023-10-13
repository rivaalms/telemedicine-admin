// @ts-ignore
import VoerroTagsInput from '@voerro/vue-tagsinput'

export default defineNuxtPlugin(nuxtApp => {
   nuxtApp.vueApp.component('tags-input', VoerroTagsInput)
})