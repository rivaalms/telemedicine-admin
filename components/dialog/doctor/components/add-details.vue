<template>
<div class="grid lg:grid-cols-3 items-start gap-2">
   <!-- SECTION: Specialist -->
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
                     <u-popover :ui="{ base: 'overflow-visible' }">
                        <u-tooltip text="Sunting">
                           <u-button
                              size="2xs"
                              color="amber"
                              variant="ghost"
                              icon="i-heroicons-pencil"
                              @click="() => { stateSpecialist = { slug: item.slug!, rate: item.rate! } }"
                           ></u-button>
                        </u-tooltip>

                        <template #panel>
                           <!-- SECTION: Edit Specialist -->
                           <u-card class="overflow-visible">
                              <u-form
                                 :schema="validationSchemaSpecialist"
                                 :state="stateSpecialist"
                                 :validate-on="['submit']"
                                 @submit.prevent="submitSpecialist(true, item)"
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
                                          :disabled="loading"
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
                                          :disabled="loading"
                                          @keypress="useValidateNumber"
                                       ></u-input>
                                    </u-form-group>
                                 </div>

                                 <div class="flex justify-end gap-2 mt-4">
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
                           </u-card>
                           <!-- !SECTION -->
                        </template>
                     </u-popover>

                     <u-popover :ui="{ base: 'overflow-visible' }">
                        <u-tooltip text="Hapus">
                           <u-button
                              size="2xs"
                              color="red"
                              variant="ghost"
                              icon="i-heroicons-trash"
                           ></u-button>
                        </u-tooltip>

                        <template #panel>
                           <!-- SECTION: Delete Specialist -->
                           <u-card class="overflow-visible">
                              <p>Anda yakin ingin menghapus data ini?</p>
                              <div class="flex justify-end gap-2 mt-4">
                                 <u-button
                                    color="red"
                                    icon="i-heroicons-trash"
                                    :loading="loading"
                                    @click.stop="deleteSpecialist(item)"
                                 >
                                    Hapus
                                 </u-button>
                              </div>
                           </u-card>
                           <!-- !SECTION -->
                        </template>
                     </u-popover>
                  </div>
               </div>
               <p class="text-gray-500">Rate: {{ item.rate ? useFormatCurrency(item.rate) : '-' }}</p>
            </div>
         </div>

         <u-popover :ui="{ base: 'overflow-visible' }">
            <u-button
               block
               color="sky"
               variant="outline"
               icon="i-heroicons-plus"
               @click="() => { stateSpecialist = { slug: '', rate: 0 } }"
            >
               Tambah Spesialis
            </u-button>

            <template #panel>
               <!-- SECTION: Add Specialist -->
               <u-card class="overflow-visible">
                  <u-form
                     :schema="validationSchemaSpecialist"
                     :state="stateSpecialist"
                     :validate-on="['submit']"
                     @submit.prevent="submitSpecialist(false)"
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
                              :disabled="loading"
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
                              :disabled="loading"
                              @keypress="useValidateNumber"
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
               <!-- !SECTION -->
            </template>
         </u-popover>
      </u-card>
   </div>
   <!-- !SECTION -->

   <!-- SECTION: Education -->
   <div class="grid gap-y-4">
      <p class="font-semibold">
         Riwayat Pendidikan
      </p>
      <u-card>
         <div
            v-for="item in education"
            class="grid divide-y pb-4"
         >
            <div class="text-sm py-2 truncate">
               <div class="flex items-center justify-between gap-2">
                  <p class="font-semibold truncate">{{ item.education || '-' }}</p>
                  <div class="flex gap-2">
                     <u-popover :ui="{ base: 'overflow-visible' }">
                        <u-tooltip text="Sunting">
                           <u-button
                              size="2xs"
                              color="amber"
                              variant="ghost"
                              icon="i-heroicons-pencil"
                              @click="() => { stateEducation = { education: item.education!, graduation_year: item.graduation_year! } }"
                           ></u-button>
                        </u-tooltip>

                        <template #panel>
                           <!-- SECTION: Edit Education -->
                           <u-card class="overflow-visible">
                              <u-form
                                 :schema="validationSchemaEducation"
                                 :state="stateEducation"
                                 :validate-on="['submit']"
                                 @submit.prevent="submitEducation(true, item)"
                              >
                                 <div class="grid gap-2">
                                    <u-form-group
                                       label="Universitas"
                                       name="education"
                                       required
                                    >
                                       <u-input
                                          v-model="stateEducation.education"
                                          :disabled="loading"
                                       ></u-input>
                                    </u-form-group>

                                    <u-form-group
                                       label="Tahun Kelulusan"
                                       name="graduation_year"
                                       required
                                    >
                                       <vue-date-picker
                                          v-model="stateEducation.graduation_year"
                                          year-picker
                                          auto-apply
                                       >
                                          <template #trigger>
                                             <u-input
                                                :model-value="stateEducation.graduation_year"
                                                readonly="readonly"
                                                :disabled="loading"
                                                icons="i-heroicons-calendar-solid"
                                             ></u-input>
                                          </template>
                                       </vue-date-picker>
                                    </u-form-group>
                                 </div>

                                 <div class="flex justify-end gap-2 mt-4">
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
                           </u-card>
                           <!-- !SECTION -->
                        </template>
                     </u-popover>

                     <u-popover :ui="{ base: 'overflow-visible' }">
                        <u-tooltip text="Hapus">
                           <u-button
                              size="2xs"
                              color="red"
                              variant="ghost"
                              icon="i-heroicons-trash"
                           ></u-button>
                        </u-tooltip>

                        <template #panel>
                           <!-- SECTION: Delete Education -->
                           <u-card class="overflow-visible">
                              <p>Anda yakin ingin menghapus data ini?</p>
                              <div class="flex justify-end gap-2 mt-4">
                                 <u-button
                                    color="red"
                                    icon="i-heroicons-trash"
                                    :loading="loading"
                                    @click.stop="deleteEducation(item)"
                                 >
                                    Hapus
                                 </u-button>
                              </div>
                           </u-card>
                           <!-- !SECTION -->
                        </template>
                     </u-popover>
                  </div>
               </div>
               <p class="text-gray-500">Tahun Kelulusan: {{ item.graduation_year }}</p>
            </div>
         </div>
         
         <u-popover :ui="{ base: 'overflow-visible' }">
            <u-button
               block
               color="sky"
               variant="outline"
               icon="i-heroicons-plus"
               @click="() => stateEducation = { education: '', graduation_year: '' }"
            >
               Tambah Riwayat Pendidikan
            </u-button>

            <template #panel>
               <!-- SECTION: Add Education -->
               <u-card class="overflow-visible">
                  <u-form
                     :schema="validationSchemaEducation"
                     :state="stateEducation"
                     :validate-on="['submit']"
                     @submit.prevent="submitEducation(false)"
                  >
                     <div class="grid gap-2">
                        <u-form-group
                           label="Universitas"
                           name="education"
                           required
                        >
                           <u-input
                              v-model="stateEducation.education"
                              :disabled="loading"
                           ></u-input>
                        </u-form-group>

                        <u-form-group
                           label="Tahun Kelulusan"
                           name=graduation_year
                           required
                        >
                           <vue-date-picker
                              v-model="stateEducation.graduation_year"
                              year-picker
                              auto-apply
                           >
                              <template #trigger>
                                 <u-input
                                    :model-value="stateEducation.graduation_year"
                                    readonly="readonly"
                                    :disabled="loading"
                                    icons="i-heroicons-calendar-solid"
                                 ></u-input>
                              </template>
                           </vue-date-picker>
                        </u-form-group>
                     </div>

                     <div class="flex justify-end gap-2 mt-4">
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
               </u-card>
               <!-- !SECTION -->
            </template>
         </u-popover>
      </u-card>
   </div>
   <!-- !SECTION -->

   <!-- SECTION: Medical Facility -->
   <div class="grid gap-y-4">
      <p class="font-semibold">
         Lokasi Praktek
      </p>
      <u-card>
         <div
            v-for="item in medicalFacility"
            class="grid divide-y pb-4"
         >
            <div class="text-sm py-2 truncate">
               <div class="flex items-center justify-between gap-2">
                  <p class="font-semibold truncate">{{ item.name || '-' }}</p>
                  <div class="flex gap-2">
                     <u-popover :ui="{ base: 'overflow-visible' }">
                        <u-tooltip text="Sunting">
                           <u-button
                              size="2xs"
                              color="amber"
                              variant="ghost"
                              icon="i-heroicons-pencil"
                              @click="() => { stateMedicalFacility = { name: item.name!, province_id: item.province_id!, regency_id: item.regency_id! } }"
                           ></u-button>
                        </u-tooltip>

                        <template #panel>
                           <!-- SECTION: Edit Medical Facility -->
                           <u-card class="overflow-visible">
                              <u-form
                                 :schema="validationSchemaMedicalFacility"
                                 :state="stateMedicalFacility"
                                 :validate-on="['submit']"
                                 @submit.prevent="submitMedicalFacility(true, item)"
                              >
                                 <div class="grid gap-2">
                                    <u-form-group
                                       label="Tempat Praktek"
                                       name="name"
                                       required
                                    >
                                       <u-input
                                          v-model="stateMedicalFacility.name"
                                          :disabled="loading"
                                       ></u-input>
                                    </u-form-group>

                                    <u-form-group
                                       label="Provinsi"
                                       name="province_id"
                                       required
                                    >
                                       <u-select-menu
                                          v-model="(stateMedicalFacility.province_id as number)"
                                          :options="provinceOptions"
                                          value-attribute="id"
                                          option-attribute="province_name"
                                          :disabled="loading"
                                          @update:model-value="onProvinceChange"
                                       >
                                          <template #label>
                                             {{ provinceOptions.find(item => item.id === stateMedicalFacility.province_id)?.province_name || 'Pilih provinsi...' }}
                                          </template>
                                       </u-select-menu>
                                    </u-form-group>

                                    <u-form-group
                                       label="Kab/Kota"
                                       name="regency_id"
                                       required
                                    >
                                       <u-select-menu
                                          v-model="(stateMedicalFacility.regency_id as number)"
                                          :options="regencyOptions"
                                          value-attribute="id"
                                          option-attribute="regency_name"
                                          :disabled="loading"
                                       >
                                          <template #label>
                                             {{ regencyOptions.find(item => item.id === stateMedicalFacility.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
                                          </template>
                                       </u-select-menu>
                                    </u-form-group>
                                 </div>

                                 <div class="flex justify-end gap-2 mt-4">
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
                           </u-card>
                           <!-- !SECTION -->
                        </template>
                     </u-popover>

                     <u-popover :ui="{ base: 'overflow-visible' }">
                        <u-tooltip text="Hapus">
                           <u-button
                              size="2xs"
                              color="red"
                              variant="ghost"
                              icon="i-heroicons-trash"
                           ></u-button>
                        </u-tooltip>

                        <template #panel>
                           <!-- SECTION: Delete Medical Facility -->
                           <u-card class="overflow-visible">
                              <p>Anda yakin ingin menghapus data ini?</p>
                              <div class="flex justify-end gap-2 mt-4">
                                 <u-button
                                    color="red"
                                    icon="i-herocins-trash"
                                    :disabled="loading"
                                    @click.stop="deleteMedicalFacility(item)"
                                 >
                                    Hapus
                                 </u-button>
                              </div>
                           </u-card>
                           <!-- !SECTION -->
                        </template>
                     </u-popover>
                  </div>
               </div>
               <p class="text-gray-500">{{ `${item.regency!.name}, ${item.province!.name}` }}</p>
            </div>
         </div>

         <u-popover :ui="{ base: 'overflow-visible' }">
            <u-button
               block
               color="sky"
               variant="outline"
               icon="i-heroicons-plus"
               @click="() => stateMedicalFacility = { name: '', province_id: null, regency_id: null }"
            >
               Tambah Lokasi Praktek
            </u-button>

            <template #panel>
               <!-- SECTION: Add Medical Facility -->
               <u-card class="overflow-visible">
                  <u-form
                     :schema="validationSchemaMedicalFacility"
                     :state="stateMedicalFacility"
                     :validate-on="['submit']"
                     @submit.prevent="submitMedicalFacility(false)"
                  >
                     <div class="grid gap-2">
                        <u-form-group
                           label="Lokasi Praktek"
                           name="name"
                           required
                        >
                           <u-input
                              v-model="stateMedicalFacility.name"
                              :disabled="loading"
                           ></u-input>
                        </u-form-group>

                        <u-form-group
                           label="Provinsi"
                           name="province_id"
                           required
                        >
                           <u-select-menu
                              v-model="(stateMedicalFacility.province_id as number)"
                              :options="provinceOptions"
                              value-attribute="id"
                              option-attribute="province_name"
                              :disabled="loading"
                              @update:model-value="onProvinceChange"
                           >
                              <template #label>
                                 {{ provinceOptions.find(item => item.id === stateMedicalFacility.province_id)?.province_name || 'Pilih provinsi...' }}
                              </template>
                           </u-select-menu>
                        </u-form-group>

                        <u-form-group
                           label="Kab/Kota"
                           name="regency_id"
                           required
                        >
                           <u-select-menu
                              v-model="(stateMedicalFacility.regency_id as number)"
                              :options="regencyOptions"
                              value-attribute="id"
                              option-attribute="regency_name"
                              :disabled="loading"
                           >
                              <template #label>
                                 {{ regencyOptions.find(item => item.id === stateMedicalFacility.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
                              </template>
                           </u-select-menu>
                        </u-form-group>
                     </div>

                     <div class="flex justify-end gap-2 mt-4">
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
               </u-card>
               <!-- !SECTION -->
            </template>
         </u-popover>
      </u-card>
   </div>
   <!-- !SECTION -->

   <div class="lg:col-span-3 flex items-center justify-between gap-2 mt-6">
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
import {
   addDoctorSpecialist,
   updateDoctorSpecialist,
   deleteDoctorSpecialist,
   addDoctorEducation,
   updateDoctorEducation,
   deleteDoctorEducation,
   addDoctorMedicalFacility,
   updateDoctorMedicalFacility,
   deleteDoctorMedicalFacility,
} from '@/utils/api/doctors'
import { getProvinces, getRegencies } from '@/utils/api/utils'
import { getSpecialists } from '@/utils/api/masters'
import * as yup from 'yup'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

namespace State {
   export type Specialist = {
      slug: string
      rate: number
   }

   export type Education = {
      education: string
      graduation_year: string
   }

   export type MedicalFacility = {
      name: string
      province_id: number | null
      regency_id: number | null
   }
}

const store = useAppStore()
const emit = defineEmits(['nextTab', 'prevTab'])

const specialist : Ref <Model.Doctor.Specialist[]> = ref([])
const education : Ref <Model.Doctor.Education[]> = ref([])
const medicalFacility : Ref <Model.Doctor.MedicalFacility[]> = ref([])

const loading : Ref <boolean> = ref(false)
const provinceOptions : Ref <API.Response.Province[]> = ref([])
const regencyOptions : Ref <API.Response.Regency[]> = ref([])
const specialistOptions : Ref <any> = ref([
   { name: 'Loading...' }
])

const stateSpecialist : Ref <State.Specialist> = ref({
   slug: '',
   rate: 0
})

const stateEducation : Ref <State.Education> = ref({
   education: '',
   graduation_year: ''
})

const stateMedicalFacility : Ref <State.MedicalFacility> = ref({
   name: '',
   province_id: null,
   regency_id: null
})

const validationSchemaSpecialist = yup.object({
   slug: yup.string().required('Spesialis harus diisi'),
   rate: yup.number().typeError('Rate harus diisi').required('Rate harus diisi')
})

const validationSchemaEducation = yup.object({
   education: yup.string().required('Nama universitas harus diisi'),
   graduation_year: yup.string().required('Tahun kelulusan harus diisi')
})

const validationSchemaMedicalFacility = yup.object({
   name: yup.string().required('Nama harus diisi'),
   province_id: yup.number().typeError('Provinsi harus diisi').required('Provinsi harus diisi'),
   regency_id: yup.number().typeError('Kab/Kota harus diisi').required('Kab/Kota harus diisi')
})

onBeforeMount(async () => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })
})

const fetchRegencies = async (provinceId: number) => {
   await getRegencies(provinceId)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async (provinceId: number) => {
   stateMedicalFacility.value.regency_id = null
   await fetchRegencies(provinceId)
}

const fetchSpecialist = async () => {
   if (specialistOptions.value.find((item: any) => item.name === 'Loading...')) {
      await getSpecialists()
         .then((resp) => {
            specialistOptions.value = resp
         })
   }
   return true
}

const submitSpecialist = async (isEdit: boolean, data?: any) => {
   loading.value = true

   try {
      if (isEdit) {
         await updateDoctorSpecialist(data!.specialist_id, stateSpecialist.value)
            .then((resp) => {
               specialist.value.forEach((item: any, index: number) => {
                  if (item.specialist_id == resp.specialist_id) specialist.value[index] = resp
               })
            })
      } else {
         const payload : API.Request.Doctor.Specialist = {
            uuid: store.dialog.data!.uuid!,
            doctor_specialists: [ stateSpecialist.value ]
         }
         await addDoctorSpecialist(payload)
            .then((resp) => {
               resp.forEach((item: any) => {
                  specialist.value.push(item)
               })
            })
      }

      stateSpecialist.value = {
         slug: '',
         rate: 0
      }

      const messageSuffix = isEdit ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Spesialis dokter ${store.dialog.data.full_name} berhasil ${messageSuffix}`)
   } catch (error: any) {
      store.notify('error', error.data?.message || error)
   } finally {
      loading.value = false
   }
}

const deleteSpecialist = async (data: Model.Doctor.Specialist) => {
   await deleteDoctorSpecialist(data.specialist_id!)
      .then((resp) => {
         specialist.value = specialist.value.filter((item) => item.specialist_id !== data.specialist_id)
         store.notify('info', `Data spesialis berhasil dihapus`)
      })
}

const submitEducation = async (isEdit: boolean, data?: Model.Doctor.Education) => {
   loading.value = true

   try {
      if (isEdit) {
         await updateDoctorEducation(data!.id!, stateEducation.value)
            .then((resp) => {
               education.value.forEach((item, index: number) => {
                  if (item.id == resp.id) education.value[index] = resp
               })
            })
      } else {
         const payload : API.Request.Doctor.Education = {
            uuid: store.dialog.data!.uuid!,
            ...stateEducation.value,
         }
         await addDoctorEducation(payload)
            .then((resp) => {
               education.value.push(resp)
            })
      }

      stateEducation.value = {
         education: '',
         graduation_year: ''
      }

      const messageSuffix = isEdit ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Riwayat pendidikan dokter ${store.dialog.data.full_name} berhasil ${messageSuffix}`)
   } catch (error: any) {
      store.notify('error', error.data?.message || error)
   } finally {
      loading.value = false
   }
}

const deleteEducation = async (data: Model.Doctor.Education) => {
   await deleteDoctorEducation(data.id!)
      .then((resp) => {
         education.value = education.value.filter((item) => item.id !== data.id)
         store.notify('info', `Data riwayat pendidikan berhasil dihapus`)
      })
}

const submitMedicalFacility = async (isEdit: boolean, data?: Model.Doctor.MedicalFacility) => {
   loading.value = true

   try {
      if (isEdit) {
         await updateDoctorMedicalFacility(data!.id!, (stateMedicalFacility.value as Omit <API.Request.Doctor.MedicalFacility, 'uuid'>))
            .then((resp) => {
               medicalFacility.value.forEach((item, index: number) => {
                  if (item.id == resp.id) medicalFacility.value[index] = resp
               })
            })
      } else {
         const payload : API.Request.Doctor.MedicalFacility = {
            uuid: store.dialog.data!.uuid!,
            ...(stateMedicalFacility.value as Omit <API.Request.Doctor.MedicalFacility, 'uuid'>)
         }
         await addDoctorMedicalFacility(payload)
            .then((resp) => {
               medicalFacility.value.push(resp)
            })
      }

      stateMedicalFacility.value = {
         name: '',
         province_id: null,
         regency_id: null
      }

      const messageSuffix = isEdit ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Lokasi praktek dokter ${store.dialog.data.full_name} berhasil ${messageSuffix}`)
   } catch (error: any) {
      store.notify('error', error.data?.message || error)
   } finally {
      loading.value = false
   }
}

const deleteMedicalFacility = async (data: Model.Doctor.MedicalFacility) => {
   await deleteDoctorMedicalFacility(data.id!)
      .then((resp) => {
         medicalFacility.value = medicalFacility.value.filter((item) => item.id !== data.id)
         store.notify('info', `Data riwayat pendidikan berhasil dihapus`)
      })
}
</script>