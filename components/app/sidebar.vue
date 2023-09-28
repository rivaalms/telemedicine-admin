<template>
   <u-vertical-navigation
      :links="routes"
      :ui="ui"
   >
      <template #default="{ link }">
         <div class="relative text-left w-full">
            <div class="mb-2">
               {{ link.label }}
            </div>
            <u-vertical-navigation
               v-if="link.children"
               :links="link.children"
               :ui="ui"
            ></u-vertical-navigation>
         </div>
      </template>
   </u-vertical-navigation>
</template>

<script setup lang="ts">
const routes = computed(() => useRoutes)

const ui = {
   active: 'text-primary-700 dark:text-white before:bg-primary-100 dark:before:bg-primary-500/50',
}
</script>