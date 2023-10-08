<template>
<u-modal
   v-model="store.dialog.show"
   :ui="{ width: dialogWidth }"
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

const dialogComponent : Ref <any> = ref('div')
const dialogWidth : Ref <string> = ref('sm:max-w-lg')

watch(() => store.dialog.show, () => {
   if (!store.dialog.show) store.clearDialog()
   else {
      switch (store.dialog.type) {
         case 'emergency':
            dialogComponent.value = DialogEmergency
            dialogWidth.value = 'sm:max-w-5xl'
            break
         default:
            dialogComponent.value = 'div'
            dialogWidth.value = 'sm:max-w-lg'
            break
      }
   }
})
</script>