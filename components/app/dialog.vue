<template>
<u-modal
   v-model="store.dialog.show"
   :ui="{ width: 'sm:max-w-7xl sm:min-w-lg' }"
>
   <u-card>
      <template #header>
         <div class="flex justify-between">
            <p class="text-semibold">{{ store.dialog.title }}</p>
            <u-button
               variant="ghost"
               color="gray"
               icon="i-heroicons-x-mark"
               @click.stop="store.dialog.show = false"
            ></u-button>
         </div>
      </template>

      <component :is="dialogComponent"></component>
   </u-card>
</u-modal>
</template>

<script setup lang="ts">
import { DialogEmergency } from '#components'

const store = useAppStore()

const dialogComponent = computed(() => {
   switch (store.dialog.type) {
      case 'emergency':
         return DialogEmergency
      default:
         return 'div'
   }
})

watch(() => store.dialog.show, () => {
   if (!store.dialog.show) store.clearDialog()
})
</script>