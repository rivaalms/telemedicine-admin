<template>
   <div class="grid grid-cols-1 gap-2">
      <u-card>
         <app-data-table
            :columns="useMedicalFacilityTableHeader"
            :rows="data"
            :data-length="dataLength"
            :loading="loading"
            @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
         >
            <template #filters>
               <div class="col-start-12 flex justify-end items-center">
                  <u-button
                     icon="i-heroicons-plus"
                     @click.stop="store.showDialog('add-medical-facility', 'Tambah Fasilitas Kesehatan', null, async () => await fetchMedicalFacilities())"
                  >
                     Tambah Faskes
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
                  @click.stop="store.showDialog('edit-medical-facility', 'Sunting Fasilitas Kesehatan', row, async () => await fetchMedicalFacilities())"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Sunting gambar">
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-photo"
                  @click.stop="store.showDialog('edit-image-medical-facility', 'Sunting Gambar Fasilitas Kesehatan', row, async () => await fetchMedicalFacilities())"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Hapus">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-trash"
                  @click.stop="store.showDialog('delete-medical-facility', 'Hapus Fasilitas Kesehatan', row, async () => await fetchMedicalFacilities())"
               ></u-button>
            </u-tooltip>
         </div>
            </template>
         </app-data-table>
      </u-card>
   </div>
   </template>
   
   <script setup lang="ts">
   import { get as getMedicalFacilities } from '@/utils/api/medical-facilities'
   
   const store = useAppStore()
   store.title = 'Fasilitas Kesehatan'
   useHead({ title: store.getTitle })
   
   const raw : Ref <Model.MedicalFacility[]> = ref([])
   const data : Ref <Model.MedicalFacility[]> = ref([])
   const dataLength : Ref <number> = ref(0)
   const loading : Ref <boolean> = ref(false)
   const search : Ref <string | null> = ref(null)
   const page : Ref <number> = ref(1)
   const perPage : Ref <number> = ref(10)
   
   onBeforeMount(async () : Promise <void> => {
      await fetchMedicalFacilities()
   })
   
   const fetchMedicalFacilities = async () : Promise <void> => {
      loading.value = true
      await getMedicalFacilities()
         .then(resp => {
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
         response = response.filter(value => value.name?.toLowerCase().includes(search.value!.toLowerCase()))
      }
   
      dataLength.value = response.length
      data.value = response.slice((page.value - 1) * perPage.value, page.value * perPage.value)
   }
   
   const emitHandler = (emitSearch: string, emitPage: number, emitPerPage: number) : void => {
      search.value = emitSearch
      page.value = emitPage
      perPage.value = emitPerPage
   
      responseHandler()
   }
   </script>