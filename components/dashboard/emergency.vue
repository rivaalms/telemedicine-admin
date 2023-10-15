<template>
<u-card class="overflow-visible">
   <template #header>
      <div class="flex justify-between items-center">
         <p class="font-semibold">Emergency</p>
   
         <div>
            <vue-date-picker
               v-model="year"
               year-picker
               auto-apply
               @update:model-value="fetchEmergencyTrends"
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

   <div class="pt-2 relative overflow-x-auto min-h-[350px]">
      <apexchart
         height="350"
         :options="emergencyChartOptions"
         :series="emergencyChartData"
         @data-point-selection="(evt: any, ctx: any, config: any) => onChartClicked(config)"
      ></apexchart>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getEmergencyTrends } from '@/utils/api/dashboard'
import moment from 'moment'
import 'moment/dist/locale/id'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

moment.locale('id')
const store = useAppStore()

const year : Ref <string> = ref(moment().format('YYYY'))
const trendData : Ref <any[]> = ref([])
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
         stacked: true,
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
      states: {
         active: {
            filter: {
               type: 'none'
            }
         }
      }
   }
})

onBeforeMount(async () => {
   await fetchEmergencyTrends()
})

const fetchEmergencyTrends = async () => {
   await getEmergencyTrends(year.value)
      .then((resp) => {
         const data = resp.summaryMonthly
         trendData.value = []
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

const onChartClicked = async (config: any) => {
   const { dataPointIndex, seriesIndex } : { [key: string]: number } = config

   const data = trendData.value[dataPointIndex]
   const status = config.w.config.series[seriesIndex].name

   const payload : API.Payload.EmergencyReport = {
      start_date: moment(`${data.month} ${year.value}`, 'MMMM YYYY').startOf('month').format('YYYY-MM-DD'),
      end_date: moment(`${data.month} ${year.value}`, 'MMMM YYYY').endOf('month').format('YYYY-MM-DD'),
      status,
      latest: 0,
   }

   store.showDialog('report-emergency', `Laporan Emergency ${status} ${data.month} ${year.value}`, payload)
}
</script>