<template>
<u-card>
   <app-data-table
      :columns="usePageDoctorSchedulesTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   ></app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getDoctorSchedules } from '@/utils/api/doctors'
import moment from 'moment'

type Days = {
   [key: string]: string | null | undefined
}

type Data = Days & {
   full_name: string
}

const store = useAppStore()
store.title = 'Jadwal Dokter'
useHead({ title: store.getTitle })

const raw : Ref <API.Response.Doctor.Schedule[]> = ref([])
const data : Ref <Data[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () : Promise <void> => {
   await fetchDoctorSchedules()
})

const fetchDoctorSchedules = async () : Promise <void> => {
   loading.value = true
   await getDoctorSchedules()
      .then((resp) => {
         raw.value = resp
         responseHandler()
      })
      .finally(() => {
         loading.value = false
      })
}

const responseHandler = () : void => {
   let response : Data[] = raw.value.map(item => {
      let days: Days = {
         sun: null,
         mon: null,
         tue: null,
         wed: null,
         thu: null,
         fri: null,
         sat: null
      }

      item.schedules!.forEach(schedule => {
         const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][(schedule.day as number)]
         days[day] = `${convertTime(schedule.start_time!, schedule.end_time!)} (${schedule.kuota || '0'})`
      })

      return {
         full_name: item.full_name,
         ...days
      } as Data
   })

   if (search.value && search.value.length > 0) {
      response = response.filter(value => (value.full_name?.toString().toLowerCase().includes(search.value!.toLowerCase())))
   }

   dataLength.value = response.length
   data.value = response.slice((page.value - 1) * perPage.value, (page.value) * perPage.value)
}

const emitHandler = (emitSearch: string, emitPage: number, emitPerPage: number) : void => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   responseHandler()
}

const convertTime = (start_time: string, end_time: string) : string => {
   const start = start_time ? moment(start_time, 'HH:mm:ss').format('HH:mm') : ''
   const end = end_time ? moment(end_time, 'HH:mm:ss').format('HH:mm') : ''

   return `${start} - ${end}`
}
</script>