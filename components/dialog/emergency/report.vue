<template>
<app-data-table
   :columns="useEmergencyReportTableHeader"
   :rows="(data as TData).data"
   :data-length="(data as TData).total"
   :loading="loading"
   hide-search-input
   @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
></app-data-table>
</template>

<script setup lang="ts">
import { getReports } from '@/utils/api/emergency'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const data : Ref <TData | []> = ref([])
const page : Ref <number> = ref(1)

onBeforeMount(async () => {
   await fetchReports()
})

const fetchReports = async () => {
   loading.value = true
   const payload = {
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

type TData = API.Response.LaravelPaginate <Model.Emergency[]>
</script>