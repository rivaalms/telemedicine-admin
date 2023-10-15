<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid grid-cols-2 gap-4">
      <u-form-group
         label="No. Induk Karyawan"
         name="employee_no"
         required
      >
         <u-input
            v-model="state.employee_no"
            @keypress="useValidateNumber"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Nama"
         name="full_name"
         required
      >
         <u-input
            v-model="state.name"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Jenis Kelamin"
         name="gender"
         required
      >
         <u-select-menu
            v-model="state.gender"
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
            v-model="state.email"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="No. Telepon"
         name="phone_number"
         required
      >
         <u-input
            v-model="state.phone_number"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Posisi"
         name="position"
         required
      >
         <u-select-menu
            v-model="state.position"
            :options="positionOptions"
            :disabled="loading"
         >
            <template #label>
               {{ state.position || 'Pilih posisi...' }}
            </template>
         </u-select-menu>
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
import { addOfficer } from '@/utils/api/users'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const positionOptions : Ref <string[]> = ref([ 'DRIVER' ])
const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])

const state : Ref <any> = ref({
   full_name: '',
   gender: '',
   email: '',
   phone_number: '',
   employee_no: '',
   position: ''
})

const validationSchema = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   phone_number: yup.number().typeError('No. telepon harus hanya berisi angka').required('No. telepon harus diisi'),
   employee_no: yup.number().typeError('No. induk karyawan harus hanya berisi angka').required('No. induk karyawan harus diisi'),
   position: yup.string().required('Posisi harus diisi')
})

const submit = async () => {
   loading.value = true
   await addOfficer(state.value)
      .then((resp) => {
         store.notify('success', `Officer ${resp.full_name} berhasil ditambahkan`)
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