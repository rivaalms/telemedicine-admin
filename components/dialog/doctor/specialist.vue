<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Spesialis"
         name="specialist"
         required
      >
         <u-select-menu
            v-model="state.slug"
            :options="specialistOptions"
            value-attribute="slug"
            option-attribute="name"
         >
            <template #label>
               {{ specialistOptions.find((item) => item.slug === state.slug)?.name || 'Pilih spesialis...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Rate"
         name="rate"
         required
      >
         <u-input
            v-model="state.rate"
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
import { getSpecialists } from '@/utils/api/masters'
import { addDoctorSpecialist, updateDoctorSpecialist } from '@/utils/api/doctors'
import * as yup from 'yup'

namespace Form {
   export type State = {
      slug: string
      rate: number
   }

   export type Schema = yup.ObjectSchema <{
      slug: string
      rate: number
   }>
}

const store = useAppStore()
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-specialist-doctor')

const specialistOptions : Ref <Model.Master.DoctorsSpecialist[]> = ref([])
const loading : Ref <boolean> = ref(false)
const state : Ref <Form.State> = ref({
   slug: isEdit.value ? store.dialog.data.slug : '',
   rate: isEdit.value ? store.dialog.data.rate : 0
})

const validationSchema : Form.Schema = yup.object({
   slug: yup.string().required('Spesialis harus diisi'),
   rate: yup.number().required('Rate harus diisi')
})

onBeforeMount(async () : Promise <void> => {
   await getSpecialists()
      .then((resp) => {
         specialistOptions.value = resp
      })
})


const submit = async () : Promise <void> => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateDoctorSpecialist(store.dialog.data.doctor_specialist_id, state.value)
      } else {
         const payload : API.Request.Doctor.Specialist = {
            uuid: store.dialog.data.uuid,
            doctor_specialists: [ state.value ]
         }

         await addDoctorSpecialist(payload)
      }

      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data spesialis dokter berhasil ${messageSuffix}`)
      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.repsonse._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>