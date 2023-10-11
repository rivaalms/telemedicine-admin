<template>
<u-modal
   v-model="store.dialog.show"
   :ui="dialogUI"
>
   <u-card class="overflow-visible">
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
import { DialogEmergency, DialogDoctorBan, DialogDoctorActivate, DialogDoctorEditPersonalData, DialogDoctorSpecialist, DialogDoctorEducation, DialogDoctorMedicalFacility, DialogDoctorSchedules, DialogDelete } from '#components'

const store = useAppStore()

const dialogComponent : Ref <any> = ref('div')
const dialogWidth : Ref <string> = ref('sm:max-w-lg')

watch(() => store.dialog.show, () => {
   if (!store.dialog.show) {
      store.clearDialog()
      setTimeout(() => {
         dialogWidth.value = 'sm:max-w-lg'
         dialogComponent.value = 'div'
      }, 600)
   }
   else {
      switch (store.dialog.type) {
         case 'emergency':
            dialogComponent.value = DialogEmergency
            dialogWidth.value = 'sm:max-w-5xl'
            break

         case 'ban-doctor':
            dialogComponent.value = DialogDoctorBan
            break

         case 'activate-doctor':
            dialogComponent.value = DialogDoctorActivate
            break

         case 'edit-personal-data-doctor':
            dialogComponent.value = DialogDoctorEditPersonalData
            dialogWidth.value = 'sm:max-w-5xl'
            break

         case 'add-specialist-doctor':
         case 'edit-specialist-doctor':
            dialogComponent.value = DialogDoctorSpecialist
            break

         case 'add-education-doctor':
         case 'edit-education-doctor':
            dialogComponent.value = DialogDoctorEducation
            break

         case 'add-medical-facility-doctor':
         case 'edit-medical-facility-doctor':
            dialogComponent.value = DialogDoctorMedicalFacility
            break

         case 'add-schedule-doctor':
         case 'edit-schedule-doctor':
            dialogComponent.value = DialogDoctorSchedules
            break

         case 'delete-specialist-doctor':
         case 'delete-education-doctor':
         case 'delete-medical-facility-doctor':
            dialogComponent.value = DialogDelete
            break

         default:
            dialogComponent.value = 'div'
            dialogWidth.value = 'sm:max-w-lg'
            break
      }
   }
})

const dialogUI : ComputedRef <any> = computed(() => {
   return {
      base: "relative text-left rtl:text-right overflow-visible flex flex-col",
      width: dialogWidth.value
   }
})
</script>