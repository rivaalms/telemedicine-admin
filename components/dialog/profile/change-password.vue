<template>
<u-form
   v-if="!isOTP"
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Kata Sandi Lama"
         name="old_password"
         required
      >
         <u-input
            v-model="(state.old_password as string)"
            type="password"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Kata Sandi Baru"
         name="password"
         required
      >
         <u-input
            v-model="(state.password as string)"
            type="password"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Konfirmasi Kata Sandi"
         name="password_confirmation"
         required
      >
         <u-input
            v-model="(state.password_confirmation as string)"
            type="password"
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
   type="password"
   :phone-number="authStore.getUser!.phone_number!"
   :hash="hash!"
></lazy-dialog-profile-otp-form>
</template>

<script setup lang="ts">
import { updatePassword } from '@/utils/api/auth'
import * as yup from 'yup'

namespace Form {
   export type State = {
      old_password: string | null
      password: string | null
      password_confirmation: string | null
      phone_number?: string
   }

   export type Schema = yup.ObjectSchema <{
      old_password: string
      password: string
      password_confirmation: string | undefined
   }>
}

const store = useAppStore()
const authStore = useAuthStore()
const loading : Ref <boolean> = ref(false)
const isOTP : Ref <boolean> = ref(false)
const hash : Ref <string | null> = ref(null)

const state : Ref <Form.State> = ref({
   old_password: null,
   password: null,
   password_confirmation: null,
   phone_number: authStore.getUser?.phone_number
})

const validationSchema : Form.Schema = yup.object({
   old_password: yup.string().required('Kata sandi lama harus diisi'),
   password: yup.string().min(8, 'Kata sandi harus berisi minimal {min} karakter').required('Kata sandi harus diisi'),
   password_confirmation: yup.string().test('password', 'Konfirmasi kata sandi tidak sama', (val, ctx) => val === state.value.password)
})

const submit = async () => {
   loading.value = true
   await updatePassword(state.value as API.Request.Auth.UpdatePassword)
      .then((resp) => {
         hash.value = resp
         store.notify('success', `OTP telah dikirim. Silakan masukkan kode OTP untuk melakukan verifikasi perubahan`)
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