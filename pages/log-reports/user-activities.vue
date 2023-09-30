<template>
<u-card>
   <app-data-table
      :columns="useUserActivityTableHeaders"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   ></app-data-table>
</u-card>
</template>

<script setup lang="ts">
const userActivity = useParse.Object.extend('User_activity_logs')
const parseQuerySubs : Ref <any> = ref(await (new useParse.Query(userActivity)).subscribe())

const data : Ref <Model.LogsReport.UserActivity[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const filter : Ref <any> = ref('')
const filterOptions : Ref <string> = ref('email')

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
   query.contains(filterOptions.value, filter.value)
   query.limit(perPage.value)
   query.skip((page.value - 1) * perPage.value)
   query.withCount()

   await query.find()
      .then((resp: API.ParseResponse <Model.LogsReport.UserActivity[]>) => {
         const { count, results } = resp
         const resultMap = results.map((item: any) => item.toJSON())
         data.value = resultMap
         dataLength.value = count!
      })
      .finally(() => {
         loading.value = false
      })
}

const emitHandler =  async (emitSearch: string, emitPage: number, emitPerPage: number) => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   await fetchUserActivity()
}
</script>