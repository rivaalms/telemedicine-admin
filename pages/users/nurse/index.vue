<template>
<u-card>
   <app-data-table
      :columns="useNurseTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-nurse', 'Tambah Perawat', null, async () => await fetchNurses())"
            >
               Tambah Perawat
            </u-button>
         </div>
      </template>

      <template #actions="{ row }">
         <template v-if="row.status === 'active'">
            <u-tooltip text="Nonaktifkan">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-no-symbol"
                  @click.stop="store.showDialog('deactivate-user', `Nonaktifkan ${row.full_name}`, row, async () => await fetchNurses())"
               ></u-button>
            </u-tooltip>
         </template>

         <template v-else-if="row.status === 'inactive'">
            <u-tooltip text="Aktifkan">
               <u-button
                  variant="ghost"
                  color="emerald"
                  icon="i-heroicons-check"
                  @click.stop="store.showDialog('activate-user', `Aktifkan ${row.full_name}`, row, async () => await fetchNurses())"
               ></u-button>
            </u-tooltip>
         </template>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getNurses } from '@/utils/api/users'

const store = useAppStore()
store.title = 'Perawat'
useHead({ title: store.getTitle })

const raw : Ref <Model.Nurse[]> = ref([])
const data : Ref <Model.Nurse[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () : Promise <void> => {
   await fetchNurses()
})

const fetchNurses = async () : Promise <void> => {
   loading.value = false
   await getNurses()
      .then((resp) => {
         raw.value = resp
         responseHandler()
      })
      .finally(() => {
         loading.value = false
      })
}

const responseHandler = () : void => {
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

const emitHandler = (emitSearch: string, emitPage: number, emitPerPage: number) : void => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   responseHandler()
}
</script>