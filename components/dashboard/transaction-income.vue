<template>
<u-card class="overflow-visible">
   <template #header>
      <div class="flex justify-between items-center">
         <p class="font-semibold">Transaksi & Pendapatan</p>

         <div>
            <vue-date-picker
               v-model="year"
               year-picker
               auto-apply
               @update:model-value="fetchTransactionIncome"
            >
               <template #trigger>
                  <u-input
                     :model-value="year"
                     readonly="readonly"
                     icon="i-heroicons-calendar-solid"
                     size="2xs"
                  ></u-input>
               </template>
            </vue-date-picker>
         </div>
      </div>
   </template>

   <div class="grid grid-cols-2 gap-2">
      <u-card class="shadow-none ring-0 text-center">
         <p class="text-sm text-gray-500 dark:text-gray-400">Total Transaksi</p>
         <p class="text-xl">{{ summary }}</p>
      </u-card>

      <u-card class="shadow-none ring-0 text-center">
         <p class="text-sm text-gray-500 dark:text-gray-400">Total Pendapatan</p>
         <p class="text-xl">{{ parseCurrency(amount) }}</p>
      </u-card>

      <u-card
         class="shadow-none ring-0 py-0"
         :ui="{ body: { padding: 'py-0 sm:p-0 sm:px-6 sm:py-0' } }"
      >
         <apexchart
            :options="summaryChartOptions"
            :series="summaryChartData"
         ></apexchart>
      </u-card>

      <u-card
         class="shadow-none ring-0 py-0"
         :ui="{ body: { padding: 'py-0 sm:p-0 sm:px-6 sm:py-0' } }"
      >
         <apexchart
            :options="amountChartOptions"
            :series="amountChartData"
         ></apexchart>
      </u-card>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getTransactionIncome } from '@/utils/api/dashboard'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const amount : Ref <number> = ref(0)
const summary : Ref <number> = ref(0)
const amountMonthly : Ref <any> = ref([])
const summaryMonthly : Ref <any> = ref([])
const year : Ref <any> = ref(moment().format('YYYY'))

const amountChartData = computed(() => {
   const value: any = []
   
   amountMonthly.value.forEach((item: any, index: any) => {
      value[index] = {
         x: item.month,
         y: item.total
      }
   })

   return [{
      name: 'Jumlah Pendapatan',
      data: value,
      xaxis: {
         type: 'category'
      }
   }]
})

const amountChartOptions = computed(() => {
   return {
      chart: {
         id: 'amountChart',
         type: 'area',
      },
      colors: ['#f08080'],
      dataLabels: {
         enabled: true,
         offsetY: -8,
         style: {
            fontSize: '10px',
            fontWeight: 500,
            fontFamily: 'Nunito Sans'
         },
         formatter: (val: any) => parseCurrency(val)
      },
      markers: {
         size: 4,
         hover: {
            sizeOffset: 2
         }
      },
      tooltip: {
         enabled: true,
         y: {
            formatter: (val: any) => parseCurrency(val)
         }
      },
      yaxis: {
         labels: {
            formatter: (val: any) => parseCurrency(val)
         }
      },
      stroke: {
         width: 1.5
      }
   }
})

const summaryChartData = computed(() => {
   const value: any = []

   summaryMonthly.value.forEach((item: any, index: any) => {
      value[index] = {
         x: item.month,
         y: item.total
      }
   })

   return [{
      name: 'Jumlah Transaksi',
      data: value,
      xaxis: {
         type: 'category'
      }
   }]
})

const summaryChartOptions = computed(() => {
   return {
      chart: {
         id: 'summaryChart',
         type: 'area',
      },
      colors: ['#f08080'],
      dataLabels: {
         enabled: true,
         offsetY: -8,
         style: {
            fontSize: '10px',
            fontWeight: 500,
            fontFamily: 'Nunito Sans'
         },
      },
      markers: {
         size: 4,
         hover: {
            sizeOffset: 2
         }
      },
      stroke: {
         width: 1.5
      }
   }
})

onBeforeMount(async () => {
   await fetchTransactionIncome()
})

const fetchTransactionIncome = async () => {
   await getTransactionIncome(year.value)
      .then((resp) => {
         let number = 1
         let i: string

         amount.value = resp.amount!
         summary.value = resp.summary!
         amountMonthly.value = []
         summaryMonthly.value = []

         while (number < 13) {
            i = number.toLocaleString('id-ID', {
               minimumIntegerDigits: 2,
               useGrouping: false
            })

            amountMonthly.value.push(resp.amountMonthly[i])
            summaryMonthly.value.push(resp.summaryMonthly[i])
            number++
         }
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