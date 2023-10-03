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
            @update:model-value="fetchEmergencies()"
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
            @update:model-value="fetchEmergencies()"
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
            @click.stop="useExportExcel('EmergencyReport', filter)"
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
                  v-for="item in useEmergencyReportsTableHeader"
                  class="text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm"
               >
                  {{ item.label }}
               </th>
            </tr>
         </thead>
         <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr v-for="item in data">
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.transaction?.transaction_number }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.request_by?.full_name }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.request_by?.phone_number }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.patient?.patient_name }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.pickup_location }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.doctor?.full_name }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.ambulance?.officer?.full_name }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.status }}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getEmergencies } from '@/utils/api/reports'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
store.title = 'Laporan Emergency'
useHead({ title: store.getTitle })

const data : Ref <Model.Report.Emergency[]> = ref([])
const loading : Ref <boolean> = ref(false)
const filter : Ref <API.Payload.DateRangePayload> = ref({
   start_date: moment().startOf('month').format('YYYY-MM-DD'),
   end_date: moment().endOf('month').format('YYYY-MM-DD')
})

onBeforeMount(async () => {
   await fetchEmergencies()
})

const fetchEmergencies = async () => {
   loading.value = true
   const payload: API.Payload.DateRangePayload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD')
   }
   await getEmergencies(payload)
      .then((resp) => {
         data.value = resp
      })
      .finally(() => {
         loading.value = false
      })
}
</script>