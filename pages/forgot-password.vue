<template>
<main class="h-screen">
   <div class="h-full grid place-content-center">
      <u-card v-if="!isComplete">
         <template #header>
            <p class="font-semibold">{{ store.getTitle }}</p>
         </template>
            <p class="tracking-wide mb-4">
               Masukkan alamat email yang terhubung dengan akun Telemedicine Anda.
            </p>
            
            <u-form
               :schema="validationSchema"
               :state="state"
               :validate-on="['submit']"
               @submit.prevent="emailSubmit"
            >
               <u-form-group
                  label="Email"
                  name="email"
                  required
               >
               <u-input
                  v-model="state.email"
                  icon="i-heroicons-envelope"
                  :disabled="loading"
               ></u-input>
               </u-form-group>

               <div class="flex justify-between gap-2 mt-6">
                  <u-button
                     variant="ghost"
                     color="gray"
                     icon="i-heroicons-arrow-uturn-left"
                     @click.stop="navigateTo('/login')"
                  >
                     Batal
                  </u-button>

                  <u-button
                     icon="i-heroicons-paper-airplane"
                     type="submit"
                  >
                     Kirim
                  </u-button>
               </div>
            </u-form>
      </u-card>

      <u-card v-else>
         <div class="grid gap-4">
            <p>
               Email telah dikirim. Silakan cek email Anda untuk mengatur ulang kata sandi.
            </p>

            <u-button
               block
               variant="soft"
               icon="i-heroicons-arrow-uturn-left"
               @click.stop="navigateTo('/login')"
            >
               Kemali ke Halaman Login
            </u-button>
         </div>
      </u-card>
   </div>
</main>
</template>

<script setup lang="ts">
import { forgotPasswordByEmail } from '@/utils/api/auth'
import * as yup from 'yup'

const store = useAppStore()

definePageMeta({
   middleware: () => {
      const authStore = useAuthStore()
      if (authStore.isLoggedIn) return navigateTo('/')
   },
   layout: false
})

store.title = 'Lupa Kata Sandi'
useHead({ title: store.getTitle })

const loading : Ref <boolean> = ref(false)
const isComplete : Ref <boolean> = ref(false)

const state : Ref <{ email: string }> = ref({
   email: ''
})

const validationSchema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
})

const emailSubmit = async () : Promise <void> => {
   loading.value = true
   await forgotPasswordByEmail(state.value.email)
      .then((resp) => {
         isComplete.value = true
         store.notify('success', 'Email berhasil dikirim')
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data?.messages || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>