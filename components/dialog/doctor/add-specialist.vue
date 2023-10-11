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
import { getDoctorSpecialists } from '@/utils/api/utils'
import { addDoctorSpecialist } from '@/utils/api/doctors'
import * as yup from 'yup'

const store = useAppStore()

const specialistOptions : Ref <Utils.Specialist[]> = ref([])
const loading : Ref <boolean> = ref(false)
const state : Ref <any> = ref({
   slug: '',
   rate: ''
})

const validationSchema = yup.object({
   slug: yup.string().required('Spesialis harus diisi'),
   rate: yup.number().required('Rate harus diisi')
})

onBeforeMount(async () => {
   await getDoctorSpecialists()
      .then((resp) => {
         specialistOptions.value = resp
      })
})


const submit = async () => {
   loading.value = true
   const payload : API.Payload.AddDoctorSpecialistPayload = {
      uuid: store.dialog.data.uuid,
      doctor_specialists: [ state.value ]
   }
   await addDoctorSpecialist(payload)
      .then((resp) => {
         store.clearDialog()
      })
      .finally(() => {
         loading.value = false
      })
}
</script>