<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Nama"
         name="full_name"
         required
      >
         <u-input
            v-model="state.full_name"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Jenis Kelamin"
         name="gender"
         required
      >
         <u-select-menu
            v-model="(state.gender as string)"
            :options="genderOptions"
            value-attribute="value"
            option-attribute="label"
            :disabled="loading"
         >
            <template #label>
               {{ genderOptions.find((item: any) => item.value === state.gender)?.label || 'Pilih jenis kelamin...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Email"
         name="email"
         required
      >
         <u-input
            v-model="(state.email as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="No. Telepon"
         name="phone_number"
         required
      >
         <u-input
            v-model="(state.phone_number as string)"
            :disabled="loading"
            @keypress="useValidateNumber"
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
import { addNurse } from '@/utils/api/users'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])

const state : Ref <Model.Nurse> = ref({
   full_name: '',
   gender: null,
   email: null,
   phone_number: null,
})

const validationSchema = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   phone_number: yup.number().typeError('No. telepon harus hanya berisi angka').required('No. telepon harus diisi')
})

const submit = async () => {
   loading.value = true
   await addNurse(state.value)
      .then((resp) => {
         store.notify('success', `Perawat ${resp.full_name} berhasil ditambahkan`)
         store.dialog.callback()
         store.clearDialog()
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data?.messages || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>