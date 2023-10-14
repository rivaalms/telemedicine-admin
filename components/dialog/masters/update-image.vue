<template>
<div class="grid gap-6">
   <div class="flex justify-center max-h-40">
      <img
         :src="imagePreview"
         alt="Image Preview"
         class="object-contain"
      >
   </div>

   <u-input
      type="file"
      accept="image/*"
      :ui="{ base: 'file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100' }"
      :disabled="loading"
      @change="onFileChange"
   ></u-input>
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
      @click.stop="submit"
   >
      Simpan
   </u-button>
</div>
</template>

<script setup lang="ts">
import { updateSpecialistImage, updateAdvertisementImage, updateVoucherImage } from '@/utils/api/masters'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

const type : ComputedRef <string> = computed(() => store.dialog.type.split('-').pop()!)

const imageFile : Ref <any> = ref(null)
const imagePreview : Ref <any> = ref(store.dialog.data.image)

const submit = async () => {
   loading.value = true

   try {
      let messageType = ''

      switch (type.value) {
         case 'specialist':
            await updateSpecialistImage(store.dialog.data.slug, imageFile.value)
            messageType = 'spesialis'
            break
         case 'voucher':
            await updateVoucherImage(store.dialog.data.slug, imageFile.value)
            messageType = 'voucher'
            break
         case 'advertisement':
            await updateAdvertisementImage(store.dialog.data.slug, imageFile.value)
            messageType = 'iklan'
            break
         default:
            loading.value = false
            break
      }

      store.notify('success', `Gambar master ${messageType} berhasil diperbarui`)
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.data?.message || error)
   } finally {
      loading.value = false
   }
   
   await updateSpecialistImage(store.dialog.data.slug, imageFile.value)
      .then(() => {
         store.clearDialog()
      })
      .finally(() => {
         loading.value = false
      })
}

const onFileChange = (e: any) => {
   imageFile.value = e.target.files[0]
   imagePreview.value = URL.createObjectURL(imageFile.value)
}
</script>