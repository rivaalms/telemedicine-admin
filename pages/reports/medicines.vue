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
            @update:model-value="fetchMedicineReports()"
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
            @update:model-value="fetchMedicineReports()"
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
            @click.stop="useExportExcel('MedicinePurchases', filter)"
         >
            Export Excel
         </u-button>
      </div>
   </div>

   <div class="relative overflow-x-auto">
      <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
         <thead>
            <tr>
               <th
                  v-for="item in useMedicinePurchasesTableHeader"
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
                  {{ item.order_date }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.order_date }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ item.customer?.full_name }}
               </td>

               <template v-if="item.order_detail!.length > 1">
                  <tr v-for="detail in item.order_detail">
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ detail.medicine_name }}
                     </td>
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ detail.qty }}
                     </td>
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ detail.unit }}
                     </td>
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ parseCurrency(detail.price!) }}
                     </td>
                  </tr>
               </template>

               <template v-else>
                  <template v-for="detail in item.order_detail">
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ detail.medicine_name }}
                     </td>
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ detail.qty }}
                     </td>
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ detail.unit }}
                     </td>
                     <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ parseCurrency(detail.price!) }}
                     </td>
                  </template>
               </template>

               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ parseCurrency(item.medicine_amount!) }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ parseCurrency(item.delivery_amount!) }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ parseCurrency(item.voucher_amount!) }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {{ parseCurrency(item.total!) }}
               </td>
            </tr>
            <tr>
               <td colspan="8" class="font-bold whitespace-nowrap text-center px-3 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  Total
               </td>
               <td class="font-bold whitespace-nowrap text-center px-3 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {{ parseCurrency(subTotal!) }}
               </td>
               <td class="font-bold whitespace-nowrap text-center px-3 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {{ parseCurrency(deliveries!) }}
               </td>
               <td class="font-bold whitespace-nowrap text-center px-3 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {{ parseCurrency(vouchers!) }}
               </td>
               <td class="font-bold whitespace-nowrap text-center px-3 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {{ parseCurrency(total!) }}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getMedicinePurchases } from '@/utils/api/reports'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
store.title = 'Laporan Pembelian Obat'
useHead({ title: store.getTitle })

const data : Ref <Model.Report.Medicine[]> = ref([])

const subTotal : ComputedRef<number | null | undefined> = computed(() => data.value.length > 0 ? data.value.map(obj => obj.medicine_amount).reduce((a, b) => a! + b!) : 0)

const deliveries : ComputedRef <number | null | undefined> = computed(() => data.value.length > 0 ? data.value.map(obj => obj.delivery_amount).reduce((a, b) => a! + b!) : 0)

const vouchers : ComputedRef <number | null | undefined> = computed(() => data.value.length > 0 ? data.value.map(obj => obj.voucher_amount).reduce((a, b) => a! + b!) : 0)

const total : ComputedRef<number | null | undefined> = computed(() => data.value.length > 0 ? data.value.map(obj => obj.total).reduce((a, b) => a! + b!) : 0)

const loading : Ref <boolean> = ref(false)
const filter : Ref <any> = ref({
   start_date: moment().startOf('month').format('YYYY-MM-DD'),
   end_date: moment().endOf('month').format('YYYY-MM-DD')
})

onBeforeMount(async () => {
   await fetchMedicineReports()
})

const fetchMedicineReports = async () => {
   loading.value = true
   const payload: API.Payload.DateRangePayload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD'),
   }
   await getMedicinePurchases(payload)
      .then((resp) => {
         data.value = resp
      })
      .finally(() => {
         loading.value = false
      })
}

const parseCurrency = (value: string | number) => {
   const number = Number(value)
   return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
   })
}
</script>