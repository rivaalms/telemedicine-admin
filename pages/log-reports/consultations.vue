<template>
<u-card>
   <app-data-table
      :columns="useConsultationTableHeaders"
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
                     @keyup.enter="fetchConsultations()"
                  ></u-input>
               </div>
            </u-form-group>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
store.title = 'Logs Report: Konsultasi'
useHead({ title: store.getTitle })

const Parse : any = useParse()
const consultations = Parse.Object.extend('Consultation_logs')
const parseQuerySubs : Ref <any> = ref(await (new Parse.Query(consultations)).subscribe())

const data : Ref <Model.LogsReport.Consultation[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const filter : Ref <string> = ref('')
const filterOptions : Ref <{ id: string, label: string }[]> = ref([
   { id: "patient_email", label: "Email Pasien"},
   { id: "doctor_email", label: "Email Dokter"},
])
const filterOptionsValue : Ref <string> = ref('patient_email')

onBeforeMount(async () : Promise <void> => {
   await fetchConsultations()
})

onUnmounted(async () => {
   await parseQuerySubs.value.unsubscribe()
})

const fetchConsultations = async () => {
   loading.value = true
   const faskesId = parseInt(atob(useAuthStore().getFaskesId as string))

   const query = new Parse.Query(consultations)
   query.descending("updatedAt")
   query.equalTo('medical_facility_id', faskesId)
   query.contains(filterOptionsValue.value, filter.value)
   query.limit(perPage.value)
   query.skip((page.value - 1) * perPage.value)
   query.withCount()

   await query.find()
      .then((resp: API.Response.Parse <any>) => {
         const { count, results } = resp
         const resultMap: Model.LogsReport.Consultation[] = results.map((item: any) => item.toJSON())
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

   await fetchConsultations()
}
</script>