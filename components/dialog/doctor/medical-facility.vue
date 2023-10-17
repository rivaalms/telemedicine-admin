<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Tempat Praktek"
         name="name"
         required
      >
         <u-input
            v-model="(state.name as string)"
            :disabled="loading"
         ></u-input>
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
            option-attribute="province_name"
            :disabled="loading"
            @update:model-value="onProvinceChange"
         >
            <template #label>
               {{ provinceOptions.find(item => item.id === state.province_id)?.province_name || 'Pilih provinsi...' }}
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
            value-attribute="id"
            option-attribute="regency_name"
            :disabled="loading"
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
         :color="isEdit ? 'sky' : 'emerald'"
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
import { addDoctorMedicalFacility, updateDoctorMedicalFacility } from '@/utils/api/doctors'
import { getProvinces, getRegencies } from '@/utils/api/utils'
import * as yup from 'yup'

namespace Form {
   export type State = {
      name: string | null
      province_id: number | null
      regency_id: number | null
   }
   export type Schema = yup.ObjectSchema <{
      name: string
      province_id: number
      regency_id: number
   }>
}

const store = useAppStore()

const provinceOptions : Ref <API.Response.Province[]> = ref([])
const regencyOptions : Ref <API.Response.Regency[]> = ref([])
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-medical-facility-doctor')

const state : Ref <Form.State> = ref({
   name: isEdit.value ? store.dialog.data.name : '',
   province_id: isEdit.value ? store.dialog.data.province_id : null,
   regency_id: isEdit.value ? store.dialog.data.regency_id : null
})

const validationSchema : Form.Schema = yup.object({
   name: yup.string().required('Nama harus diisi'),
   province_id: yup.number().required('Provinsi harus diisi'),
   regency_id: yup.number().required('Kab/Kota harus diisi')
})

onBeforeMount(async () : Promise <void> => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })

   if (isEdit.value) await fetchRegencies()
})

const fetchRegencies = async () : Promise <void> => {
   await getRegencies(state.value.province_id!)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async () : Promise <void> => {
   state.value.regency_id = null
   await fetchRegencies()
}

const submit = async () : Promise <void> => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateDoctorMedicalFacility(store.dialog.data.id, (state.value as Omit <API.Request.Doctor.MedicalFacility, 'uuid'>))
      } else {
         const payload = {
            ...state.value,
            uuid: store.dialog.data.uuid
         } as API.Request.Doctor.MedicalFacility

         await addDoctorMedicalFacility(payload)
      }

      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data lokasi praktek dokter berhasil ${messageSuffix}`)
      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>