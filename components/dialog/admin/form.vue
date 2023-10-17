<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid grid-cols-2 gap-4">
      <u-form-group
         label="Nama"
         name="full_name"
         required
      >
         <u-input
            v-model="(state.full_name as string)"
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
         >
            <template #label>
               {{ genderOptions.find((item: any) => item.value === state.gender)?.label || 'Pilih jenis kelamin...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="No. Telepon"
         name="phone_number"
         required
      >
         <u-input
            v-model="(state.phone_number as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Email"
         name="email"
         required
      >
         <u-input
            v-model="state.email as string"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Kata Sandi"
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
         label="Role"
         name="role_id"
         required
      >
         <u-select-menu
            v-model="(state.role_id as number)"
            :options="roleOptions"
            value-attribute="id"
            option-attribute="name"
            :disabled="loading"
         >
            <template #label>
               {{ roleOptions.find((item) => item.id === state.role_id)?.name || 'Pilih role...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         v-if="authStore.getRole === 'superAdmin'"
         label="Faskes"
         name="medical_facility_id"
         required
      >
         <u-select-menu
            v-model="(state.medical_facility_id as number)"
            :options="medicalFacilityOptions"
            value-attribute="id"
            option-attribute="name"
            :disabled="loading"
         >
            <template #label>
               {{ medicalFacilityOptions.find((item) => item.id === state.medical_facility_id)?.name || 'Pilih faskes...' }}
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
import { addAdmin } from '@/utils/api/users'
import { getMedicalFacilities, getRoles } from '@/utils/api/utils'
import * as yup from 'yup'

type FormState = Pick <Model.User, 'full_name' | 'phone_number' | 'email' | 'role_id' | 'gender'> & {
   medical_facility_id: number | null
   password: string | null
}

type Schema = yup.ObjectSchema<{
   full_name: string
   phone_number: number
   email: string
   role_id: number
   medical_facility_id: number
   gender: string
   password: string
}>

const store = useAppStore()
const authStore = useAuthStore()
const medicalFacilityOptions : Ref <Model.Doctor.MedicalFacility[]> = ref([])
const roleOptions : Ref <Utility.User.Role[]> = ref([])
const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])
const loading : Ref <boolean> = ref(false)

const state : Ref <FormState> = ref({
   full_name: null,
   phone_number: null,
   email: null,
   role_id: null,
   medical_facility_id: null,
   gender: null,
   password: null
})

const validationSchema : Schema = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   phone_number: yup.number().typeError('No. telepon harus hanya berisi angka').required('No. telepon harus diisi'),
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   role_id: yup.number().typeError('Role harus hanya berisi angka').required('Role harus diisi'),
   medical_facility_id: yup.number().typeError('Faskes harus hanya berisi angka').required('Faskes harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   password: yup.string().min(8, 'Kata sandi harus berisi minimal ${min} karakter').required('Kata sandi harus diisi')
})

onBeforeMount(async () : Promise <void> => {
   await getRoles()
      .then((resp) => {
         roleOptions.value = resp
      })

   if (authStore.getRole === 'superAdmin') {
      await getMedicalFacilities()
         .then((resp) => {
            medicalFacilityOptions.value = resp
         })
   } else {
      state.value.medical_facility_id = authStore.getUser!.medical_facility!.id
   }
})

const submit = async () : Promise <void> => {
   loading.value = true
   await addAdmin(state.value)
      .then((resp) => {
         store.notify('success', `Admin ${resp.full_name} berhasil ditambahkan`)
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