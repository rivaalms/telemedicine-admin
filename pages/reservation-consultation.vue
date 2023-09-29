<template>
<u-card>
   <app-data-table
      :columns="useReservationTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <u-form-group
            label="Status"
         >
            <u-select-menu
               v-model="filters.status"
               :options="useReservationStatusOptions"
               @update:model-value="fetchReservation()"
            ></u-select-menu>
         </u-form-group>

         <u-form-group
            label="Start date"
            class="col-span-2"
         >
            <vue-date-picker
               v-model="filters.start_date"
               auto-apply
               @update:model-value="fetchReservation()"
            >
               <template #trigger>
                  <u-input
                     :model-value="moment(filters.start_date).format('YYYY-MM-DD')"
                     readonly="readonly"
                  ></u-input>
               </template>
            </vue-date-picker>
         </u-form-group>

         <u-form-group
            label="End date"
            class="col-span-2"
         >
            <vue-date-picker
               v-model="filters.end_date"
               auto-apply
               @update:model-value="fetchReservation()"
            >
               <template #trigger>
                  <u-input
                     :model-value="moment(filters.end_date).format('YYYY-MM-DD')"
                     readonly="readonly"
                  ></u-input>
               </template>
            </vue-date-picker>
         </u-form-group>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetReservation } from '@/utils/api/reservation-consultation'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
store.title = 'Reservasi Konsultasi'
useHead({ title: store.getTitle })

const data : Ref <Model.ReservationConsultation[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

const filters : Ref <any> = ref({
   status: 'All',
   start_date: moment().startOf('month').format('YYYY-MM-DD'),
   end_date: moment().endOf('month').format('YYYY-MM-DD')
})

onBeforeMount(async () => {
   await fetchReservation()
})

const fetchReservation = async () => {
   loading.value = true

   await GetReservation(filters.value)
      .then((resp) => {
         let response = resp.sort((a, b) => new Date(b.reservation_date!).getTime() - new Date(a.reservation_date!).getTime())

         if (search.value && search.value.length > 0) {
            response = response.filter(value => {
               const match =
                  (value.patient?.name?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.patient?.phone_number?.toString().toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.doctor?.name?.toLowerCase().includes(search.value!.toLowerCase()))
               return match
            })
         }

         dataLength.value = response.length
         data.value = response.slice((page.value - 1) * perPage.value, (page.value) * perPage.value)
      })
      .finally(() => {
         loading.value = false
      })
}

const emitHandler = async (emitSearch: string, emitPage: number, emitPerPage: number) => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   await fetchReservation()
}
</script>

<style>
.dp__theme_dark, .dp__theme_light {
   --dp-primary-color: #e44f4f;
}
</style>