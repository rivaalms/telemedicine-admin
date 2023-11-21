<template>
<main class="h-screen">
   <div class="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 h-full">
      <div class="bg-gradient-to-br from-primary-600 to-primary-800 px-4 py-12 flex flex-col items-center">
         <img src="/img/HealthID-inline-white.png" alt="telemedicine" class="p-8">

         <div class="text-white self-stretch px-6">
            <p class="text-center text-sm mb-4">
               Silakan masukkan Email dan Password untuk login
            </p>
            <u-form
               :schema="validationSchema"
               :state="state"
               :validate-on="['submit']"
               @submit.prevent="submit"
            >
               <u-form-group
                  label="Email"
                  name="email"
                  class="mb-4"
                  :ui="formGroupUI"
                  size="lg"
               >
                  <u-input
                     v-model="state.email"
                     type="email"
                     icon="i-heroicons-at-symbol"
                     :disabled="loading"
                  ></u-input>
               </u-form-group>

               <u-form-group
                  label="Password"
                  name="password"
                  class="mb-4"
                  :ui="formGroupUI"
                  size="lg"
               >
                  <u-input
                     v-model="state.password"
                     type="password"
                     icon="i-heroicons-key"
                     :disabled="loading"
                  ></u-input>
               </u-form-group>

               <div class="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
                  <p>
                     Lupa kata sandi? <nuxt-link to="/forgot-password" class="text-white underline hover:text-primary-100">Klik disini</nuxt-link>
                  </p>

                  <u-button
                     variant="outline"
                     color="white"
                     type="submit"
                     size="lg"
                     icon="i-heroicons-arrow-right-on-rectangle"
                     class="order-first sm:order-last"
                     :block="breakpoints.smaller(('sm')).value"
                     :loading="loading"
                  >
                     Masuk
                  </u-button>
               </div>
            </u-form>
         </div>
      </div>
      <template v-if="breakpoints.greaterOrEqual('lg').value">
         <div class="lg:col-span-2 2xl:col-span-3 bg-[url('/img/login.svg')] bg-no-repeat bg-center bg-contain"></div>
      </template>
   </div>
</main>

<u-notifications>
   <template #title="{ title }">
      <p class="font-semibold">{{ title }}</p>
   </template>
</u-notifications>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import * as yup from 'yup'

const breakpoints = useBreakpoints(breakpointsTailwind)
const store = useAppStore()
const authStore = useAuthStore()

definePageMeta({
   middleware: () => {
      const authStore = useAuthStore()
      if (authStore.isLoggedIn) return navigateTo('/')
   },
   layout: false
})

store.title = 'Login'
useHead({ title: store.getTitle })

const state : Ref<API.Request.Auth.Login> = ref({
   email: '',
   password: ''
})

const validationSchema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   password: yup.string().required('Password harus diisi')
})

const loading : Ref <boolean> = ref(false)

const formGroupUI : ComputedRef <{[key: string]: { [key: string]: string }}> = computed(() => {
   return {
      label: {
         base: "block font-medium text-white"
      }
   }
})

const submit = async () : Promise <void> => {
   loading.value = true

   await authStore.login(state.value!)
      .then(() => {
         store.notify('success', 'Log in berhasil!', 'login')
         navigateTo('/')
      })
      .catch((error: any) => {
         store.notify('error', 'Akun tidak terdaftar', 'login')
         state.value.password = ''
      })
      .finally(() => {
         loading.value = false
      })
}
</script>