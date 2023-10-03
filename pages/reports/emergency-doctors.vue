<template>
<u-card class="overflow-visible">
   <div class="grid grid-cols-12 gap-4 mb-4">
      <u-form-group
         label="Start date"
         class="col-span-2"
      >
         <vue-date-picker
            v-model="filter.start_date"
            auto-apply
            :max-date="new Date(filter.end_date)"
            @update:model-value="fetchEmergencyDoctors()"
         >
            <template #trigger>
               <u-input
                  :model-value="moment(filter.start_date).format('YYYY-MM-DD')"
                  readonly="readonly"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <u-form-group
         label="End date"
         class="col-span-2"
      >
         <vue-date-picker
            v-model="filter.end_date"
            auto-apply
            :min-date="new Date(filter.start_date)"
            @update:model-value="fetchEmergencyDoctors()"
         >
            <template #trigger>
               <u-input
                  :model-value="moment(filter.end_date).format('YYYY-MM-DD')"
                  readonly="readonly"
               ></u-input>
            </template>
         </vue-date-picker>
      </u-form-group>

      <div class="col-start-11 col-span-2 flex justify-end items-end">
         <u-button
            color="emerald"
            icon="i-heroicons-document-arrow-down"
            @click.stop="useExportExcel('ConsultationReport', filter)"
         >
            Export Excel
         </u-button>
      </div>
   </div>

   <div class="relative overflow-x-auto">
      <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700" id="dataTable">
         <thead>
            <tr>
               <th
                  v-for="item in useEmergencyDoctorReportsTableHeader"
                  class="text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
               >
                  {{ item.label }}
               </th>
            </tr>
         </thead>
         <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr v-for="item in data">
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.name }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.trans_summary }}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getEmergencyDoctors } from '@/utils/api/reports'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
store.title = 'Laporan Dokter Emergency'
useHead({ title: store.getTitle })

const data : Ref <Model.Report.Doctor[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const filter : Ref <API.Payload.DateRangePayload> = ref({
   start_date: moment().startOf('month').format('YYYY-MM-DD'),
   end_date: moment().endOf('month').format('YYYY-MM-DD')
})

onBeforeMount(async () => {
   await fetchEmergencyDoctors()
})

const fetchEmergencyDoctors = async () => {
   loading.value = true
   const payload: API.Payload.DateRangePayload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD')
   }
   await getEmergencyDoctors(payload)
      .then((resp) => {
         dataLength.value = resp.length
         data.value = resp
      })
      .finally(() => {
         loading.value = false
      })
}
</script>