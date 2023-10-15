<template>
<u-card>
   <app-data-table
      :columns="useSettingsTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   ></app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetSettings } from '@/utils/api/settings'

const store = useAppStore()
store.title = 'Settings'
useHead({ title: store.getTitle })

const raw : Ref <Model.Setting[]> = ref([])
const data : Ref <Model.Setting[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchSettings()
})

const fetchSettings = async () => {
   loading.value = true
   await GetSettings()
      .then((resp) => {
         raw.value = resp
         responseHandler()
      })
      .finally(() => {
         loading.value = false
      })
}

const responseHandler = () => {
   let response = raw.value

   if (search.value && search.value.length > 0) {
      response = response.filter(value => (value.parameter_type?.toLowerCase().includes(search.value!.toLowerCase())))
   }
   dataLength.value = response.length
   data.value = response.slice((page.value - 1) * perPage.value, (page.value) * perPage.value)
}

const emitHandler = (emitSearch: string, emitPage: number, emitPerPage: number) => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   responseHandler()
}
</script>