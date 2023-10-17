<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Universitas"
         name="education"
         required
      >
         <u-input
            v-model="state.education"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Tahun Kelulusan"
         name="graduation_year"
         required
      >
         <vue-date-picker
            v-model="state.graduation_year"
            year-picker
            auto-apply
         >
            <template #trigger>
               <u-input
                  :model-value="state.graduation_year"
                  readonly="readonly"
                  icon="i-heroicons-calendar-solid"
               ></u-input>
            </template>
         </vue-date-picker>
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
         :color="isEdit ? 'sky' : 'emerald'"
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
import { addDoctorEducation, updateDoctorEducation } from '@/utils/api/doctors'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as yup from 'yup'

namespace Form {
   export type State = Omit <API.Request.Doctor.Education, 'uuid'>
   export type Schema = yup.ObjectSchema<{
      education: string
      graduation_year: string
   }>
}

const store = useAppStore()
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-education-doctor')

const loading : Ref <boolean> = ref(false)
const state : Ref <Form.State> = ref({
   education: isEdit.value ? store.dialog.data.education : '',
   graduation_year: isEdit.value ? store.dialog.data.graduation_year : '',
})

const validationSchema : Form.Schema = yup.object({
   education: yup.string().required('Nama universitas harus diisi'),
   graduation_year: yup.string().required('Tahun kelulusan harus diisi'),
})

const submit = async () : Promise <void> => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateDoctorEducation(store.dialog.data.id, state.value)
      } else {
         const payload = {
            ...state.value,
            uuid: store.dialog.data.uuid
         }
         
         await addDoctorEducation(payload)
      }

      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data riwayat pendidikan dokter berhasil ${messageSuffix}`)
      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>