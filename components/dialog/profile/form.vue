<template>
<u-form
   v-if="!isOTP"
   :schema="isEmail ? validationSchemaEmail : validationSchemaPhone"
   :state="isEmail ? stateEmail : statePhone"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div v-if="isEmail" class="grid gap-4">
      <u-form-group
         label="Kata Sandi"
         name="password"
         required
      >
         <u-input
            v-model="stateEmail.password"
            :disabled="loading"
            type="password"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Email"
         name="email"
         required
      >
         <u-input
            v-model="stateEmail.email"
            :disabled="loading"
         ></u-input>
      </u-form-group>
   </div>

   <div v-else class="grid gap-4">
      <u-form-group
         label="Kata Sandi"
         name="password"
         required
      >
         <u-input
            v-model="statePhone.password"
            :disabled="loading"
            type="password"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="No. Telepon"
         name="phone_number"
         required
      >
         <u-input
            v-model="statePhone.phone_number"
            :disabled="loading"
         ></u-input>
      </u-form-group>
   </div>

   <div class="flex justify-end gap-2 mt-6">
      <u-button
         variant="ghost"
         color="gray"
         icon="i-heroicons-arrow-uturn-left"
         :disabled="loading"
         @click.stop="store.clearDialog()"
      >
         Kembali
      </u-button>

      <u-button
         color="emerald"
         icon="i-heroicons-check"
         :loading="loading"
         type="submit"
      >
         Simpan
      </u-button>
   </div>
</u-form>

<lazy-dialog-profile-otp-form
   v-else
   type="phone"
   :phone-number="statePhone.phone_number"
></lazy-dialog-profile-otp-form>
</template>

<script setup lang="ts">
import { updateEmail, updatePhoneNumber } from '@/utils/api/auth'
import { Form } from '@nuxt/ui/dist/runtime/types';
import * as yup from 'yup'

namespace Form {
   export namespace Email {
      export type State = {
         email: string
         password: string
      }

      export type Schema = yup.ObjectSchema <{
         email: string
         password: string
      }>
   }

   export namespace Phone {
      export type State = {
         phone_number: string
         password: string
      }

      export type Schema = yup.ObjectSchema <{
         phone_number: string
         password: string
      }>
   }
}

const store = useAppStore()
const authStore = useAuthStore()

const loading : Ref <boolean> = ref(false)
const isEmail : ComputedRef <boolean> = computed(() => store.dialog.type.split('-')[1] === 'email')
const isOTP : Ref <boolean> = ref(false)

const stateEmail : Ref <Form.Email.State> = ref({
   email: '',
   password: ''
})

const statePhone : Ref <Form.Phone.State> = ref({
   phone_number: '',
   password: ''
})

const validationSchemaEmail : Form.Email.Schema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   password: yup.string().required('Kata sandi harus diisi')
})

const validationSchemaPhone : Form.Phone.Schema = yup.object({
   phone_number: yup.string().required('No. telepon harus diisi'),
   password: yup.string().required('Kata sandi harus diisi')
})

const submit = async () : Promise <void> => {
   loading.value = true

   try {
      if (isEmail.value) {
         await updateEmail(stateEmail.value)
            .then(() => {
               store.notify('info', `Tautan telah dikirim ke email Anda. Silakan cek email Anda untuk melakukan verifikasi. Anda akan dialihkan ke halaman login.`)
               store.clearDialog()

               setTimeout(() => {
                  authStore.logout()
                     .then(() => {
                        navigateTo('/login')
                     })
               }, 5000)
            })
      } else {
         await updatePhoneNumber(statePhone.value)
            .then((resp) => {
               store.notify('info', 'OTP telah dikirim ke nomor telepon baru Anda. Silakan masukkan kode OTP untuk melakukan verifikasi perubahan.')
               isOTP.value = true
            })
      }
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>