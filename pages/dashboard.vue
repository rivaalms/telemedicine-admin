<template>
<u-card class="overflow-visible bg-transparent dark:bg-transparent ring-0 shadow-none">
   <div class="grid grid-cols-2 gap-2">
      <lazy-dashboard-transaction-income class="col-span-2 mb-4"></lazy-dashboard-transaction-income>

      <lazy-dashboard-emergency class="col-span-2 mb-4"></lazy-dashboard-emergency>

      <lazy-dashboard-doctor-online-status class="mb-4"></lazy-dashboard-doctor-online-status>

      <div class="grid grid-rows-2 gap-2">
         <lazy-dashboard-ambulances class="mb-4"></lazy-dashboard-ambulances>
         
         <lazy-dashboard-patients class="mb-4"></lazy-dashboard-patients>
      </div>
      <lazy-dashboard-consultations class="col-span-2"></lazy-dashboard-consultations>
   </div>
</u-card>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

const store = useAppStore()
store.title = 'Dashboard'
useHead({ title: store.getTitle })
</script>