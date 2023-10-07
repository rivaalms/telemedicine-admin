<template>
<div class="grid grid-cols-3 gap-2">
   <div class="col-span-3 flex justify-between">
      <p class="font-semibold text-lg">Emergency</p>
   </div>

   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah Emergency</p>
      <p class="text-xl">{{ total }}</p>
   </u-card>
   <u-card class="bg-[#7ea05e]">
      <p class="text-sm text-gray-50 dark:text-gray-400">Finished</p>
      <p class="text-xl text-white">{{ finished }}</p>
   </u-card>
   <u-card class="bg-[#fb9126]">
      <p class="text-sm text-gray-50 dark:text-gray-400">Not Answered</p>
      <p class="text-xl text-white">{{ notAnswered }}</p>
   </u-card>

   <u-card class="col-span-3">
      <p class="text-sm text-gray-500 dark:text-gray-400">
         Trend Emergency
      </p>
      <div class="pt-2 relative overflow-x-auto min-h-[350px]">
         <apexchart
            height="350"
            :options="emergencyChartOptions"
            :series="emergencyChartData"
         ></apexchart>
      </div>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getSummaryEmergency, getEmergencyTrends } from '@/utils/api/dashboard'
import moment from 'moment'

const finished : Ref <number> = ref(0)
const notAnswered : Ref <number> = ref(0)
const total : ComputedRef <number> = computed(() => finished.value + notAnswered.value)
const filter : Ref <any> = ref({
   start_date: moment().startOf('month'),
   end_date: moment().endOf('month'),
   year: moment().year()
})
const trendData : Ref <any> = ref([])
const months: Ref <string[]> = ref([])

const emergencyChartData : ComputedRef <any> = computed(() => {
   const value : any = []
   const finished : any = []
   const notAnswered : any = []

   trendData.value.forEach((e: any, i: any) => {
      if (e.finished && e.notAnswered) value[i] = parseInt(e.finished) + parseInt(e.notAnswered)
      else if (e.finished && !e.notAnswered) value[i] = e.finished
      else if (!e.finished && e.notAnswered) value[i] = e.notAnswered
      else if (!e.finished && !e.notAnswered) value[i] = 0

      months.value[i] = e.month
      finished[i] = e.finished || 0
      notAnswered[i] = e.notAnswered || 0
   })

   return [
      {
         name: 'Finished',
         data: finished,
      },
      {
         name: 'Not Answered',
         data: notAnswered
      }
   ]
})

const emergencyChartOptions : ComputedRef <any> = computed(() => {
   return {
      chart: {
         id: 'emergencyChart',
         type: 'bar',
         stacked: true
      },
      xaxis: {
         categories: months.value
      },
      colors: [/* '#251a28',  */'#7ea05e', '#fb9126'],
      dataLabels: {
         enabled: true,
         style: {
            fontSize: '10px',
            fontWeight: 500,
            fontFamily: 'Nunito Sans'
         }
      },
   }
})

onBeforeMount(async () => {
   await fetchSummaryEmergency()
   await fetchEmergencyTrends()
})

const fetchSummaryEmergency = async () => {
   const payload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD')
   }

   await getSummaryEmergency(payload)
      .then((resp) => {
         finished.value = resp.find(item => item.status === 'Finished')?.total! || 0
         notAnswered.value = resp.find(item => item.status === 'Not Answered')?.total! || 0
      })
}

const fetchEmergencyTrends = async () => {
   await getEmergencyTrends(filter.value.year)
      .then((resp) => {
         const data = resp.summaryMonthly
         let number = 1
         let i: string

         while (number < 13) {
            i = number.toLocaleString('id-ID', {
               minimumIntegerDigits: 2,
               useGrouping: false
            })

            trendData.value.push(data[i])
            number++
         }
      })
}
</script>