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
import { deleteDoctorSpecialist } from '@/utils/api/doctors'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

const confirmDelete = async () => {
   const data = store.dialog.data
   loading.value = true

   try {
      if (store.dialog.type === 'delete-specialist-doctor')
         await deleteDoctorSpecialist(data.doctor_specialist_id!)
      else
         console.log(data)

      store.clearDialog()
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}
</script>