<template>
<u-card class="overflow-visible">
   <u-form
      :schema="validationSchema"
      :state="state"
      :validate-on="['submit']"
      @submit.prevent="submit"
   >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
         <u-form-group
            label="Tujuan"
            name="to"
            required
         >
            <u-select-menu
               v-model="(state.to as string)"
               :options="useBroadcastTo"
               value-attribute="key"
               option-attribute="label"
            >
               <template #label>
                  {{ useBroadcastTo.find((item: any) => item.key === state.to)?.label || 'Pilih tujuan...' }}
               </template>
            </u-select-menu>
         </u-form-group>

         <u-form-group
            label="App"
            name="app"
            required
         >
            <u-select-menu
               v-model="(state.app as string)"
               :options="useBroadcastApp"
               :disabled="loading"
            >
               <template #label>
                  {{ state.app || 'Pilih app...' }}
               </template>
            </u-select-menu>
         </u-form-group>

         <u-form-group
            label="Tipe Notifikasi"
            name="notification_type"
            required
         >
            <u-select-menu
               v-model="(state.notification_type as string)"
               :options="useBroadcastNotificationType"
               :disabled="loading"
            >
               <template #label>
                  <p class="truncate">
                     {{ state.notification_type || 'Pilih tipe notifikasi...' }}
                  </p>
               </template>
            </u-select-menu>
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
               @update:model-value="(value) => { state.start_date = moment(value).format('YYYY-MM-DD') }"
            >
               <template #trigger>
                  <u-input
                     :model-value="(state.start_date as string)"
                     readonly="readonly"
                     icon="i-heroicons-calendar-solid"
                     input-class="cursor-pointer"
                     :disabled="loading"
                  ></u-input>
               </template>
            </vue-date-picker>
         </u-form-group>

         <u-form-group
            label="Tanggal Berakhir"
            name="end_date"
            required
         >
            <vue-date-picker
               v-model="state.end_date"
               auto-apply
               :enable-time-picker="false"
               @update:model-value="(value) => { state.end_date = moment(value).format('YYYY-MM-DD') }"
            >
               <template #trigger>
                  <u-input
                     :model-value="(state.end_date as string)"
                     readonly="readonly"
                     icon="i-heroicons-calendar-solid"
                     input-class="cursor-pointer"
                     :disabled="loading"
                  ></u-input>
               </template>
            </vue-date-picker>
         </u-form-group>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
               label="Body"
               name="body"
               required
            >
               <u-textarea
                  v-model="(state.body as string)"
                  :rows="4"
                  autoresize
                  :disabled="loading"
               ></u-textarea>
            </u-form-group>
   
            <u-form-group
               label="Konten Broadcast"
               name="content"
               required
            >
               <quill-editor
                  v-model:content="state.content"
                  theme="snow"
                  content-type="html"
               ></quill-editor>
            </u-form-group>
         </div>

         <div class="grid gap-4">
            <u-form-group
               label="Gambar"
               name="image"
               required
               class="col-span-2"
            >
               <u-input
                  type="file"
                  accept="image/*"
                  input-class="file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  :disabled="loading"
                  @change="onFileChange"
               ></u-input>
            </u-form-group>

            <div class="flex justify-center col-span-2">
               <img
                  v-if="imagePreview"
                  :src="(imagePreview as string)"
                  alt="Image preview"
                  class="object-contain"
               >
            </div>
         </div>
      </div>

      <div class="flex justify-end gap-2 mt-6">
         <u-button
            color="emerald"
            icon="i-heroicons-rss"
            :loading="loading"
            type="submit"
         >
            Broadcast
         </u-button>
      </div>
   </u-form>
</u-card>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import { broadcast } from '@/utils/api/broadcast'
import * as yup from 'yup'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
store.title = 'Broadcast'
useHead({ title: store.getTitle })

const loading : Ref <boolean> = ref(false)
const imageFile : Ref <Blob | File | MediaSource | null> = ref(null)
const imagePreview : Ref <any> = ref(null)

const state : Ref <API.Request.Broadcast> = ref({
   to: null,
   app: null,
   title: null,
   body: null,
   start_date: null,
   end_date: null,
   content: null,
   notification_type: null
})

const validationSchema = yup.object({
   to: yup.string().required('Tujuan harus diisi'),
   app: yup.string().required('App harus diisi'),
   title: yup.string().required('Judul harus diisi'),
   body: yup.string().required('Body harus diisi'),
   start_date: yup.string().required('Tanggal mulai harus diisi'),
   end_date: yup.string().required('Tanggal berakhir harus diisi'),
   content: yup.string().required('Konten broadcast harus diisi'),
   notification_type: yup.string().required('Tipe notifikasi harus diisi')
})

const submit = async () : Promise <void> => {
   loading.value = true

   await broadcast(imageFile.value, state.value)
      .then((resp) => {
         store.notify('success', 'Broadcast berhasil')
         resetData()
      })
      .catch((error: API.Response.Error) => {
         store.notify('error', error.response?._data?.messages || (error as string))
      })
      .finally(() => {
         loading.value = false
      })
}

const onFileChange = (e: any) : void => {
   imageFile.value = e.target.files[0]
   imagePreview.value = URL.createObjectURL(imageFile.value!)
}

const resetData = () : void => {
   state.value = {
      to: null,
      app: null,
      title: null,
      body: null,
      start_date: null,
      end_date: null,
      content: null,
      notification_type: null
   }

   imageFile.value = null
   imagePreview.value = null
}
</script>