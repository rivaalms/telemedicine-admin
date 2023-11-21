<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid grid-cols-2 gap-4">
      <u-form-group
         label="Hari"
         name="day"
         required
         class="col-span-2"
      >
         <u-select-menu
            v-model="(state.day as string)"
            :disabled="isEdit"
            :options="dayOptions"
            value-attribute="value"
            option-attribute="label"
         >
            <template #label>
               {{ dayOptions.find((item: any) => item.value == state.day)?.label || 'Pilih hari...' }}
            </template>
         </u-select-menu>
      </u-form-group>

      <u-form-group
         label="Jam Mulai"
         name="start_time"
         required
      >
         <vue-date-picker
            v-model="(state.start_time as string)"
            time-picker
            auto-apply
            model-type="HH:mm"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.start_time as string)"
                  readonly="readonly"
                  icon="i-heroicons-clock-solid"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <u-form-group
         label="Jam Berakhir"
         name="end_time"
         required
      >
         <vue-date-picker
            v-model="(state.end_time as string)"
            time-picker
            auto-apply
            model-type="HH:mm"
         >
            <template #trigger>
               <u-input
                  :model-value="(state.end_time as string)"
                  readonly="readonly"
                  icon="i-heroicons-clock-solid"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <!-- <u-form-group
         label="Kuota"
         name="kuota"
         required
         class="col-span-2"
      >
         <u-input
            v-model="(state.kuota as string)"
         ></u-input>
      </u-form-group> -->
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
import { addDoctorSchedule, updateDoctorSchedule } from '@/utils/api/doctors'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as yup from 'yup'

namespace Form {
   export type State = {
      day: string | null
      start_time: string | null
      end_time: string | null
      // kuota: string | null
   }

   export type Schema = yup.ObjectSchema <{
      day: string
      start_time: string
      end_time: string
      // kuota: string
   }>
}

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type === 'edit-schedule-doctor')

const state : Ref <Form.State> = ref({
   day: isEdit.value ? store.dialog.data.schedule.day : null,
   start_time: isEdit.value ? store.dialog.data.schedule.start_time : null,
   end_time: isEdit.value ? store.dialog.data.schedule.end_time : null,
   // kuota: isEdit.value ? store.dialog.data.schedule.kuota : null
})

const validationSchema : Form.Schema = yup.object({
   day: yup.string().required('Hari harus diisi'),
   start_time: yup.string().required('Jam mulai harus diisi'),
   end_time: yup.string().required('Jam berakhir harus diisi'),
   // kuota: yup.string().required('Kuota harus diisi')
})

const dayOptions : Ref <{ value: string, label: string }[]> = ref([
      { value: '0', label: 'Minggu' },
      { value: '1', label: 'Senin' },
      { value: '2', label: 'Selasa' },
      { value: '3', label: 'Rabu' },
      { value: '4', label: 'Kamis' },
      { value: '5', label: 'Jumat' },
      { value: '6', label: 'Sabtu' },
   ])

// onBeforeMount(() : void => {
//    if (!isEdit.value) {
//       const mapSchedule = store.dialog.data.schedule?.map((item: any) => item.day)
//       dayOptions.value = dayOptions.value.filter((item: any) => !mapSchedule.includes(item.value))
//    }
// })

const submit = async () : Promise <void> => {
   loading.value = true

   try {
      const payload = {
         ...(state.value as API.Request.Doctor.Schedule),
         doctor_uuid: store.dialog.data.doctor.uuid
      }

      if (isEdit.value) {
         await updateDoctorSchedule(store.dialog.data.schedule.id, payload)
      } else {
         await addDoctorSchedule(payload)
      }
      
      const messageSuffix = isEdit.value ? 'diperbarui' : 'ditambahkan'
      store.notify('success', `Data jadwal praktek dokter berhasil ${messageSuffix}`)
      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>