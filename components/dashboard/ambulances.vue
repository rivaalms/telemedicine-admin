<template>
<div class="grid grid-cols-3 gap-2">
   <div class="col-span-3 flex justify-between">
      <p class="font-semibold text-lg">Ambulance</p>
   </div>

   <u-card class="col-span-3">
      <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah Ambulance</p>
      <p class="text-xl">{{ total }}</p>
   </u-card>

   <u-card v-for="item in data">
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.ambulance_type }}</p>
      <p class="text-xl">{{ item.total }}</p>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getSummaryAmbulance } from '@/utils/api/dashboard'

const data : Ref <Dashboard.Ambulance[]> = ref([])
const total : Ref <number> = ref(0)

onBeforeMount(async () => {
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