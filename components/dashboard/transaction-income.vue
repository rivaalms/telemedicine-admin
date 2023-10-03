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
         <line-chart
            :data="summaryChartData"
            :options="summaryChartOptions"
         ></line-chart>
      </div>
   </u-card>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Trend Pendapatan</p>
      <div class="pt-2 relative overflow-x-auto min-h-[350px]">
         <line-chart 
            :data="amountChartData"
            :options="amountChartOptions"
         ></line-chart>
      </div>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getTransactionIncome } from '@/utils/api/dashboard'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ChartDataLabels)

const amount : Ref <number> = ref(0)
const summary : Ref <number> = ref(0)
const amountMonthly : Ref <any> = ref([])
const summaryMonthly : Ref <any> = ref([])

const amountChartData = computed(() => {
   const months: any = []
   const value: any = []
   
   amountMonthly.value.forEach((item: any, index: any) => {
      months[index] = item.month 
      value[index] = item.total
   })

   return {
      labels: months,
      datasets: [
         {
            label: 'Jumlah Pendapatan (Rp)',
            data: value,
            backgroundColor: '#f08080',
            borderColor: '#f08080'
         }
      ]
   }
})

const amountChartOptions = computed(() => {
   return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: 'bottom'
         },
         datalabels: {
            font: {
               size: '11px',
               weight: 'normal'
            },
            backgroundColor: '#ffffffdf',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#0000002f',
            clamp: true,
            anchor: 'end',
            align: 'top',
            formatter: (value: any) => value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
         }
      },
      scales: {
         y: {
            beginAtZero: true
         }
      }
   }
})

const summaryChartData = computed(() => {
   const months: string[] = []
   const value: number[] = []

   summaryMonthly.value.forEach((item: any, index: any) => {
      months[index] = item.month
      value[index] = item.total
   })

   return {
      labels: months,
      datasets: [{
         label: 'Jumlah Transaksi',
         data: value,
         backgroundColor: '#f08080',
         borderColor: '#f08080',
      }]
   }
})

const summaryChartOptions = computed(() => {
   return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: 'bottom'
         },
         datalabels: {
            font: {
               size: '12px',
               weight: 'bold',
            },
            backgroundColor: '#ffffffdf',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#0000002f',
            clamp: true,
            anchor: 'end',
            align: 'top',
         },
      },
      scales: {
         y: {
            beginAtZero: true,
         }
      },
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