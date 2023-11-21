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
import { deleteDoctorSpecialist, deleteDoctorEducation, deleteDoctorMedicalFacility, deleteDoctorSchedule } from '@/utils/api/doctors'
import { deleteAmbulance } from '@/utils/api/ambulance'
import { deleteSpecialist, deleteAdvertisement, deleteVoucher } from '@/utils/api/masters'
import { deleteMedicalFacility } from '@/utils/api/medical-facilities'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

const confirmDelete = async () : Promise <void> => {
   const data = store.dialog.data
   loading.value = true
   let messageType: string = ''

   try {
      switch (store.dialog.type) {
         case 'delete-specialist-doctor':
            await deleteDoctorSpecialist(data.doctor_specialist_id!)
            messageType = 'spesialis dokter'
            break
         case 'delete-education-doctor':
            await deleteDoctorEducation(data.id!)
            messageType = 'riwayat pendidikan dokter'
            break
         case 'delete-medical-facility-doctor':
            await deleteDoctorMedicalFacility(data.id!)
            messageType = 'lokasi praktek dokter'
            break
         case 'delete-ambulance':
            await deleteAmbulance(data.id!)
            messageType = 'ambulance'
            break
         case 'delete-specialist':
            await deleteSpecialist(data.slug!)
            messageType = 'master spesialis'
            break
         case 'delete-advertisement':
            await deleteAdvertisement(data.slug!)
            messageType = 'master iklan'
            break
         case 'delete-voucher':
            await deleteVoucher(data.slug!)
            messageType = 'master voucher'
            break
         case 'delete-medical-facility':
            await deleteMedicalFacility(data.id!)
            messageType = 'fasilitas kesehatan'
            break
         case 'delete-schedule-doctor':
            await deleteDoctorSchedule(data.id!)
            messageType = 'jadwal praktek dokter'
            break
         default:
            break
      }

      store.notify('info', `Data ${messageType} berhasil dihapus`)
      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>