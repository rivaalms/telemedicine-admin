<template>
<u-card>
   <app-data-table
      :columns="useUserActivityTableHeaders"
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
                        {{ filterOptions.find((item: any) => item.id === filterOptionsValue).label }}
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

const userActivity = useParse.Object.extend('User_activity_logs')
const parseQuerySubs : Ref <any> = ref(await (new useParse.Query(userActivity)).subscribe())

const data : Ref <Model.LogsReport.UserActivity[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const filter : Ref <any> = ref('')
const filterOptions : Ref <any> = ref([
   { id: 'email', label: 'Email' },
   { id: 'activity', label: 'Aktivitas' },
])
const filterOptionsValue : Ref <string> = ref('email')

onBeforeMount(async () => {
   await fetchUserActivity()
})

onUnmounted(async () => {
   await parseQuerySubs.value.unsubscribe()
})

const fetchUserActivity = async () => {
   loading.value = true
   const query = new useParse.Query(userActivity)
   query.equalTo('user_type', "App\\Model\\Doctor")
   query.descending("updatedAt")
   query.contains(filterOptionsValue.value, filter.value.toString())
   query.limit(perPage.value)
   query.skip((page.value - 1) * perPage.value)
   query.withCount()

   await query.find()
      .then((resp: API.ParseResponse <any>) => {
         const { count, results } = resp
         const resultMap: Model.LogsReport.UserActivity[] = results.map((item: any) => item.toJSON())
         resultMap.forEach(item => {
            item.createdAt = formatDate(item.createdAt!)
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

const formatDate = (date: string) => moment(date).format('DD/MM/YYYY HH:mm')
</script>