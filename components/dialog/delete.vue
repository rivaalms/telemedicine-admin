<template>
<p>Anda yakin ingin menghapus data ini?</p>

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
      color="red"
      icon="i-heroicons-trash"
      :loading="loading"
      @click.stop="confirmDelete"
   >
      Hapus
   </u-button>
</div>
</template>

<script setup lang="ts">
import { deleteDoctorSpecialist, deleteDoctorEducation, deleteDoctorMedicalFacility } from '@/utils/api/doctors'
import { deleteAmbulance } from '@/utils/api/ambulance'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

const confirmDelete = async () => {
   const data = store.dialog.data
   loading.value = true

   try {
      switch (store.dialog.type) {
         case 'delete-specialist-doctor':
            await deleteDoctorSpecialist(data.doctor_specialist_id!)
            break
         case 'delete-education-doctor':
            await deleteDoctorEducation(data.id!)
            break
         case 'delete-medical-facility-doctor':
            await deleteDoctorMedicalFacility(data.id!)
            break
         case 'delete-ambulance':
            await deleteAmbulance(data.id!)
            break
         default:
            break
      }

      store.clearDialog()
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}
</script>