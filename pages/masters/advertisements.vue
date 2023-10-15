<template>
<u-card>
   <app-data-table
      :columns="useAdvertTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-advertisement', 'Tambah Data Iklan', null, async () => await fetchAdvert())"
            >
               Tambah Data Iklan
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
                  @click.stop="store.showDialog('edit-advertisement', 'Sunting Data Iklan', row, async () => await fetchAdvert())"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Sunting Gambar">
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-photo"
                  @click.stop="store.showDialog('edit-image-advertisement', 'Sunting Gambar Data Iklan', row, async () => await fetchAdvert())"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Hapus">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-trash"
                  @click.stop="store.showDialog('delete-advertisement', 'Hapus Data Iklan', row, async () => await fetchAdvert())"
               ></u-button>
            </u-tooltip>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getAdvertisement } from '@/utils/api/masters'

const store = useAppStore()
store.title = 'Data Iklan'
useHead({ title: store.getTitle })

const data : Ref <Model.Master.Advertisement[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchAdvert()
})

const fetchAdvert = async () => {
   loading.value = true
   await getAdvertisement()
      .then((resp) => {
         let response = resp

         if (search.value && search.value.length > 0) {
            response = response.filter(value => {
               const match =
                  (value.title?.toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.description?.toLowerCase().includes(search.value!.toLowerCase()))
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

   await fetchAdvert()
}
</script>