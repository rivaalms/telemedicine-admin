<template>
   <div class="grid grid-cols-12 gap-4 mb-4">
      <div class="col-span-3 flex flex-col justify-end">
         <u-input
            v-model="search"
            placeholder="Cari..."
         ></u-input>
      </div>

      <slot name="filters"/>
   </div>
   
   <u-table
      :columns="prop.columns"
      :rows="data"
   >
      <template #created_at-data="{ row }">
         {{ formatDate(row.created_at) }}
      </template>
   </u-table>

   <div class="flex justify-between mt-4">
      <div class="flex items-center gap-4 text-sm">
         <p>Tampilkan</p>
         <u-select-menu
            v-model="perPage"
            :options="perPageOptions"
            value-attribute="value"
            option-attribute="label"
         >
            <template #label>
               {{ perPage.toString() }}
            </template>
         </u-select-menu>
         <p>entri</p>
      </div>
      
      <u-pagination
         v-model="page"
         :page-count="perPage"
         :total="dataLength"
      ></u-pagination>
   </div>
</template>

<script setup lang="ts">
import moment from 'moment'

const prop = defineProps([
   'columns',
   'rows',
   'filter'
])

const page = ref(1)
const perPageOptions : ComputedRef<any> = computed(() => [
   { label: '10', value: 10 },
   { label: '25', value: 25 },
   { label: '50', value: 50 },
   { label: '100', value: 100 },
])
const perPage = ref(perPageOptions.value[0].value)
const search : Ref <string | undefined> = ref('')

const data = computed(() => {
   let rows = prop.rows
   if (prop.filter.status !== 'All') rows = rows.filter((value: any) => value.status === prop.filter.status)
   if (search.value!.length > 0) {
      rows = rows.filter((value: any) => {
         const match =
            (value.request_by && value.request_by.full_name?.toLowerCase().includes(search.value?.toLowerCase())) ||
            (value.request_by && value.request_by.phone_number?.toLowerCase().includes(search.value?.toLowerCase())) ||
            (value.patient && value.patient.patient_name?.toLowerCase().includes(search.value?.toLowerCase())) ||
            (value.patient && value.patient.patient_nik?.toLowerCase().includes(search.value?.toLowerCase()))
         return match
      })
   }
   dataLength.value = rows.length
   return rows.slice((page.value - 1) * perPage.value, (page.value) * perPage.value)
})

const dataLength = ref(prop.rows.length)

const formatDate = (date: string) => moment(date).format('DD/MM/YYYY HH:mm')
</script>