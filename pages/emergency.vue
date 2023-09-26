<template>
   <u-card>
      <app-data-table
         :columns="useEmergencyTableHeader"
         :rows="data"
         :filter="filter"
      >
         <template #filters>
            <u-form-group
               label="Status"
            >
               <u-select-menu
                  v-model="filter.status"
                  :options="useFilterStatusOptions"
               ></u-select-menu>
            </u-form-group>
         </template>
      </app-data-table>
   </u-card>
</template>

<script setup lang="ts">
import { get as GetEmergency } from '@/utils/api/emergency'

const store = useAppStore()
store.title = 'Emergency'
useHead({ title: store.getTitle })

const data : Ref<Model.Emergency[] | []> = ref([])
const filter = ref({
   status: 'All'
})

onBeforeMount(async () => {
   await GetEmergency()
      .then((resp) => {
         data.value = resp.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
      })
})
</script>