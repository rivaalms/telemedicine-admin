<template>
<u-card class="overflow-visible">
   <template #header>
      <div class="flex justify-between">
         <p class="font-semibold">Pasien</p>
   
         <div class="flex justify-around gap-2">
            <div>
               <vue-date-picker
                  v-model="filter.start_date"
                  auto-apply
                  @update:model-value="fetchPatients"
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
                  @update:model-value="fetchPatients"
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

   <u-card class="shadow-none ring-0">
      <apexchart
         height="350"
         :options="patientChartOptions"
         :series="patientChartData"
      ></apexchart>
   </u-card>
</u-card>
</template>

<script setup lang="ts">
import { getSummaryPatients } from '@/utils/api/dashboard'
import moment from 'moment'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{ render?: boolean }>()

const data : Ref <Dashboard.PatientGender> = ref({
   total: 0,
   gender: {
      male: 0,
      female: 0
   }
})

const patientChartOptions = computed(() => {
   return {
      chart: {
         id: 'patientChart',
         type: 'donut'
      },
      labels: ['Laki-laki', 'Perempuan'],
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
      plotOptions: {
         pie: {
            donut: {
               labels: {
                  show: true,
                  total: {
                     show: true,
                     showAlways: true,
                     fontFamily: 'Nunito Sans'
                  }
               }
            }
         }
      }
   }
})

const patientChartData = computed(() => [data.value.gender.male!, data.value.gender.female!])

const filter : Ref <any> = ref({
   start_date: moment().startOf('month'),
   end_date: moment().endOf('month'),
})

watch(() => props.render, async () => {
   await fetchPatients()
})

const fetchPatients = async () => {
   const payload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD')
   }

   await getSummaryPatients(payload)
      .then((resp) => {
         data.value = resp
      })
}
</script>