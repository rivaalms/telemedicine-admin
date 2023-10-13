<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid grid-cols-2 gap-4">
      <u-form-group
         label="Kode"
         name="code"
         required
      >
         <u-input
            v-model="(state.code as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Nama Voucher"
         name="name"
         required
      >
         <u-input
            v-model="(state.name as string)"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Tipe Voucher"
         name="type"
         required
      >
         <u-select-menu
            v-model="(state.type as number)"
            :options="typeOptions"
            value-attribute="value"
            option-attribute="label"
            :disabled="loading"
         >
            <template #label>
               {{ typeOptions.find((item) => item.value === state.type)?.label || 'Pilih tipe voucher...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Tipe Transaksi"
         name="transaction_type"
         required
      >
         <u-select-menu
            v-model="(state.transaction_type as number)"
            :options="transactionTypeOptions"
            value-attribute="value"
            option-attribute="label"
            :disabled="loading"
         >
            <template #label>
               {{ transactionTypeOptions.find((item) => item.value === state.transaction_type)?.label || 'Pilih tipe transaksi...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         v-if="state.type === 3"
         label="Max. Usage"
         name="max_usage"
      >
         <u-input
            v-model="(state.rules!.max_usage as string)"
            :disabled="loading"
            @keypress="useValidateNumber"
         ></u-input>
      </u-form-group>

      <u-form-group
         v-else
         label="Nominal"
         name="nominal"
      >
         <u-input
            v-model="(state.nominal as number)"
            :disabled="loading"
            @keypress="useValidateNumber"
         ></u-input>
      </u-form-group>

      <u-form-group
         v-if="state.type !== 3"
         label="Kuota"
         name="quota"
      >
         <u-input
            v-model="(state.quota as number)"
            :disabled="loading"
            @keypress="useValidateNumber"
         ></u-input>
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

      <u-form-group
         label="Status"
         name="status"
         required
      >
         <u-select-menu
            v-model="(state.status as string)"
            :options="statusOptions"
            :disabled="loading"
         ></u-select-menu>
      </u-form-group>

      <u-form-group
         label="Pasien"
         name="users"
      >
         <vue3-tags-input
            ref="tagsInput"
            @on-tags-changed="(val: any) => usersTag = val"
         ></vue3-tags-input>
      </u-form-group>

      <u-form-group
         label="Catatan"
         name="notes"
         class="col-span-2"
      >
         <u-textarea
            v-model="(state.notes as string)"
            :rows="4"
            autoresize
            :disabled="loading"
         ></u-textarea>
      </u-form-group>

      <template v-if="!isEdit">
         <div class="flex justify-center max-h-40 col-span-2">
            <img
               v-if="imagePreview"
               :src="(imagePreview as string)"
               alt="Image preview"
               class="object-contain"
            >
         </div>
         
         <u-form-group
            label="Gambar"
            name="image"
            class="col-span-2"
         >
            <u-input
               type="file"
               accept="image/*"
               input-class="file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
               :disabled="loading"
               @change="onFileChange"
            ></u-input>

            <template #hint>
               <p class="text-xs text-red-500">Maks 2048 KB</p>
            </template>
         </u-form-group>
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
import { createVoucher, updateVoucher, updateVoucherImage } from '@/utils/api/masters'
import * as yup from 'yup'
// @ts-ignore
import Vue3TagsInput from 'vue3-tags-input'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type.includes('edit'))
const dialogData : ComputedRef <Model.Master.Voucher> = computed(() => store.dialog.data)

const imageFile : Ref <any> = ref(null)
const imagePreview : Ref <any> = ref(null)

const typeOptions : ComputedRef <{ value: number, label: string }[]> = computed(() => [
   { value: 1, label: 'Nominal' },
   { value: 2, label: 'Persentase' },
   { value: 3, label: 'Usage' }
])
const transactionTypeOptions : ComputedRef <{ value: number, label: string}[]> = computed(() => [
   { value: 1, label: 'Consultation' },
   { value: 2, label: 'Medicine' }
])
const statusOptions : ComputedRef <string[]> = computed(() => ['active', 'non-active' ])

const usersTag : Ref <string[]> = ref([])
const tagsInput : Ref <any> = ref()

const state : Ref <Model.Master.Voucher> = ref({
   code: isEdit.value ? dialogData.value.code : null,
   name: isEdit.value ? dialogData.value.name : null,
   start_date: isEdit.value ? dialogData.value.start_date : null,
   end_date: isEdit.value ? dialogData.value.end_date : null,
   type: isEdit.value ? dialogData.value.type : null,
   transaction_type: isEdit.value ? dialogData.value.transaction_type : null,
   nominal: isEdit.value ? dialogData.value.nominal : null,
   quota: isEdit.value ? dialogData.value.quota : 1,
   notes: isEdit.value ? dialogData.value.notes : null,
   status: isEdit.value ? dialogData.value.status : null,
   specialist: isEdit.value ? dialogData.value.specialist : null,
   rules: {
      medicine_category: isEdit.value ? dialogData.value.rules?.medicine_category : '',
      medicine_classification: isEdit.value ? dialogData.value.rules?.medicine_classification : '',
      max_usage: isEdit.value ? dialogData.value.rules?.max_usage : '',
      users: isEdit.value ? dialogData.value.rules?.users : null
   }
})

const validationSchema = yup.object({
   code: yup.string().required('Kode harus diisi'),
   name: yup.string().required('Nama harus diisi'),
   start_date: yup.string().required('Tanggal mulai harus diisi'),
   end_date: yup.string().required('Tanggal berakhir harus diisi'),
   type: yup.number().typeError('Tipe voucher harus berupa angka').required('Tipe voucher harus diisi'),
   transaction_type: yup.number().typeError('Tipe transaksi harus berupa angka').required('Tipe transaksi harus diisi'),
   nominal: yup.number().typeError('Nominal harus berupa angka').notRequired(),
   quota: yup.number().typeError('Kuota harus berupa angka').notRequired(),
   notes: yup.string().notRequired(),
   status: yup.string().required(),
   rules: yup.object({
      medicine_category: yup.string().notRequired(),
      medicine_classification: yup.string().notRequired(),
      max_usage: yup.string().notRequired(),
      users: yup.string().notRequired()
   })
})

onBeforeMount(async () => {
   if (isEdit.value) {
      usersTag.value = await Promise.all(dialogData.value.rules!.users!.split(','))
      tagsInput.value.innerTags = usersTag.value
   }
})

const submit = async () => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateVoucher(dialogData.value.slug!, state.value)
      } else {
         await createVoucher(state.value)
            .then(async (resp) => {
               await updateVoucherImage(resp.slug!, imageFile.value)
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