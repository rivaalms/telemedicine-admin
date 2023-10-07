<template>
<div class="grid grid-cols-2 gap-2">
   <div class="col-span-2 flex justify-between">
      <p class="font-semibold text-lg">Konsultasi</p>
   </div>

   <u-card class="col-span-2">
      <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah Pasien</p>
      <p class="text-xl">{{ total }}</p>
   </u-card>

   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Konsultasi Berdasarkan Dokter</p>
      <app-data-table
         :columns="doctorsTableHeader"
         :rows="doctorsPaginated"
         :data-length="doctors.length"
         :loading="false"
         hide-search-input
         @fetch-data="(search, page, perPage) => doctorEmitHandler(page, perPage)"
      ></app-data-table>
   </u-card>

   <u-card>
      <p class="text-sm text-gray-500 dark:text-gray-400">Konsultasi Berdasarkan Spesialis</p>
      <app-data-table
         :columns="specialistTableHeader"
         :rows="specialistPaginated"
         :data-length="specialist.length"
         :loading="false"
         hide-search-input
         @fetch-data="(search, page, perPage) => specialistEmitHandler(page, perPage)"
      ></app-data-table>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getSummaryConsultations } from '@/utils/api/dashboard'
import moment from 'moment'

const doctors : Ref <Dashboard.ConsultationSummaryByDoctor[]> = ref([])
const specialist : Ref <Dashboard.ConsultationSummaryBySpecialist[]> = ref([])
const total : Ref <number> = ref(0)
const filter : Ref <any> = ref({
   start_date: moment().startOf('month'),
   end_date: moment().endOf('month'),
   year: moment().year()
})

const doctorsPaginated : Ref <Dashboard.ConsultationSummaryByDoctor[]> = ref([])
const specialistPaginated : Ref <Dashboard.ConsultationSummaryBySpecialist[]> = ref([])

const doctorsTableHeader : ComputedRef <any> = computed(() => {
   return [
      { key: 'full_name', label: 'Nama Dokter' },
      { key: 'total', label: 'Jumlah Konsultasi' }
   ]
})
const doctorPage : Ref <number> = ref(1)
const doctorPerPage : Ref <number> = ref(10)

const specialistTableHeader : ComputedRef <any> = computed(() => {
   return [
      { key: 'specialist', label: 'Spesialis' },
      { key: 'total', label: 'Jumlah Konsultasi' }
   ]
})
const specialistPage : Ref <number> = ref(1)
const specialistPerPage : Ref <number> = ref(10)

onBeforeMount(async () => {
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

         doctorsPaginated.value = doctors.value.slice((doctorPage.value - 1) * doctorPerPage.value, doctorPage.value * doctorPerPage.value)

         specialistPaginated.value = specialist.value.slice((specialistPage.value - 1) * specialistPerPage.value, specialistPage.value * specialistPerPage.value)
      })
}

const doctorEmitHandler = (emitPage: number, emitPerPage: number) => {
   doctorPage.value = emitPage
   doctorPerPage.value = emitPerPage

   doctorsPaginated.value = doctors.value.slice((doctorPage.value - 1) * doctorPerPage.value, doctorPage.value * doctorPerPage.value)
}

const specialistEmitHandler = (emitPage: number, emitPerPage: number) => {
   specialistPage.value = emitPage
   specialistPerPage.value = emitPerPage

   specialistPaginated.value = specialist.value.slice((specialistPage.value - 1) * specialistPerPage.value, specialistPage.value * specialistPerPage.value)
}
</script>