<template>
<u-form
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
            v-model="state.old_password"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Kata Sandi Baru"
         name="password"
         required
      >
         <u-input
            v-model="state.password"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Konfirmasi Kata Sandi"
         name="password_confirmation"
         required
      >
         <u-input
            v-model="state.password_confirmation"
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
</template>

<script setup lang="ts">
import { updatePassword } from '@/utils/api/auth'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

const state : Ref <any> = ref({
   old_password: null,
   password: null,
   password_confirmation: null,
   phone_number: useAuthStore().getUser?.phone_number
})

const validationSchema = yup.object({
   old_password: yup.string().required('Kata sandi lama harus diisi'),
   password: yup.string().min(8, (min) => `Kata sandi harus berisi minimal ${min} karakter`).required('Kata sandi harus diisi'),
   password_confirmation: yup.string().test('password', 'Konfirmasi kata sandi tidak sama', (val, ctx) => val === state.value.passowrd)
})

const submit = async () => {
   loading.value = true
   await updatePassword(state.value)
      .then((resp) => {
         store.notify('success', `Kata sandi berhasil diperbarui`)
         store.clearDialog()
      })
      .catch((error: any) => {
         store.notify('error', error.data?.message || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>