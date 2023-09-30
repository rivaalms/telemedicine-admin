<template>
   <u-card>
      <app-data-table
         :columns="useEmergencyLogTableHeaders"
         :rows="data"
         :data-length="dataLength"
         :loading="loading"
         @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
      ></app-data-table>
   </u-card>
   </template>
   
   <script setup lang="ts">
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
      { value: "patient_email", text: "Email Pasien"},
      { value: "emergency_type", text: "Tipe Emergency"},
      { value: "status", text: "Status"},
      { value: "updatedAt", text: "Tanggal"},
   ])
   const filterOptionsValue : Ref <string> = ref('patient_email')
   
   onBeforeMount(async () => {
      await fetchUserActivity()
   })
   
   onUnmounted(async () => {
      await parseQuerySubs.value.unsubscribe()
   })
   
   const fetchUserActivity = async () => {
      loading.value = true
      const query = new useParse.Query(emergency)
      query.descending("updatedAt")
      query.contains(filterOptionsValue.value, filter.value)
      query.limit(perPage.value)
      query.skip((page.value - 1) * perPage.value)
      query.withCount()
   
      await query.find()
         .then((resp: API.ParseResponse <Model.LogsReport.Emergency[]>) => {
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