<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submitData"
>
   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <u-form-group
         label="Nama Lengkap"
         name="full_name"
         required
      >
         <u-input
            v-model="(state.full_name as string)"
            :disabled="props.disabled || loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Jenis Kelamin"
         name="gender"
         required
      >
         <u-select-menu
            v-model="(state.gender as string)"
            :options="genderOptions"
            value-attribute="value"
            option-attribute="label"
            :disabled="props.disabled || loading"
         >
            <template #label>
               {{ genderOptions.find((item: any) => item.value === state.gender)?.label || 'Pilih jenis kelamin...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Email"
         name="email"
         required
      >
         <u-input
            v-model="(state.email as string)"
            :disabled="props.disabled || loading"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="No. Telepon"
         name="phone_number"
         required
      >
         <u-input
            v-model="(state.phone_number as string)"
            :disabled="props.disabled || loading"
            @keypress="useValidateNumber"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="No. STR"
         name="no_str"
         required
      >
         <u-input
            v-model="(state.no_str as string)"
            :disabled="props.disabled || loading"
            @keypress="useValidateNumber"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Masa Berlaku STR"
         name="str_date"
         required
      >
         <vue-date-picker
            v-model="(state.str_date as string)"
            auto-apply
            :enable-time-picker="false"
            class="cursor-pointer"
            @update:model-value="(value: any) => { state.str_date =  moment(value).format('YYYY-MM-DD') }"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.str_date as string)"
                  icon="i-heroicons-calendar-solid"
                  readonly="readonly"
                  :disabled="props.disabled || loading"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <u-form-group
         label="Masa Berlaku SIP"
         name="sip_date"
         required
      >
         <vue-date-picker
            v-model="(state.sip_date as string)"
            auto-apply
            :enable-time-picker="false"
            @update:model-value="(value: any) => { state.sip_date =  moment(value).format('YYYY-MM-DD') }"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.sip_date as string)"
                  icon="i-heroicons-calendar-solid"
                  readonly="readonly"
                  :disabled="props.disabled || loading"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <u-form-group
         label="Start Experience"
         name="start_experience"
         required
      >
         <vue-date-picker
            v-model="(state.start_experience as string)"
            auto-apply
            :enable-time-picker="false"
            @update:model-value="(value: any) => { state.start_experience =  moment(value).format('YYYY-MM-DD') }"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.start_experience as string)"
                  icon="i-heroicons-calendar-solid"
                  readonly="readonly"
                  :disabled="props.disabled || loading"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <u-form-group
         label="Provinsi"
         name="province_id"
         required
      >
         <u-select-menu
            v-model="(state.province_id as number)"
            :options="provinceOptions"
            value-attribute="id"
            option-attribute="name"
            :disabled="props.disabled || loading"
            @update:model-value="onProvinceChange"
         >
            <template #label>
               {{ provinceOptions.find(item => item.id === state.province_id)?.name || 'Pilih Provinsi...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Kab/Kota"
         name="regency_id"
         required
      >
         <u-select-menu
            v-model="(state.regency_id as number)"
            :options="regencyOptions"
            :disabled="props.disabled || loading"
            value-attribute="id"
            option-attribute="name"
         >
            <template #label>
               {{ regencyOptions.find(item => item.id === state.regency_id)?.name || 'Pilih Kab/Kota...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Tags"
         name="tags"
      >
         <u-select-menu
            v-model="state.tags"
            :options="[ {label: 'Tidak ada data' } ]"
            :disabled="props.disabled || loading"
         >
            <template #label>
               {{ 'Pilih Tags...' }}
            </template>
         </u-select-menu>
      </u-form-group>
   </div>

   <div class="flex items-center justify-end gap-2 mt-6">
      <u-button
         color="sky"
         type="submit"
         trailing-icon="i-heroicons-arrow-small-right"
         :loading="loading"
      >
         Selanjutnya
      </u-button>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { getProvinces, getRegencies } from '@/utils/api/utils'
import { addDoctor } from '@/utils/api/doctors'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as yup from 'yup'
import moment from 'moment'
import { useValidateNumber } from '~/composables/utils'

type FormState = Pick <Model.Doctor, 'full_name' | 'gender' | 'email' | 'phone_number' | 'no_str' | 'str_date' | 'sip_date' | 'start_experience' | 'province_id' | 'regency_id' | 'tags'>

type Schema = yup.ObjectSchema<{
   full_name: string
   gender: string
   email: string
   phone_number: string
   no_str: string
   str_date: string
   sip_date: string
   start_experience: string
   province_id: string
   regency_id: string
   tags: any
}>

const store = useAppStore()
const props = defineProps<{
   disabled?: boolean
}>()
const emit = defineEmits(['nextTab'])
const loading : Ref <boolean> = ref(false)

const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])
const provinceOptions : Ref <API.Response.Province[]> = ref([])
const regencyOptions : Ref <API.Response.Regency[]> = ref([])

const state : Ref <FormState> = ref({
   full_name: '',
   gender: '',
   email: '',
   phone_number: '',
   no_str: '',
   str_date: '',
   sip_date: '',
   start_experience: '',
   province_id: null,
   regency_id: null,
   tags: []
})

const validationSchema : Schema = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   email: yup.string().email('Email tidak valid').required('Email harus diisi'),
   phone_number: yup.string().required('No. telepon harus diisi'),
   no_str: yup.string().required('No. STR harus diisi'),
   str_date: yup.string().required('Tanggal STR harus diisi'),
   sip_date: yup.string().required('Tanggal SIP harus diisi'),
   start_experience: yup.string().required('Start experience harus diisi'),
   province_id: yup.string().required('Provinsi harus diisi'),
   regency_id: yup.string().required('Kab/Kota harus diisi'),
   tags: yup.mixed().nullable()
})

onBeforeMount(async () : Promise <void> => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })
})

const fetchRegencies = async (provinceId: number) : Promise <void> => {
   await getRegencies(provinceId)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async (provinceId: number) : Promise <void> => {
   state.value.regency_id = null
   await fetchRegencies(provinceId)
}

const submitData = async () : Promise <void> => {
   loading.value = true
   await addDoctor(state.value)
      .then(resp => {
         store.dialog.data = resp
         store.notify('success', `Dokter ${resp.full_name} berhasil ditambahkan`)
         emit('nextTab')
      })
      .catch((error: any) => {
         store.notify('error', error.data?.message || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>