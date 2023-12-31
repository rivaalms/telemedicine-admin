<template>
   <u-card>
      <app-data-table
         :columns="useEmergencyTableHeader"
         :rows="data"
         :data-length="dataLength"
         :loading="loading"
         @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
      >
         <template #filters>
            <u-form-group
               label="Status"
               class="col-span-4 md:col-span-4 xl:col-span-2"
            >
               <u-select-menu
                  v-model="filter.status"
                  :options="useFilterStatusOptions"
                  @update:model-value="fetchEmergency()"
               ></u-select-menu>
            </u-form-group>
         </template>

         <template #actions="{ row }">
            <div class="flex justify-end items-center gap-2">
               <u-tooltip text="Detail">
                  <u-button
                     variant="ghost"
                     color="sky"
                     icon="i-heroicons-eye"
                     @click.stop="store.showDialog('details-emergency', 'Detail Emergency', row)"
                  ></u-button>
               </u-tooltip>
            </div>
         </template>
      </app-data-table>
   </u-card>
</template>

<script setup lang="ts">
import { get as GetEmergency } from '@/utils/api/emergency'

const store = useAppStore()
store.title = 'Emergency'
useHead({ title: store.getTitle })

const raw : Ref <Model.Emergency[]> = ref([])
const data : Ref<Model.Emergency[] | []> = ref([])
const dataLength : Ref<number> = ref(0)

const filter : Ref <{ [key: string]: string }> = ref({
   status: 'All'
})
const page : Ref <number> = ref(1)
const search : Ref <string | null> = ref(null)
const perPage : Ref <number> = ref(10)
const loading : Ref <boolean> = ref(false)

onBeforeMount(async () : Promise <void> => {
   await fetchEmergency()
})

const fetchEmergency = async () : Promise <void> => {
   loading.value = true
   await GetEmergency()
      .then((resp) => {
         raw.value = resp
         responseHandler()
      })
      .finally(() => {
         loading.value = false
      })
}

const responseHandler = () : void => {
   let response = raw.value.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())

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
}

const emitHandler = (emitSearch: string, emitPage: number, emitPerPage: number) : void => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   responseHandler()
}
</script>