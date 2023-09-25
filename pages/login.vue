<template>
<main class="h-screen">
   <div class="grid grid-cols-4 gap-4 h-full">
      <div class="bg-froly-400 px-4 py-12 flex flex-col items-center">
         <img src="/img/telemedicine.png" alt="telemedicine" class="">

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
                     :disabled="loading"
                  ></u-input>
               </u-form-group>

               <div class="flex justify-between">
                  <p>
                     Lupa Password? <a href="javascript:void(0)" class="text-white underline hover:text-froly-100">Klik disini</a>
                  </p>

                  <u-button
                     variant="outline"
                     color="white"
                     type="submit"
                     size="lg"
                     :loading="loading"
                  >
                     Masuk
                  </u-button>
               </div>
            </u-form>
         </div>
      </div>
      <div class="col-span-3 bg-[url('/img/login.svg')] bg-no-repeat bg-center bg-contain"></div>
   </div>
</main>
</template>

<script setup lang="ts">
import * as yup from 'yup'

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

const state : Ref<API.Payload.Login> = ref({
   email: '',
   password: ''
})

const validationSchema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   password: yup.string().required('Password harus diisi')
})

const loading : Ref <boolean> = ref(false)

const formGroupUI = computed(() => {
   return {
      "label": {
         "base": "block font-medium text-white"
      }
   }
})

const submit = async () => {
   loading.value = true

   await authStore.login(state.value!)
      .then(() => useRouter().push('/'))
      .catch((error: any) => {
         console.log(error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>