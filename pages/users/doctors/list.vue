<template>
<u-card>
   <app-data-table
      :columns="useDoctorsTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex items-center justify-end">
            <u-button
               color="primary"
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-doctor', 'Tambah Dokter', null, async () => await fetchDoctorList())"
            >
               Tambah Dokter
            </u-button>
         </div>
      </template>

      <template #actions="{ row }">
         <div class="flex justify-end items-center gap-2">
            <u-tooltip text="Detail">
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-eye"
                  @click.stop="doctorDetails(row)"
               ></u-button>
            </u-tooltip>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { RouteLocationRaw, NavigationFailure } from 'vue-router'
import { get as GetDoctorList } from '@/utils/api/doctors'
const store = useAppStore()

store.title = "List Dokter"
useHead({ title: store.getTitle })

const raw : Ref <Model.Doctor[]> = ref([])
const data : Ref<Model.Doctor[] | []> = ref([])
const dataLength : Ref <number> = ref(0)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage: Ref <number> = ref(10)
const loading : Ref <boolean> = ref(false)

onBeforeMount(async () : Promise <void> => {
   await fetchDoctorList()
})

const fetchDoctorList = async () : Promise <void> => {
   loading.value = true
   await GetDoctorList()
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
            (value.name?.toLowerCase().includes(search.value!.toLowerCase())) ||
            (value.no_str?.toLowerCase().includes(search.value!.toLowerCase()))
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

const doctorDetails = (item: Model.Doctor) : false | void | RouteLocationRaw | Promise<false | void | NavigationFailure> => navigateTo(`/users/doctors/${item.no_str}`)
</script>