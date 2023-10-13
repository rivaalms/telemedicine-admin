<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Nama"
         name="name"
         required
      >
         <u-input
            v-model="(state.name as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="No. Urut"
         name="order_number"
         required
      >
         <u-input
            v-model="(state.order_number as number)"
            :disabled="loading"
            @keypress="useValidateNumber"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Deskripsi"
         name="description"
      >
         <u-textarea
            v-model="(state.description as string)"
            :rows="4"
            autoresize
            :disabled="loading"
         ></u-textarea>
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
               alt="Image Preview"
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
import { createSpecialist, updateSpecialist, updateSpecialistImage } from '@/utils/api/masters'
import * as yup from 'yup'

const store = useAppStore()
const dialogData : ComputedRef <Model.Master.DoctorsSpecialist> = computed(() => store.dialog.data.data)

const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-specialist')

const imageFile : Ref <any> = ref(null)
const imagePreview : Ref <string | null> = ref(null)

const state : Ref <Model.Master.DoctorsSpecialist> = ref({
   name: isEdit.value ? dialogData.value.name : null,
   description: isEdit.value ? dialogData.value.description : null,
   order_number: isEdit.value ? dialogData.value.order_number : null,
   parent: isEdit.value ? dialogData.value.parent : null,
   tags: isEdit.value ? dialogData.value.tags : [],
})

const validationSchema = yup.object({
   name: yup.string().required('Nama harus diisi'),
   description: yup.string().notRequired(),
   order_number: yup.number().typeError('No. urut harus hanya berisi angka').required('No. urut harus diisi'),
   parent: yup.mixed().notRequired(),
   tags: yup.mixed().notRequired()
})

const submit = async () => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateSpecialist(dialogData.value!.slug!, state.value)
      } else {
         await createSpecialist(state.value)
            .then(async (resp) => {
               await updateSpecialistImage(resp.slug!, imageFile.value)
            })
      }

      store.clearDialog()
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}

const onFileChange = (e: any) => {
   imageFile.value = e.target.files[0]
   imagePreview.value = URL.createObjectURL(imageFile.value)
}
</script>