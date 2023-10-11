<template>
<u-card>
   <app-data-table
      :columns="useNurseTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @fetch-data="(search, page, perPage) => emitHandler(search, page, perPage)"
   >
      <template #customActions="{ actionData }">
         <template v-if="actionData.status === 'active'">
            <u-tooltip text="Nonaktifkan">
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-no-symbol"
                  @click.stop="store.showDialog('deactivate-user', `Nonaktifkan ${actionData.full_name}`, actionData)"
               ></u-button>
            </u-tooltip>
         </template>

         <template v-else-if="actionData.status === 'inactive'">
            <u-tooltip text="Aktifkan">
               <u-button
                  variant="ghost"
                  color="emerald"
                  icon="i-heroicons-check"
                  @click.stop="store.showDialog('activate-user', `Aktifkan ${actionData.full_name}`, actionData)"
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

const data : Ref <Model.Nurse[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () => {
   await fetchNurses()
})

const fetchNurses = async () => {
   loading.value = false
   await getNurses()
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

   await fetchNurses()
}
</script>