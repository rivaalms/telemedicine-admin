<template>
<u-card class="overflow-visible bg-transparent dark:bg-transparent ring-0 shadow-none">
   <div class="grid grid-cols-2 gap-2">
      <lazy-dashboard-transaction-income class="col-span-2 mb-4"></lazy-dashboard-transaction-income>

      <lazy-dashboard-emergency class="col-span-2 mb-4"></lazy-dashboard-emergency>

      <lazy-dashboard-patients class="mb-4"></lazy-dashboard-patients>
   </div>
</u-card>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

const store = useAppStore()
store.title = 'Dashboard'
useHead({ title: store.getTitle })
</script>