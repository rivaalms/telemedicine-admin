<template>
<u-card>
   <template #header>
      <p class="font-semibold">Ambulance</p>
   </template>

   <u-card class="shadow-none ring-0">
      <apexchart
         height="350"
         :options="ambulanceChartOptions"
         :series="ambulanceChartData"
      ></apexchart>
   </u-card>
</u-card>
</template>

<script setup lang="ts">
import { getSummaryAmbulance } from '@/utils/api/dashboard'

const props = defineProps<{ render?: boolean }>()

const data : Ref <Dashboard.Ambulance[]> = ref([])
const total : Ref <number> = ref(0)

const ambulanceChartOptions = computed(() => {
   return {
      chart: {
         id: 'ambulanceChart',
         type: 'donut'
      },
      labels: data.value.map(item => item.ambulance_type),
      dataLabels: {
         formatter: (val: any, opts: any) => {
            return opts.w.config.series[opts.seriesIndex]
         },
         style: {
            fontWeight: 500,
            fontFamily: 'Nunito Sans'
         },
         dropShadow: { enabled: false }
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

const ambulanceChartData = computed(() => data.value.map(item => item.total))

watch(() => props.render, async () => {
   await fetchSummaryAmbulance()
})

const fetchSummaryAmbulance = async () => {
   await getSummaryAmbulance()
      .then((resp) => {
         resp.forEach(item => {
            total.value += item.total!
         })
         data.value = resp
      })
}
</script>