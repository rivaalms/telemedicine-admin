<template>
<u-card>
   <app-data-table
      :columns="useDoctorSpecialistTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center gap-4">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-specialist', 'Tambah Spesialis', { data: null, selectOptions: specialistOptions }, async () => await fetchSpecialists())"
            >
               Tambah Spesialis
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
                  @click.stop="store.showDialog('edit-specialist', 'Sunting Spesialis', { data: row, selectOptions: specialistOptions }, async () => await fetchSpecialists())"
               ></u-button>
            </u-tooltip>

            <u-tooltup text="Sunting Foto">
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-photo"
                  @click.stop="store.showDialog('edit-image-specialist', 'Sunting Foto Spesialis', row, async () => await fetchSpecialists())"
               ></u-button>
            </u-tooltup>

            <u-tooltip text="Hapus">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-trash"
                  @click.stop="store.showDialog('delete-specialist', 'Hapus Spesialis', row, async () => await fetchSpecialists())"
               ></u-button>
            </u-tooltip>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getSpecialists } from '@/utils/api/masters'

const store = useAppStore()
store.dialog.callback = async () : Promise <void> => await fetchSpecialists()
store.title = 'Spesialis Dokter'
useHead({ title: store.getTitle })

const raw : Ref <Model.Master.DoctorsSpecialist[]> = ref([])
const data : Ref <Model.Master.DoctorsSpecialist[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)
const specialistOptions : Ref <Model.Master.DoctorsSpecialist[]> = ref([])

onBeforeMount(async () : Promise <void> => {
   await fetchSpecialists()
})

const fetchSpecialists = async () : Promise <void> => {
   loading.value = true
   await getSpecialists()
      .then((resp) => {
         raw.value = resp
         specialistOptions.value = resp
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
            (value.name?.toLowerCase().includes(search.value!.toLowerCase()))
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