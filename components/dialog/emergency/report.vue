<template>
<app-data-table
   :columns="useEmergencyReportTableHeader"
   :rows="(data as Data).data"
   :data-length="(data as Data).total"
   :loading="loading"
   hide-search-input
   @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
></app-data-table>
</template>

<script setup lang="ts">
import { getReports } from '@/utils/api/emergency'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const data : Ref <Data | []> = ref([])
const page : Ref <number> = ref(1)

onBeforeMount(async () : Promise <void> => {
   await fetchReports()
})

const fetchReports = async () : Promise <void> => {
   loading.value = true
   const payload : API.Request.Emergency.Report = {
      ...store.dialog.data,
      page: page.value
   }
   
   await getReports(payload)
      .then((resp) => {
         data.value = resp
      })
      .finally(() => {
         loading.value = false
      })
}

const emitHandler = async (eSearch: string, ePage: number, ePerPage: number) => {
   page.value = ePage

   await fetchReports()
}

type Data = API.Response.LaravelPaginate <Model.Emergency[]>
</script>