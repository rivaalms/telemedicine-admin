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
            v-model="state.name"
            :disabled="loading"
         ></u-input>
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
            v-model="state.regency_id"
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

const store = useAppStore()

const provinceOptions : Ref <Utils.Province[]> = ref([])
const regencyOptions : Ref <Utils.Regency[]> = ref([])
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-medical-facility-doctor')

const state : Ref <any> = ref({
   name: isEdit.value ? store.dialog.data.name : '',
   province_id: isEdit.value ? store.dialog.data.province_id : null,
   regency_id: isEdit.value ? store.dialog.data.regency_id : null
})

const validationSchema = yup.object({
   name: yup.string().required('Nama harus diisi'),
   province_id: yup.number().required('Provinsi harus diisi'),
   regency_id: yup.number().required('Kab/Kota harus diisi')
})

onBeforeMount(async () => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })

   if (isEdit.value) await fetchRegencies()
})

const fetchRegencies = async () => {
   await getRegencies(state.value.province_id)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async () => {
   state.value.regency_idd = null
   await fetchRegencies()
}

const submit = async () => {
   loading.value = true

   try {
      if (isEdit.value) {
         await updateDoctorMedicalFacility(store.dialog.data.id, state.value)
      } else {
         const payload = {
            ...state.value,
            uuid: store.dialog.data.uuid
         }
         await addDoctorMedicalFacility(payload)
      }

      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data lokasi praktek dokter berhasil ${messageSuffix}`)
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.data?.message || error)
   } finally {
      loading.value = false
   }
}
</script>