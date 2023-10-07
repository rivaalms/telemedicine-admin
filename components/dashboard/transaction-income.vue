<template>
<div class="grid grid-cols-2 gap-2">
   <div class="col-span-2 flex justify-between">
      <p class="font-semibold text-lg">Transaksi & Pendapatan</p>
   </div>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Total Transaksi</p>
      <p class="text-xl">
         {{ summary }}
      </p>
   </u-card>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Total Pendapatan</p>
      <p class="text-xl">
         {{ parseCurrency(amount) }}
      </p>
   </u-card>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Trend Transaksi</p>
      <div class="pt-2 relative overflow-x-auto min-h-[350px]">
         <apexchart
            :options="amountChartOptions"
            :series="amountChartData"
         ></apexchart>
      </div>
   </u-card>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Trend Pendapatan</p>
      <div class="pt-2 relative overflow-x-auto min-h-[350px]">
         <apexchart
            :options="summaryChartOptions"
            :series="summaryChartData"
         ></apexchart>
      </div>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getTransactionIncome } from '@/utils/api/dashboard'

const amount : Ref <number> = ref(0)
const summary : Ref <number> = ref(0)
const amountMonthly : Ref <any> = ref([])
const summaryMonthly : Ref <any> = ref([])

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
   await getTransactionIncome('2023')
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
})

const parseCurrency = (value: string | number) => {
   const number = Number(value)
   return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
   })
}
</script>