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
            :max-date="new Date(filter.end_date!)"
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
            :min-date="new Date(filter.start_date!)"
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
            :disabled="data.length < 1"
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
            <template v-if="data.length > 0">
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
            </template>

            <template v-else>
               <tr>
                  <td colspan="12">
                     <div class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14">
                        <u-icon name="i-heroicons-circle-stack-20-solid" class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"></u-icon>
                        <p class="text-sm text-center text-gray-900 dark:text-white">No items.</p>
                     </div>
                  </td>
               </tr>
            </template>
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
const filter : Ref <Utility.DateRange> = ref({
   start_date: moment().startOf('month').format('YYYY-MM-DD'),
   end_date: moment().endOf('month').format('YYYY-MM-DD')
})

onBeforeMount(async () : Promise <void> => {
   await fetchEmergencies()
})

const fetchEmergencies = async () : Promise <void> => {
   loading.value = true
   const payload: Utility.DateRange = {
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