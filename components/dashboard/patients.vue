<template>
<div class="grid grid-cols-2 gap-2">
   <div class="col-span-2 flex justify-between">
      <p class="font-semibold text-lg">Pasien</p>
   </div>

   <u-card class="col-span-2">
      <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah Pasien</p>
      <p class="text-xl">{{ total }}</p>
   </u-card>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Laki-laki</p>
      <p class="text-xl">{{ male }}</p>
   </u-card>
   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Perempuan</p>
      <p class="text-xl">{{ female }}</p>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getSummaryPatients } from '@/utils/api/dashboard'
import moment from 'moment'

const total : Ref <number> = ref(0)
const male : Ref <number> = ref(0)
const female : Ref <number> = ref(0)
const filter : Ref <any> = ref({
   start_date: moment().startOf('month'),
   end_date: moment().endOf('month'),
   year: moment().year()
})

onBeforeMount(async () => {
   await fetchPatients()
})

const fetchPatients = async () => {
   const payload = {
      start_date: moment(filter.value.start_date).format('YYYY-MM-DD'),
      end_date: moment(filter.value.end_date).format('YYYY-MM-DD')
   }

   await getSummaryPatients(payload)
      .then((resp) => {
         total.value = resp.total!
         male.value = resp.gender.male!
         female.value = resp.gender.female!
      })
}
</script>