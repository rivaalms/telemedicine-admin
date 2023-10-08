<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid grid-cols-3 gap-4">
      <u-form-group
         label="Nama"
         name="full_name"
         required
      >
         <u-input
            v-model="state.full_name"
         ></u-input>
      </u-form-group>

      <u-form-group
         label="Jenis Kelamin"
         name="gender"
         required
      >
         <u-select-menu
            v-model="state.gender"
            :options="genderOptions"
            value-attribute="value"
            option-attribute="label"
         >
            <template #label>
               {{ genderOptions.find((item: any) => item.value === state.gender).label }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Masa Berlaku STR"
         name="str_date"
         required
      >
         <vue-date-picker
            v-model="state.str_date"
            auto-apply
            @update:model-value="(value) => { state.str_date =  moment(value).format('YYYY-MM-DD') }"
         >
            <template #trigger>
               <u-input
                  :model-value="state.str_date"
                  readonly="readonly"
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
            v-model="state.sip_date"
            auto-apply
            @update:model-value="(value) => { state.sip_date =  moment(value).format('YYYY-MM-DD') }"
         >
            <template #trigger>
               <u-input
                  :model-value="state.sip_date"
                  readonly="readonly"
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
            v-model="state.province_id"
            :options="provinceOptions"
            value-attribute="id"
            option-attribute="province_name"
            @update:model-value="onProvinceChange"
         >
            <template #label>
               {{ provinceOptions.find(item => item.id === state.province_id)?.province_name || 'Pilih Provinsi...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Kab/Kota"
         name="regency_id"
         required
      >
         <u-select-menu
            v-model="state.regency_id"
            :options="regencyOptions"
            value-attribute="id"
            option-attribute="regency_name"
         >
            <template #label>
               {{ regencyOptions.find(item => item.id === state.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
            </template>
         </u-select-menu>
      </u-form-group>
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
         Simpan Perubahan
      </u-button>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { getProvinces, getRegencies } from '@/utils/api/utils'
import { updateDoctor } from '@/utils/api/doctors'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import * as yup from 'yup'

const store = useAppStore()

const state = ref({
   full_name: store.dialog.data.full_name,
   gender: store.dialog.data.gender,
   str_date: store.dialog.data.str_date,
   sip_date: store.dialog.data.sip_date,
   province_id: store.dialog.data.province_id,
   regency_id: store.dialog.data.regency_id,
   uuid: store.dialog.data.uuid,
   no_str: store.dialog.data.no_str,
   tags: []
})

const validationSchema = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   str_date: yup.string().required('Masa berlaku STR harus diisi'),
   sip_date: yup.string().required('Masa berlaku SIP harus diisi'),
   province_id: yup.number().required('Provinsi harus diisi'),
   regency_id: yup.number().required('Kab/Kota harus diisi'),
   uuid: yup.string().required('UUID harus diisi'),
   no_str: yup.string().required('Nomor STR harus diisi')
})

const loading : Ref <boolean> = ref(false)
const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])
const provinceOptions : Ref <Utils.Province[]> = ref([])
const regencyOptions : Ref <Utils.Regency[]> = ref([])

onBeforeMount(async () => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })

   await fetchRegencies()
})

const fetchRegencies = async () => {
   await getRegencies(state.value.province_id)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async () => {
   state.value.regency_id = null
   await fetchRegencies()
}

const submit = async () => {
   loading.value = true
   await updateDoctor(state.value)
      .then((resp) => {
         store.clearDialog()
      })
      .finally(() => {
         loading.value = false
      })
}
</script>