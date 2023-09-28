<template>
   <u-card>
      <app-data-table
         :columns="useEmergencyTableHeader"
         :rows="data"
         :filter="filter"
         :data-length="dataLength"
         :loading="loading"
         @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
      >
         <template #filters>
            <u-form-group
               label="Status"
            >
               <u-select-menu
                  v-model="filter.status"
                  :options="useFilterStatusOptions"
                  @update:model-value="fetchEmergency()"
               ></u-select-menu>
            </u-form-group>
         </template>
      </app-data-table>
   </u-card>
</template>

<script setup lang="ts">
import { get as GetEmergency } from '@/utils/api/emergency'

const store = useAppStore()
store.title = 'Emergency'
useHead({ title: store.getTitle })

const data : Ref<Model.Emergency[] | []> = ref([])
const dataLength : Ref<number> = ref(0)

const filter = ref({
   status: 'All'
})
const page : Ref <number> = ref(1)
const search : Ref <string | null> = ref(null)
const perPage : Ref <number> = ref(10)
const loading : Ref <boolean> = ref(false)

onBeforeMount(async () => {
   await fetchEmergency()
})

const fetchEmergency = async () => {
   loading.value = true
   await GetEmergency()
      .then((resp) => {
         let response = resp.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
         
         if (filter.value.status !== 'All') response = response.filter((value) => value.status! === filter.value.status)

         if (search.value && search.value.length > 0) {
            response = response.filter((value) => {
               const match =
                  (value.request_by && value.request_by.full_name?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.request_by && value.request_by.phone_number?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.patient && value.patient.patient_name?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.patient && value.patient.patient_nik?.toString().toLowerCase().includes(search.value!.toLowerCase()))

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

   await fetchEmergency()
}
</script>