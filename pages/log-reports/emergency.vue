<template>
   <u-card>
      <app-data-table
         :columns="useEmergencyLogTableHeaders"
         :rows="data"
         :data-length="dataLength"
         :loading="loading"
         hide-search-input
         @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
      >
         <template #filters>
            <div class="col-span-4 flex items-end">
               <u-form-group
                  label="Filter"
                  class="w-full"
               >
                  <div class="grid grid-cols-4 gap-1">
                     <u-select-menu
                        v-model="filterOptionsValue"
                        :options="filterOptions"
                        value-attribute="id"
                        option-attribute="label"
                     >
                        <template #label>
                           <span class="truncate">
                              {{ filterOptions.find((item: any) => item.id === filterOptionsValue).label }}
                           </span>
                        </template>
                     </u-select-menu>
                     <u-input
                        v-model="filter"
                        placeholder="Cari..."
                        class="col-span-3"
                        @keyup.enter="fetchEmergency()"
                     ></u-input>
                  </div>
               </u-form-group>
            </div>
         </template>
      </app-data-table>
   </u-card>
   </template>
   
<script setup lang="ts">
import moment from 'moment'
const store = useAppStore()
store.title = 'Logs Report: Emergency'
useHead({ title: store.getTitle })

const emergency = useParse.Object.extend('Emergency_logs')
const parseQuerySubs : Ref <any> = ref(await (new useParse.Query(emergency)).subscribe())

const data : Ref <Model.LogsReport.Emergency[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const filter : Ref <string> = ref('')
const filterOptions : Ref <any> = ref([
   { id: "patient_email", label: "Email Pasien"},
   { id: "emergency_type", label: "Tipe Emergency"},
])
const filterOptionsValue : Ref <string> = ref('patient_email')

onBeforeMount(async () => {
   await fetchEmergency()
})

onUnmounted(async () => {
   await parseQuerySubs.value.unsubscribe()
})

const fetchEmergency = async () => {
   loading.value = true
   const query = new useParse.Query(emergency)
   query.descending("updatedAt")
   query.contains(filterOptionsValue.value, filter.value)
   query.limit(perPage.value)
   query.skip((page.value - 1) * perPage.value)
   query.withCount()

   await query.find()
      .then((resp: API.ParseResponse <any>) => {
         const { count, results } = resp
         const resultMap: Model.LogsReport.Emergency[] = results.map((item: any) => item.toJSON())
         resultMap.forEach(item => item.updatedAt = formatDate(item.updatedAt!))
         data.value = resultMap
         dataLength.value = count!
      })
      .finally(() => {
         loading.value = false
      })
}

const emitHandler =  async (emitSearch: string, emitPage: number, emitPerPage: number) => {
   page.value = emitPage
   perPage.value = emitPerPage

   await fetchEmergency()
}

const formatDate = (date: string) => moment(date).format('DD/MM/YYYY HH:mm')
</script>