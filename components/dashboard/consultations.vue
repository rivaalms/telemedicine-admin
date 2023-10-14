<template>
<u-card class="overflow-visible">
   <template #header>
      <div class="flex justify-between">
         <p class="font-semibold">Konsultasi</p>

         <div class="flex justify-around gap-2">
            <div>
               <vue-date-picker
                  v-model="filter.start_date"
                  auto-apply
                  @update:model-value="fetchSummaryConsultations"
               >
                  <template #trigger>
                     <u-input
                        :model-value="moment(filter.start_date).format('DD/MM/YYYY')"
                        readonly="readonly"
                        icon="i-heroicons-calendar-solid"
                        size="2xs"
                     ></u-input>
                  </template>
               </vue-date-picker>
            </div>
   
            <div>
               <vue-date-picker
                  v-model="filter.end_date"
                  auto-apply
                  @update:model-value="fetchSummaryConsultations"
               >
                  <template #trigger>
                     <u-input
                        :model-value="moment(filter.end_date).format('DD/MM/YYYY')"
                        readonly="readonly"
                        icon="i-heroicons-calendar-solid"
                        size="2xs"
                     ></u-input>
                  </template>
               </vue-date-picker>
            </div>
         </div>
      </div>
   </template>

   <div class="grid grid-cols-2 gap-4">
      <u-card class="shadow-none ring-0 border-0 col-span-2 text-center">
         <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah Konsultasi</p>
         <p class="text-xl">{{ total }}</p>
      </u-card>
      
      <u-card class="shadow-none ring-0">
         <p class="text-sm text-gray-500 dark:text-gray-400">Konsultasi Berdasarkan Dokter</p>

      <apexchart
            :options="doctorChartOptions"
            :series="doctorChartData"
      ></apexchart>
      </u-card>

      <u-card class="shadow-none ring-0">
         <p class="text-sm text-gray-500 dark:text-gray-400">Konsultasi Berdasarkan Spesialis</p>

         <apexchart
            :options="specialistChartOptions"
            :series="specialistChartData"
         ></apexchart>
      </u-card>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getSummaryConsultations } from '@/utils/api/dashboard'
import moment from 'moment'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{ render?: boolean }>()

const doctors : Ref <Dashboard.ConsultationSummaryByDoctor[]> = ref([])
const specialist : Ref <Dashboard.ConsultationSummaryBySpecialist[]> = ref([])
const total : Ref <number> = ref(0)
const filter : Ref <any> = ref({
   start_date: moment().startOf('month'),
   end_date: moment().endOf('month'),
})

const doctorChartOptions = computed(() => {
   return {
      chart: {
         id: 'consultaionDoctorChart',
         type: 'pie'
      },
      labels: doctors.value.map(item => item.full_name),
      dataLabels: {
         formatter: (val: any, opts: any) => {
            return opts.w.config.series[opts.seriesIndex]
         },
         style: {
            fontWeight: 500,
            fontFamily: 'Nunito Sans'
         },
         dropShadow: { enabled: false },
      },
   }
})

const doctorChartData = computed(() => doctors.value.map(item => item.total))

const specialistChartOptions = computed(() => {
   return {
      chart: {
         id: 'consultationSpecialistChart',
         type: 'pie'
      },
      labels: specialist.value.map(item => item.specialist),
      dataLabels: {
         formatter: (val: any, opts: any) => {
            return opts.w.config.series[opts.seriesIndex]
         },
         style: {
            fontWeight: 500,
            fontFamily: 'Nunito Sans'
         },
         dropShadow: { enabled: false },
      },
   }
})

const specialistChartData = computed(() => specialist.value.map(item => item.total))

watch(() => props.render, async () => {
   await fetchSummaryConsultations()
})

const fetchSummaryConsultations = async () => {
   const payload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD')
   }

   await getSummaryConsultations(payload)
      .then((resp) => {
         doctors.value = resp.summaryByDoctor.sort((a, b) => b.total! - a.total!)
         specialist.value = resp.summaryBySpecialist.sort((a, b) => b.total! - a.total!)

         resp.summaryBySpecialist.forEach(item => {
            total.value += item.total!
         })
      })
}
</script>