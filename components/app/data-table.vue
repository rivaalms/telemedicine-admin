<template>
   <div class="grid grid-cols-12 gap-4 mb-4">
      <div
         v-if="!prop.hideSearchInput"
         class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 order-last md:order-first flex flex-col justify-end"
      >
         <u-input
            v-model="search"
            placeholder="Cari..."
            icon="i-heroicons-magnifying-glass"
            @keyup.enter="emitData"
         ></u-input>
      </div>

      <slot name="filters"/>
   </div>
   
   <u-table
      :columns="prop.columns"
      :rows="data"
      :loading="prop.loading"
   >
      <template #created_at-data="{ row }">
         {{ formatDate(row.created_at) }}
      </template>

      <template #actions-data="{ row }">
         <slot name="actions" :row="row">
            {{ '' }}
         </slot>
      </template>
   </u-table>

   <div class="flex flex-col-reverse sm:flex-row justify-center sm:justify-between gap-8 sm:gap-4 mt-4">
      <div class="flex items-center justify-center lg:justify-start gap-4 text-sm">
         <p>Tampilkan</p>
         <u-select-menu
            v-model="perPage"
            :options="perPageOptions"
            value-attribute="value"
            option-attribute="label"
            @update:model-value="emitData"
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
         :total="prop.dataLength"
         class="justify-center"
         @update:model-value="emitData"
      ></u-pagination>
   </div>
</template>

<script setup lang="ts">
import moment from 'moment'

const prop = defineProps<{
   columns: any
   rows: any
   filter?: any
   dataLength: number
   loading: boolean
   hideSearchInput?: boolean
}>()

const emit = defineEmits(['data-emit'])

const page : Ref <number> = ref(1)
const perPageOptions : ComputedRef<PerPageOption[]> = computed(() => [
   { label: '10', value: 10 },
   { label: '25', value: 25 },
   { label: '50', value: 50 },
   { label: '100', value: 100 },
])
const perPage = ref(perPageOptions.value[0].value)
const search : Ref <string | undefined> = ref('')

const data = computed(() => prop.rows)

const formatDate = (date: string) => moment(date).format('DD/MM/YYYY HH:mm')

const emitData = () => emit('data-emit', search.value, page.value, perPage.value)

type PerPageOption = {
   label: string
   value: number
}
</script>