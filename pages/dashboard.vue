<template>
<u-card class="overflow-visible bg-transparent dark:bg-transparent ring-0 shadow-none">
   <div class="grid grid-cols-1 gap-2">
      <lazy-dashboard-transaction-income class="mb-4"></lazy-dashboard-transaction-income>

      <lazy-dashboard-emergency></lazy-dashboard-emergency>
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