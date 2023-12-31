<template>
   <u-card>
      <app-data-table
         :columns="useEmergencyLogTableHeaders"
         :rows="data"
         :data-length="dataLength"
         :loading="loading"
         hide-search-input
         @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
      >
         <template #filters>
            <div class="col-span-12 md:col-span-6 2xl:col-span-4 flex items-end">
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
                              {{ filterOptions.find((item: any) => item.id === filterOptionsValue)!.label }}
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

const Parse : any = useParse()
const emergency = Parse.Object.extend('Emergency_logs')
const parseQuerySubs : Ref <any> = ref(await (new Parse.Query(emergency)).subscribe())

const data : Ref <Model.LogsReport.Emergency[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const filter : Ref <string> = ref('')
const filterOptions : Ref <{ id: string, label: string }[]> = ref([
   { id: "patient_email", label: "Email Pasien"},
   { id: "emergency_type", label: "Tipe Emergency"},
])
const filterOptionsValue : Ref <string> = ref('patient_email')

onBeforeMount(async () => {
   await fetchEmergency()
})

onUnmounted(async () : Promise <void> => {
   await parseQuerySubs.value.unsubscribe()
})

const fetchEmergency = async () => {
   loading.value = true
   const query = new Parse.Query(emergency)
   query.descending("updatedAt")
   query.contains(filterOptionsValue.value, filter.value)
   query.limit(perPage.value)
   query.skip((page.value - 1) * perPage.value)
   query.withCount()

   await query.find()
      .then((resp: API.Response.Parse <API.Response.Parse.ObjectNotation[]>) => {
         const { count, results } = resp
         const resultMap: Model.LogsReport.Emergency[] = results.map((item) => item.toJSON())
         resultMap.forEach(item => item.updatedAt = useFormatDate(item.updatedAt!))
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
</script>