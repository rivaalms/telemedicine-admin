<template>
<u-card>
   <app-data-table
      :columns="useAmbulanceTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   ></app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetAmbulances } from '@/utils/api/ambulance'

const store = useAppStore()
store.title = 'Ambulance'
useHead({ title: store.getTitle })

const data : Ref <Model.Ambulance[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchAmbulances()
})

const fetchAmbulances = async () => {
   loading.value = true
   await GetAmbulances()
      .then((resp) => {
         let response = resp.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())

         if (search.value && search.value.length > 0) {
            response = response.filter(value => {
               const match =
                  (value.plate_number?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.ambulance_type?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.vehicle_type?.toLowerCase().includes(search.value!.toLowerCase()))
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

   await fetchAmbulances()
}
</script>