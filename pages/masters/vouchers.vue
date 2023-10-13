<template>
<u-card>
   <app-data-table
      :columns="useVoucherTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end align-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-voucher', 'Tambah Voucher', null)"
            >
               Tambah Voucher
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
                  @click.stop="store.showDialog('edit-voucher', 'Sunting Voucher', row)"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Sunting gambar">
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-photo"
                  @click.stop="store.showDialog('edit-image-voucher', 'Sunting Gambar Voucher', row)"
               ></u-button>
            </u-tooltip>

            <u-tooltip text="Hapus">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-trash"
                  @click.stop="store.showDialog('delete-voucher', 'Hapus Voucher', row)"
               ></u-button>
            </u-tooltip>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { getVouchers } from '@/utils/api/masters'

const store = useAppStore()
store.title = 'Voucher'
useHead({ title: store.getTitle })

const data : Ref <Model.Master.Voucher[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchVouchers()
})

const fetchVouchers = async () => {
   loading.value = true
   await getVouchers()
      .then((resp) => {
         let response = resp

         if (search.value && search.value.length > 0) {
            response = response.filter(value => {
               const match =
                  (value.code?.toString().toLowerCase().includes(search.value!.toLowerCase())) ||
                  (value.name?.toLowerCase().includes(search.value!.toLowerCase()))
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

   await fetchVouchers()
}
</script>