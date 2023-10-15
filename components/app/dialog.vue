<template>
<u-modal
   v-model="store.dialog.show"
   :ui="dialogUI"
>
   <u-card class="overflow-visible">
      <template #header>
         <div class="flex justify-between items-center">
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
import {
   LazyDialogEmergencyDetails,
   LazyDialogEmergencyReport,
   LazyDialogUserBan,
   LazyDialogUserActivate,
   LazyDialogUserDeactivate,
   LazyDialogUserTopUp,
   LazyDialogDoctorEditPersonalData,
   LazyDialogDoctorSpecialist,
   LazyDialogDoctorEducation,
   LazyDialogDoctorMedicalFacility,
   LazyDialogDoctorSchedules,
   LazyDialogDoctorAdd,
   LazyDialogOfficerForm,
   LazyDialogAdminForm,
   LazyDialogNurseForm,
   LazyDialogAmbulanceForm,
   LazyDialogMastersSpecialistForm,
   LazyDialogMastersUpdateImage,
   LazyDialogMastersAdvertisementForm,
   LazyDialogMastersVoucherForm,
   LazyDialogTemplateChatForm,
   LazyDialogDelete,
   LazyDialogProfileForm,
   LazyDialogProfileChangePassword,
   LazyDialogLogout
} from '#components'

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
         case 'details-emergency':
            dialogComponent.value = LazyDialogEmergencyDetails
            dialogWidth.value = 'sm:max-w-5xl'
            break

         case 'report-emergency':
            dialogComponent.value = LazyDialogEmergencyReport
            dialogWidth.value = 'sm:max-w-5xl'
            break

         case 'ban-user':
            dialogComponent.value = LazyDialogUserBan
            break

         case 'activate-user':
         case 'unban-user':
            dialogComponent.value = LazyDialogUserActivate
            break

         case 'deactivate-user':
            dialogComponent.value = LazyDialogUserDeactivate
            break

         case 'top-up-user':
            dialogComponent.value = LazyDialogUserTopUp
            break

         case 'add-doctor':
            dialogComponent.value = LazyDialogDoctorAdd
            dialogWidth.value = 'sm:max-w-5xl'
            break

         case 'edit-personal-data-doctor':
            dialogComponent.value = LazyDialogDoctorEditPersonalData
            dialogWidth.value = 'sm:max-w-5xl'
            break

         case 'add-specialist-doctor':
         case 'edit-specialist-doctor':
            dialogComponent.value = LazyDialogDoctorSpecialist
            break

         case 'add-education-doctor':
         case 'edit-education-doctor':
            dialogComponent.value = LazyDialogDoctorEducation
            break

         case 'add-medical-facility-doctor':
         case 'edit-medical-facility-doctor':
            dialogComponent.value = LazyDialogDoctorMedicalFacility
            break

         case 'add-schedule-doctor':
         case 'edit-schedule-doctor':
            dialogComponent.value = LazyDialogDoctorSchedules
            break

         case 'add-officer':
            dialogComponent.value = LazyDialogOfficerForm
            dialogWidth.value = 'sm:max-w-2xl'
            break

         case 'add-admin':
            dialogComponent.value = LazyDialogAdminForm
            dialogWidth.value = 'sm:max-w-2xl'
            break

         case 'add-nurse':
            dialogComponent.value = LazyDialogNurseForm
            break

         case 'add-ambulance':
         case 'edit-ambulance':
            dialogComponent.value = LazyDialogAmbulanceForm
            break

         case 'add-specialist':
         case 'edit-specialist':
            dialogComponent.value = LazyDialogMastersSpecialistForm
            break

         case 'add-advertisement':
         case 'edit-advertisement':
            dialogComponent.value = LazyDialogMastersAdvertisementForm
            break

         case 'add-voucher':
         case 'edit-voucher':
            dialogComponent.value = LazyDialogMastersVoucherForm
            dialogWidth.value = 'sm:max-w-3xl'
            break

         case 'edit-image-specialist':
         case 'edit-image-advertisement':
         case 'edit-image-voucher':
            dialogComponent.value = LazyDialogMastersUpdateImage
            break

         case 'add-template-chat':
         case 'edit-template-chat':
            dialogComponent.value = LazyDialogTemplateChatForm
            break

         case 'edit-email-profile':
         case 'edit-phone-profile':
            dialogComponent.value = LazyDialogProfileForm
            break

         case 'edit-password-profile':
            dialogComponent.value = LazyDialogProfileChangePassword
            break

         case 'delete-specialist-doctor':
         case 'delete-education-doctor':
         case 'delete-medical-facility-doctor':
         case 'delete-ambulance':
         case 'delete-specialist':
         case 'delete-advertisement':
         case 'delete-voucher':
            dialogComponent.value = LazyDialogDelete
            break

         case 'logout':
            dialogComponent.value = LazyDialogLogout
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