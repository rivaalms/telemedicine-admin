<template>
<u-card>
   <app-data-table
      :columns="useDoctorsTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   >
      <template #actions="{ row }">
         <u-tooltip text="Detail">
            <u-button
               variant="ghost"
               color="sky"
               icon="i-heroicons-eye-solid"
               @click.stop="doctorDetails(row)"
            ></u-button>
         </u-tooltip>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetDoctorList } from '@/utils/api/doctors'
const store = useAppStore()

store.title = "List Dokter"
useHead({ title: store.getTitle })

const data : Ref<Model.Doctor[] | []> = ref([])
const dataLength : Ref <number> = ref(0)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage: Ref <number> = ref(10)
const loading : Ref <boolean> = ref(false)

onBeforeMount(async () => {
   await fetchDoctorList()
})

const fetchDoctorList = async () => {
   loading.value = true
   await GetDoctorList()
      .then((resp) => {
         let response = resp

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
      })
      .finally(() => {
         loading.value = false
      })
}

const emitHandler = async (emitSearch: string, emitPage: number, emitPerPage: number) => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   await fetchDoctorList()
}

const doctorDetails = (item: any) => useRouter().push(`/users/doctors/${item.no_str}`)
</script>