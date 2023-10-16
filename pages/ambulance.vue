<template>
<u-card>
   <app-data-table
      :columns="useAmbulanceTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-ambulance', 'Tambah Ambulance', null, async () => await fetchAmbulances())"
            >
               Tambah Ambulance
            </u-button>
         </div>
      </template>

      <template #actions="{ row }">
         <div class="flex justify-end items-center gap-2">
            <u-tooltip text="Sunting">
               <u-button
                  variant="ghost"
                  color="amber"
                  icon="i-heroicons-pencil"
                  @click.stop="store.showDialog('edit-ambulance', 'Sunting Ambulance', row, async () => await fetchAmbulances())"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Hapus">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-trash"
                  @click.stop="store.showDialog('delete-ambulance', 'Hapus Ambulance', row, async () => await fetchAmbulances())"
               ></u-button>
            </u-tooltip>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetAmbulances } from '@/utils/api/ambulance'

const store = useAppStore()
store.title = 'Ambulance'
useHead({ title: store.getTitle })

const raw : Ref <Model.Ambulance[]> = ref([])
const data : Ref <Model.Ambulance[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () : Promise <void> => {
   await fetchAmbulances()
})

const fetchAmbulances = async () : Promise <void> => {
   loading.value = true
   await GetAmbulances()
      .then((resp) => {
         raw.value = resp
         responseHandler()
      })
      .finally(() => {
         loading.value = false
      })
}

const responseHandler = () : void => {
   let response = raw.value.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())

   if (search.value && search.value.length > 0) {
      response = response.filter(value => {
         const match =
            (value.plate_number?.toLowerCase().includes(search.value!.toLowerCase())) ||
            (value.ambulance_type?.toLowerCase().includes(search.value!.toLowerCase())) ||
            (value.vehicle_type?.toLowerCase().includes(search.value!.toLowerCase()))
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