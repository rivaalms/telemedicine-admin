<template>
<u-card>
   <app-data-table
      :columns="useAdminTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-admin', 'Tambah Admin', null, async () => await fetchAdmin())"
            >
               Tambah Admin
            </u-button>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getAdmin } from '@/utils/api/users'

const store = useAppStore()
store.title = 'Admin'
useHead({ title: store.getTitle })

const raw : Ref <Model.User[]> = ref([])
const data : Ref <Model.User[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchAdmin()
})

const fetchAdmin = async () => {
   loading.value = true
   await getAdmin()
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
      response = response.filter(value => {
         const match =
            (value.full_name?.toLowerCase().includes(search.value!.toLowerCase())) ||
            (value.email?.toLowerCase().includes(search.value!.toLowerCase()))
         return match
      })
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