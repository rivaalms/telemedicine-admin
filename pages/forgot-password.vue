<template>
<main class="h-screen">
   <div class="h-full grid place-content-center">
      <u-card v-if="!isComplete">
         <template #header>
            <p class="font-semibold">{{ store.getTitle }}</p>
         </template>

         <template v-if="!isOTP">
            <template v-if="!type">
               <p class="tracking-wide mb-4">
                  Permintaan akan kami kirimkan melalui salah satu kontak yang Anda pilih.
               </p>
      
               <div class="grid grid-cols-2 gap-2">
                  <u-button
                     variant="ghost"
                     icon="i-heroicons-envelope"
                     block
                     @click.stop="type = 'email'"
                  >
                     Kirim via Email
                  </u-button>
      
                  <u-button
                     variant="ghost"
                     icon="i-heroicons-device-phone-mobile"
                     block
                     @click.stop="type = 'phone'"
                  >
                     Kirim via SMS
                  </u-button>
               </div>
   
               <div class="flex justify-start gap-2 mt-6">
                  <u-button
                     variant="ghost"
                     color="gray"
                     icon="i-heroicons-arrow-uturn-left"
                     @click.stop="() => navigateTo('/login')"
                  >
                     Batalkan
                  </u-button>
               </div>
            </template>
   
            <template v-if="type === 'email'">
               <p class="tracking-wide mb-4">
                  Masukkan alamat email yang terhubung dengan akun Telemedicine Anda.
               </p>
               
               <u-form
                  :schema="validationSchema"
                  :state="emailState"
                  :validate-on="['submit']"
                  @submit.prevent="emailSubmit"
               >
                  <u-form-group
                     label="Email"
                     name="email"
                     required
                  >
                  <u-input
                     v-model="emailState.email"
                     icon="i-heroicons-envelope"
                     :disabled="loading"
                  ></u-input>
                  </u-form-group>
   
                  <div class="flex justify-between gap-2 mt-6">
                     <u-button
                        variant="ghost"
                        color="gray"
                        icon="i-heroicons-arrow-uturn-left"
                        @click.stop="type = null"
                     >
                        Kembali
                     </u-button>
   
                     <u-button
                        icon="i-heroicons-paper-airplane"
                        type="submit"
                     >
                        Kirim
                     </u-button>
                  </div>
               </u-form>
            </template>
   
            <template v-if="type === 'phone'">
               <u-form
                  :schema="validationSchema"
                  :state="phoneState"
                  :validate-on="['submit']"
                  @submit.prevent="phoneSubmit"
               >
   
                  <div class="grid gap-4">
                     <u-form-group
                        label="Nomor Telepon"
                        name="phone_number"
                        required
                     >
                     <u-input
                        v-model="phoneState.phone_number"
                        icon="i-heroicons-device-phone-mobile"
                        :disabled="loading"
                     ></u-input>
                     </u-form-group>
      
                     <u-form-group
                        label="Kata Sandi Baru"
                        name="password"
                        required
                     >
                        <u-input
                           v-model="phoneState.password"
                           icon="i-heroicons-key"
                           :disabled="loading"
                           type="password"
                        ></u-input>
                     </u-form-group>
      
                     <u-form-group
                        label="Konfirmasi Kata Sandi"
                        name="password_confirmation"
                        required
                     >
                        <u-input
                           v-model="phoneState.password_confirmation"
                           icon="i-heroicons-key"
                           :disabled="loading"
                           type="password"
                        ></u-input>
                     </u-form-group>
                  </div>
   
                  <div class="flex justify-between gap-2 mt-6">
                     <u-button
                        variant="ghost"
                        color="gray"
                        icon="i-heroicons-arrow-uturn-left"
                        @click.stop="type = null"
                     >
                        Kembali
                     </u-button>
   
                     <u-button
                        icon="i-heroicons-paper-airplane"
                        type="submit"
                     >
                        Kirim
                     </u-button>
                  </div>
   
                  <p class="text-sm text-center mt-6">
                     Kami akan mengirimkan kode OTP untuk mengonfirmasi permintaan lupa kata sandi
                  </p>
               </u-form>
            </template>
         </template>

         <lazy-dialog-profile-otp-form
            v-else
            :hash="hash"
            :phone-number="phoneState.phone_number"
            type="password"
            @otp-success="isComplete = true"
         ></lazy-dialog-profile-otp-form>
      </u-card>

      <u-card v-else>
         <div class="grid gap-4">
            <p v-if="type === 'email'">
               Email telah dikirim. Silakan cek email Anda untuk mengatur ulang kata sandi.
            </p>
            <p v-if="type === 'phone'">
               Kata sandi berhasil disetel ulang. Silakan login kembali menggunakan kata sandi baru.
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
import { forgotPasswordByPhoneNumber, forgotPasswordByEmail } from '@/utils/api/auth'
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

const type : Ref <'email' | 'phone' | null> = ref(null)
const loading : Ref <boolean> = ref(false)
const isOTP : Ref <boolean> = ref(false)
const hash : Ref <string | null> = ref(null)
const isComplete : Ref <boolean> = ref(false)

const emailState : Ref <{ email: string }> = ref({
   email: ''
})

const phoneState : Ref <{ [key: string]: string }> = ref({
   phone_number: '',
   password: '',
   password_confirmation: ''
})

const validationSchema = yup.object({
   email: yup.string().email('Email tidak valid').test('email', 'Email harus diisi', (val) => {
      if (type.value === 'phone') return true
      if (type.value === 'email' && val?.length! > 0) return true
      return false
   }),
   phone_number: yup.string().test('phone', 'No. Telepon harus diisi', (val) => {
      if (type.value === 'email') return true
      if (type.value === 'phone' && val?.length! > 0) return true
      return false
   }),
   password: yup.string().test('password', 'Kata sandi harus diisi', (val) => {
      if (type.value === 'email') return true
      if (type.value === 'phone' && val?.length! > 0) return true
      return false
   }).min(8, 'Kata sandi harus berisi minimal ${min} karakter'),
   password_confirmation: yup.string().test('password_confirmation', 'Konfirmasi kata sandi tidak sama dengan kata sandi', (val) => {
      if (type.value === 'phone' && val === phoneState.value.password) return true
      if (type.value === 'email') return true
      return false
   })
})

const emailSubmit = async () => {
   loading.value = true
   await forgotPasswordByEmail(emailState.value.email)
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

const phoneSubmit = async () => {
   loading.value = true
   await forgotPasswordByPhoneNumber(phoneState.value)
      .then((resp) => {
         hash.value = resp
         store.notify('info', 'OTP telah dikirim. Silakan memasukkan kode OTP untuk melakukan verifikasi.')
         isOTP.value = true
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data?.messages || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>