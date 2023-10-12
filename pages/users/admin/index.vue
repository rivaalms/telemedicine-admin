<template>
<u-card>
   <app-data-table
      :columns="useAdminTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-admin', 'Tambah Admin', null)"
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
         let response = resp

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
      })
      .finally(() => {
         loading.value = false
      })
}

const emitHandler =  async (emitSearch: string, emitPage: number, emitPerPage: number) => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   await fetchAdmin()
}
</script>