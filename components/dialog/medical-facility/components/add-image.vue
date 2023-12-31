<template>
<div class="grid gap-2">
   <u-card class="shadow-none overflow-visible">
      <div class="gird">
         <input
            class="hidden"
            type="file"
            ref="imageInput"
            name="image"
            accept="image/*"
            @change="setImage"
         />

         <div v-if="croppedImage" class="flex justify-center mb-4">
            <img :src="croppedImage"/>
         </div>

         <div v-if="isCropping" class="grid gap-4 mb-4">
            <vue-cropper
               :src="image"
               ref="cropper"
               drag-mode="none"
               :aspect-ratio="1/1"
               preview=".preview"
            ></vue-cropper>

            <div class="flex justify-center gap-4">
               <u-button
                  variant="ghost"
                  color="gray"
                  icon="i-heroicons-x-mark"
                  @click.stop="cancelCrop"
               >
                  Batal
               </u-button>

               <u-button
                  color="sky"
                  icon="i-heroicons-scissors"
                  @click.stop="cropImage"
               >
                  Potong
               </u-button>
            </div>
         </div>

         <div class="flex justify-center gap-4">
            <u-button
               v-if="!isCropping && !isImageUploaded"
               color="sky"
               :variant="!imageFile ? 'solid' : 'ghost'"
               icon="i-heroicons-photo"
               @click.stop="() => {
                  cancelCrop()
                  imageInput!.click()
               }"
            >
               {{ !imageFile ? 'Pilih Foto' : 'Ubah Foto' }}
            </u-button>

            <u-button
               v-if="imageFile && !isImageUploaded"
               color="emerald"
               icon="i-heroicons-check"
               :loading="loading"
               @click.stop="uploadImage"
            >
               Simpan
            </u-button>
         </div>
      </div>
   </u-card>

   <div class="flex items-center justify-between gap-2 mt-6">
      <u-button
         color="gray"
         variant="ghost"
         icon="i-heroicons-arrow-small-left"
         @click="emit('prevTab')"
      >
         Sebelumnya
      </u-button>
      <u-button
         color="sky"
         trailing-icon="i-heroicons-arrow-small-right"
         @click="emit('nextTab')"
      >
         Selanjutnya
      </u-button>
   </div>
</div>
</template>

<script setup lang="ts">
import { updateImage } from '@/utils/api/medical-facilities'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

const store = useAppStore()
const emit = defineEmits(['nextTab', 'prevTab'])

const loading : Ref <boolean> = ref(false)
const image : Ref <any> = ref(null)
const croppedImage : Ref <any> = ref(null)
const imageFile : Ref <Blob | File | null> = ref(null)
const imageInput : Ref <HTMLInputElement | undefined> = ref()
const cropper : Ref <any> = ref()
const isCropping : Ref <boolean> = ref(false)
const isImageUploaded : Ref <boolean> = ref(false)

const setImage = (evt: any) => {
   const file : Blob = evt.target!.files[0]
   if (file.type.indexOf('image/') < 0) {
      store.notify('error', 'Data yang dipilih harus berupa gambar')
      return
   }

   if ((file.size / 1024) > 600) {
      store.notify('error', 'Gambar yang dipilih tidak boleh lebih besar dari 600 KB')
      return
   }

   if (typeof FileReader === 'function') {
      const reader = new FileReader()
      reader.onload = (e: any) => {
         image.value = e.target.result
         cropper.value.setCropBoxData({ width: '150px', height: '150px' })
         cropper.value.replace(e.target.result)
      }
      reader.readAsDataURL(file)
      isCropping.value = true
   }
}

const cropImage = async () : Promise <void> => {
   croppedImage.value = cropper.value.getCroppedCanvas().toDataURL()

   cropper.value.getCroppedCanvas().toBlob(async (blob: any) => {
      let fileImg = new File([blob], 'image.png')
      let exitLoop = false

      if ((fileImg.size / 1024) > 600) {
         while ((fileImg.size / 1024) > 600 || exitLoop === false) {
            await reduceFileRes(fileImg)
               .then((resp: any) => {
                  fileImg = resp
               })
               .catch((error: any) => {
                  exitLoop = true
                  store.notify('error', error)
                  return
               })
         }
      } else {
         imageFile.value = fileImg
      }
   })
   isCropping.value = false
}

const reduceFileRes = async (fileImg: any) : Promise <unknown> => {
   return new Promise(resolve => {
      const maxWidth = 600
      const maxHeight = 600
      const mimeType = 'image/png'
      const quality = 1
      let result : File

      const blobUrl = URL.createObjectURL(fileImg)
      const img = new Image()
      img.src = blobUrl

      img.onerror = function () {
         URL.revokeObjectURL(this.src)
         store.notify('error', 'Gagal memuat gambar')
      }

      img.onload = function () {
         // @ts-ignore
         URL.revokeObjectURL(this.src)
         const canvas = document.createElement('canvas')
         canvas.width = maxWidth
         canvas.height = maxHeight

         const ctx = canvas.getContext('2d')
         ctx!.drawImage(img, 0, 0, maxWidth, maxHeight)
         canvas.toBlob((blob: any) => {
            result = new File([blob], 'image.png')
            imageFile.value = result
            resolve(result)
         }, mimeType, quality)
      }
   })
}

const cancelCrop = () : void => {
   image.value = null
   croppedImage.value = null
   imageFile.value = null
   isCropping.value = false
}

const uploadImage = async () : Promise <void> => {
   loading.value = true
   await updateImage (store.dialog.data!.id!, imageFile.value!)
      .then((resp) => {
         store.dialog.data = resp
         isImageUploaded.value = true
         emit('nextTab')
      })
      .finally(() => {
         loading.value = false
      })
}
</script>