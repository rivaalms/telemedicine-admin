<template>
<div class="grid gap-6">
   <div class="flex justify-center max-w-full">
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
import { updateImage } from '@/utils/api/medical-facilities'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

const imageFile : Ref <File | Blob | null> = ref(null)
const imagePreview : Ref <any> = ref(store.dialog.data.image)

const submit = async () : Promise <void> => {
   loading.value = true

   await updateImage(store.dialog.data.id, imageFile.value as Blob)
      .then(resp => {
         store.notify('success', 'Gambar fasilitas kesehatan berhasil diperbarui')
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

const onFileChange = (e: any) : void => {
   imageFile.value = e.target.files[0]
   imagePreview.value = URL.createObjectURL(imageFile.value!)
}
</script>