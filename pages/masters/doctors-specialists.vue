<template>
<u-card>
   <app-data-table
      :columns="useDoctorSpecialistTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   ></app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getSpecialists } from '@/utils/api/masters'

const store = useAppStore()
store.title = 'Spesialis Dokter'
useHead({ title: store.getTitle })

const data : Ref <Model.Master.DoctorsSpecialist[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchSpecialists()
})

const fetchSpecialists = async () => {
   loading.value = true
   await getSpecialists()
      .then((resp) => {
         let response = resp

         if (search.value && search.value.length > 0) {
            response = response.filter(value => {
               const match =
                  (value.name?.toLowerCase().includes(search.value!.toLowerCase()))
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

const emitHandler =  async (emitSearch: string, emitPage: number, emitPerPage: number) => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   await fetchSpecialists()
}
</script>