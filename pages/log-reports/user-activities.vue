<template>
<u-card>
   <app-data-table
      :columns="useUserActivityTableHeaders"
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
                        <p class="truncate">
                           {{ filterOptions.find((item: any) => item.id === filterOptionsValue)!.label }}
                        </p>
                     </template>
                  </u-select-menu>
                  <u-input
                     v-model="filter"
                     placeholder="Cari..."
                     class="col-span-3"
                     @keyup.enter="fetchUserActivity()"
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
store.title = 'Logs Report: Aktivitas User'
useHead({ title: store.getTitle })

const Parse : any = useParse()
const userActivity = Parse.Object.extend('User_activity_logs')
const parseQuerySubs : Ref <any> = ref(await (new Parse.Query(userActivity)).subscribe())

const data : Ref <Model.LogsReport.UserActivity[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const filter : Ref <any> = ref('')
const filterOptions : Ref <{ id: string, label: string }[]> = ref([
   { id: 'email', label: 'Email' },
   { id: 'activity', label: 'Aktivitas' },
])
const filterOptionsValue : Ref <string> = ref('email')

onBeforeMount(async () : Promise <void> => {
   await fetchUserActivity()
})

onUnmounted(async () => {
   await parseQuerySubs.value.unsubscribe()
})

const fetchUserActivity = async () => {
   loading.value = true
   const query = new Parse.Query(userActivity)
   query.equalTo('user_type', "App\\Model\\Doctor")
   query.descending("updatedAt")
   query.contains(filterOptionsValue.value, filter.value.toString())
   query.limit(perPage.value)
   query.skip((page.value - 1) * perPage.value)
   query.withCount()

   await query.find()
      .then((resp: API.Response.Parse <API.Response.Parse.ObjectNotation[]>) => {
         const { count, results } = resp
         const resultMap: Model.LogsReport.UserActivity[] = results.map((item: any) => item.toJSON())
         resultMap.forEach(item => {
            item.createdAt = useFormatDate(item.createdAt!)
         })
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

   await fetchUserActivity()
}
</script>