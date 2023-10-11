<template>
<u-tabs
   v-model="currentTab"
   :items="tabs"
>
   <template #data>
      <u-form
         :schema="validationSchemaData"
         :state="stateData"
         :validate-on="['submit']"
         @submit.prevent="submitData"
      >
         <div class="grid grid-rows-4 grid-flow-col gap-4">
            <u-form-group
               label="Nama Lengkap"
               name="full_name"
               required
            >
               <u-input
                  v-model="stateData.full_name"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="Jenis Kelamin"
               name="gender"
               required
            >
               <u-select-menu
                  v-model="stateData.gender"
                  :options="genderOptions"
                  value-attribute="value"
                  option-attribute="label"
                  :disabled="isFormDisabled"
               >
                  <template #label>
                     {{ genderOptions.find((item: any) => item.value === stateData.gender)?.label || 'Pilih jenis kelamin...' }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Email"
               name="email"
               required
            >
               <u-input
                  v-model="stateData.email"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="No. Telepon"
               name="phone_number"
               required
            >
               <u-input
                  v-model="stateData.phone_number"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="No. STR"
               name="no_str"
               required
            >
               <u-input
                  v-model="stateData.no_str"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="Masa Berlaku STR"
               name="str_date"
               required
            >
               <vue-date-picker
                  v-model="stateData.str_date"
                  auto-apply
                  @update:model-value="(value) => { stateData.str_date =  moment(value).format('YYYY-MM-DD') }"
               >
                  <template #trigger>
                     <u-input
                        :model-value="stateData.str_date"
                        readonly="readonly"
                        :disabled="isFormDisabled"
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
                  v-model="stateData.sip_date"
                  auto-apply
                  @update:model-value="(value) => { stateData.sip_date =  moment(value).format('YYYY-MM-DD') }"
               >
                  <template #trigger>
                     <u-input
                        :model-value="stateData.sip_date"
                        readonly="readonly"
                        :disabled="isFormDisabled"
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
                  v-model="stateData.start_experience"
                  auto-apply
                  @update:model-value="(value) => { stateData.start_experience =  moment(value).format('YYYY-MM-DD') }"
               >
                  <template #trigger>
                     <u-input
                        :model-value="stateData.start_experience"
                        readonly="readonly"
                        :disabled="isFormDisabled"
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
                  v-model="stateData.province_id"
                  :options="provinceOptions"
                  value-attribute="id"
                  option-attribute="province_name"
                  :disabled="isFormDisabled"
                  @update:model-value="onProvinceChange"
               >
                  <template #label>
                     {{ provinceOptions.find(item => item.id === stateData.province_id)?.province_name || 'Pilih Provinsi...' }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Kab/Kota"
               name="regency_id"
               required
            >
               <u-select-menu
                  v-model="stateData.regency_id"
                  :options="regencyOptions"
                  :disabled="isFormDisabled"
                  value-attribute="id"
                  option-attribute="regency_name"
               >
                  <template #label>
                     {{ regencyOptions.find(item => item.id === stateData.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Tags"
               name="tags"
               required
            >
               <u-select-menu
                  v-model="stateData.tags"
                  :options="[ {label: 'Tidak ada data' } ]"
                  :disabled="isFormDisabled"
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
            >
               Selanjutnya

               <template #trailing>
                  <u-icon name="i-heroicons-arrow-small-right"></u-icon>
               </template>
            </u-button>
         </div>
      </u-form>
   </template>

   <template #details>
      <div class="grid grid-cols-3 gap-2">
         <div class="grid gap-y-4">
            <p class="font-semibold">
               Spesialis Dokter
            </p>
            <u-card>
               <div
                  v-for="item in specialist"
                  class="grid divide-y pb-4"
               >
                  <div class="text-sm py-2 truncate">
                     <div class="flex items-center justify-between gap-2">
                        <p class="font-semibold truncate">{{ item.name || '-' }}</p>
                        <div class="flex gap-2">
                           <u-button
                              size="2xs"
                              color="amber"
                              variant="ghost"
                              icon="i-heroicons-pencil"
                           ></u-button>

                           <u-button
                              size="2xs"
                              color="red"
                              variant="ghost"
                              icon="i-heroicons-trash"
                           ></u-button>
                        </div>
                     </div>
                     <p class="text-gray-500">Rate: {{ item.rate || '-' }}</p>
                  </div>
               </div>

               <u-popover :ui="{ base: 'overflow-visible' }">
                  <u-button
                     block
                     color="sky"
                     variant="outline"
                     icon="i-heroicons-plus"
                  >
                     Tambah Spesialis
                  </u-button>

                  <template #panel>
                     <u-card class="overflow-visible">
                        <u-form
                           :schema="validationSchemaSpecialist"
                           :state="stateSpecialist"
                           :validate-on="['submit']"
                           @submit.prevent="submitSpecialist"
                        >
                           <div class="grid gap-2">
                              <u-form-group
                                 label="Spesialis"
                                 name="specialist"
                                 required
                              >
                                 <u-select-menu
                                    v-model="stateSpecialist.slug"
                                    :options="specialistOptions"
                                    value-attribute="slug"
                                    option-attribute="name"
                                    @click="fetchSpecialist"
                                 >
                                    <template #label>
                                       {{ specialistOptions.find((item: any) => item.slug === stateSpecialist.slug)?.name || 'Pilih spesialis...' }}
                                    </template>
                                 </u-select-menu>
                              </u-form-group>

                              <u-form-group
                                 label="Rate"
                                 name="rate"
                                 required
                              >
                                 <u-input
                                    v-model="stateSpecialist.rate"
                                 ></u-input>
                              </u-form-group>

                              <div class="flex justify-end gap-2 mt-2">
                                 <u-button
                                    color="emerald"
                                    icon="i-heroicons-check"
                                    :loading="loading"
                                    type="submit"
                                 >
                                    Simpan
                                 </u-button>
                              </div>
                           </div>
                           
                        </u-form>
                     </u-card>
                  </template>
               </u-popover>
            </u-card>
         </div>
      </div>
   </template>
</u-tabs>
</template>

<script setup lang="ts">
import { getProvinces, getRegencies, getDoctorSpecialists } from '@/utils/api/utils'
import { addDoctor, addDoctorSpecialist } from '@/utils/api/doctors'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as yup from 'yup'
import moment from 'moment'

const store = useAppStore()
const doctor : Ref <Model.Doctor | null> = ref(null)
const specialist : Ref <Model.DoctorSpecialist[]> = ref([])

const isFormDisabled : ComputedRef <boolean> = computed(() => doctor.value ? true : false)
const stepper : Ref <number> = ref(0)
const currentTab : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const tabs : Ref <any> = ref([
   { slot: 'data', label: 'Data Dokter' },
   { slot: 'details', label: 'Detail', disabled: false },
   { slot: 'image', label: 'Unggah Foto', disabled: true },
   { slot: 'finish', label: 'Selesai', disabled: true }
])

const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])
const provinceOptions : Ref <Utils.Province[]> = ref([])
const regencyOptions : Ref <Utils.Regency[]> = ref([])
const specialistOptions : Ref <any> = ref([
   { name: 'Loading...' }
])

const stateData : Ref <any> = ref({
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

const stateSpecialist : Ref <any> = ref({
   slug: '',
   rate: ''
})

const validationSchemaData = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   email: yup.string().required('Email harus diisi'),
   phone_number: yup.string().required('No. telepon harus diisi'),
   no_str: yup.string().required('No. STR harus diisi'),
   str_date: yup.string().required('Tanggal STR harus diisi'),
   sip_date: yup.string().required('Tanggal SIP harus diisi'),
   start_experience: yup.string().required('Start experience harus diisi'),
   province_id: yup.string().required('Provinsi harus diisi'),
   regency_id: yup.string().required('Kab/Kota harus diisi'),
   tags: yup.mixed().nullable()
})

const validationSchemaSpecialist = yup.object({
   slug: yup.string().required('Spesialis harus diisi'),
   rate: yup.number().required('Rate harus diisi')
})

onBeforeMount(async () => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })
})

const fetchRegencies = async () => {
   await getRegencies(stateData.value.province_id)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async () => {
   stateData.value.regency_id = null
   await fetchRegencies()
}

const fetchSpecialist = async () => {
   if (specialistOptions.value.find((item: any) => item.name === 'Loading...')) {
      await getDoctorSpecialists()
         .then((resp) => {
            specialistOptions.value = resp
         })
   }
   return true
}

const submitData = async () => {
   loading.value = true
   await addDoctor(stateData.value)
      .then(resp => {
         doctor.value = resp
         tabs.value.find((item: any) => item.slot === 'details').disabled = false
      })
      .then(() => {
         currentTab.value++
      })
      .finally(() => {
         loading.value = false
      })
}

const submitSpecialist = async () => {

}
</script>