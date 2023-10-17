<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Judul"
         name="title"
         required
      >
         <u-input
            v-model="(state.title as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Deskripsi"
         name="description"
         required
      >
         <u-textarea
            v-model="(state.description as string)"
            :rows="4"
            autoresize
            :disabled="loading"
         ></u-textarea>
      </u-form-group>

      <u-form-group
         label="Tanggal Mulai"
         name="start_date"
         required
      >
         <vue-date-picker
            v-model="state.start_date"
            auto-apply
            :enable-time-picker="false"
            @update:model-value="(value: any) => { state.start_date = moment(value).format('YYYY-MM-DD' ) }"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.start_date as string)"
                  icon="i-heroicons-calendar"
                  readonly="readonly"
                  :disabled="loading"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <u-form-group
         label="Tanggal Selesai"
         name="end_date"
         required
      >
         <vue-date-picker
            v-model="state.end_date"
            auto-apply
            :enable-time-picker="false"
            @update:model-value="(value: any) => { state.end_date = moment(value).format('YYYY-MM-DD' ) }"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.end_date as string)"
                  icon="i-heroicons-calendar"
                  readonly="readonly"
                  :disabled="loading"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <template v-if="!isEdit">
         <u-form-group
            label="Gambar"
            name="image"
         >
            <u-input
               type="file"
               accept="image/*"
               :ui="{ base: 'file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100' }"
               :disabled="loading"
               @change="onFileChange"
            ></u-input>
         </u-form-group>

         <div class="flex justify-center max-h-40">
            <img
               v-if="imagePreview"
               :src="(imagePreview as string)"
               alt="image preview"
               class="object-contain"
            >
         </div>
      </template>
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
import { createAdvertisement, updateAdvertisement, updateAdvertisementImage } from '@/utils/api/masters'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-advertisement')
const dialogData : ComputedRef <Model.Master.Advertisement> = computed(() => store.dialog.data)

const imageFile : Ref <File | Blob | null> = ref(null)
const imagePreview : Ref <any> = ref(null)

const state : Ref <Model.Master.Advertisement> = ref({
   title: isEdit.value ? dialogData.value.title : null,
   description: isEdit.value ? dialogData.value.description : null,
   start_date: isEdit.value ? dialogData.value.start_date : null,
   end_date: isEdit.value ? dialogData.value.end_date : null
})

const validationSchema = yup.object({
   title: yup.string().required('Judul harus diisi'),
   description: yup.string().required('Deskripsi harus diisi'),
   start_date: yup.string().required('Tanggal mulai harus diisi'),
   end_date: yup.string().required('Tanggal berakhir harus diisi')
})

const submit = async () : Promise <void> => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateAdvertisement(dialogData.value.slug!, state.value)
      } else {
         await createAdvertisement(state.value)
            .then(async (resp) => {
               if (imageFile.value) await updateAdvertisementImage(resp.slug!, imageFile.value)
            })
      }

      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data master iklan berhasil ${messageSuffix}`)
      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}

const onFileChange = (e: any) : void => {
   imageFile.value = e.target.files[0]
   imagePreview.value = URL.createObjectURL(imageFile.value!)
}
</script>