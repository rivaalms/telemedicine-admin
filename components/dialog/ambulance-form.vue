<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Plat Nomor"
         name="plate_number"
         required
      >
         <u-input
            v-model="(state.plate_number as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>
   
      <u-form-group
         label="Tipe Ambulance"
         name="ambulance_type"
         required
      >
         <u-input
            v-model="(state.ambulance_type as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>
   
      <u-form-group
         label="Tipe Kendaraan"
         name="vehicle_type"
         required
      >
         <u-input
            v-model="(state.vehicle_type as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>
   
      <u-form-group
         label="Status"
         name="status"
         required
      >
         <u-input
            v-model="(state.status as string)"
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
import { createAmbulance, updateAmbulance } from '@/utils/api/ambulance'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-ambulance')
const dialogData : ComputedRef <Model.Ambulance> = computed(() => (store.dialog.data as Model.Ambulance))

const state : Ref <Model.Ambulance> = ref({
   plate_number: isEdit.value ? dialogData.value.plate_number : null,
   ambulance_type: isEdit.value ? dialogData.value.ambulance_type : null,
   vehicle_type: isEdit.value ? dialogData.value.vehicle_type : null,
   status: isEdit.value ? dialogData.value.status : null
})

const validationSchema = yup.object({
   plate_number: yup.string().required('Plat nomor harus diisi'),
   ambulance_type: yup.string().required('Tipe ambulance harus diisi'),
   vehicle_type: yup.string().required('Tipe kendaraan harus diisi'),
   status: yup.string().required('Status harus diisi')
})

const submit = async () => {
   loading.value = true
   try {
      if (isEdit.value) {
         await updateAmbulance((dialogData.value.id as number), state.value)
      }
      else await createAmbulance(state.value)

      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data ambulance berhasil ${messageSuffix}`)
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.data?.message || error)
   } finally {
      loading.value = false
   }
}
</script>