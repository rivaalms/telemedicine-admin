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

      <dialog-skeleton-loader v-if="dialogComponent === 'div'"></dialog-skeleton-loader>
   </u-card>
</u-modal>
</template>

<script setup lang="ts">
const store = useAppStore()

const dialogComponent : Ref <any> = ref('div')
const dialogWidth : Ref <string> = ref('sm:max-w-lg')

const dialogComponentMap : { [key: string]: () => Promise <any> } = {
   'details-emergency': () => import('@/components/dialog/emergency/details.vue'),
   'report-emergency': () => import('@/components/dialog/emergency/report.vue'),
   'ban-user': () => import('@/components/dialog/user/ban.vue'),
   'unban-user': () => import('@/components/dialog/user/activate.vue'),
   'activate-user': () => import('@/components/dialog/user/activate.vue'),
   'deactivate-user': () => import('@/components/dialog/user/deactivate.vue'),
   'top-up-user': () => import('@/components/dialog/user/top-up.vue'),
   'add-doctor': () => import('@/components/dialog/doctor/add.vue'),
   'edit-personal-data-doctor': () => import('@/components/dialog/doctor/edit-personal-data.vue'),
   'add-specialist-doctor': () => import('@/components/dialog/doctor/specialist.vue'),
   'edit-specialist-doctor': () => import('@/components/dialog/doctor/specialist.vue'),
   'add-education-doctor': () => import('@/components/dialog/doctor/education.vue'),
   'edit-education-doctor': () => import('@/components/dialog/doctor/education.vue'),
   'add-medical-facility-doctor': () => import('@/components/dialog/doctor/medical-facility.vue'),
   'edit-medical-facility-doctor': () => import('@/components/dialog/doctor/medical-facility.vue'),
   'add-schedule-doctor': () => import('@/components/dialog/doctor/schedules.vue'),
   'edit-schedule-doctor': () => import('@/components/dialog/doctor/schedules.vue'),

   'add-officer': () => import('@/components/dialog/officer/form.vue'),
   'add-admin': () => import('@/components/dialog/admin/form.vue'),
   'add-nurse': () => import('@/components/dialog/nurse/form.vue'),

   'add-ambulance': () => import('@/components/dialog/ambulance-form.vue'),
   'edit-ambulance': () => import('@/components/dialog/ambulance-form.vue'),

   'add-specialist': () => import('@/components/dialog/masters/specialist-form.vue'),
   'edit-specialist': () => import('@/components/dialog/masters/specialist-form.vue'),

   'add-advertisement': () => import('@/components/dialog/masters/advertisement-form.vue'),
   'edit-advertisement': () => import('@/components/dialog/masters/advertisement-form.vue'),

   'add-voucher': () => import('@/components/dialog/masters/voucher-form.vue'),
   'edit-voucher': () => import('@/components/dialog/masters/voucher-form.vue'),

   'edit-image-specialist': () => import('@/components/dialog/masters/update-image.vue'),
   'edit-image-advertisement': () => import('@/components/dialog/masters/update-image.vue'),
   'edit-image-voucher': () => import('@/components/dialog/masters/update-image.vue'),

   'add-template-chat': () => import('@/components/dialog/template-chat-form.vue'),
   'edit-template-chat': () => import('@/components/dialog/template-chat-form.vue'),

   'edit-email-profile': () => import('@/components/dialog/profile/form.vue'),
   'edit-phone-profile': () => import('@/components/dialog/profile/form.vue'),
   'edit-password-profile': () => import('@/components/dialog/profile/change-password.vue'),

   'delete-specialist-doctor': () => import('@/components/dialog/delete.vue'),
   'delete-education-doctor': () => import('@/components/dialog/delete.vue'),
   'delete-medical-facility-doctor': () => import('@/components/dialog/delete.vue'),
   'delete-ambulance': () => import('@/components/dialog/delete.vue'),
   'delete-specialist': () => import('@/components/dialog/delete.vue'),
   'delete-advertisement': () => import('@/components/dialog/delete.vue'),
   'delete-voucher': () => import('@/components/dialog/delete.vue'),

   'logout': () => import('@/components/dialog/logout.vue')
}

const dialogWidthMap : { [key: string]: string } = {
   'details-emergency': 'sm:max-w-5xl',
   'report-emergency': 'sm:max-w-5xl',
   'add-doctor': 'sm:max-w-xl md:max-w-3xl lg:max-w-5xl',
   'edit-personal-data-doctor': 'sm:max-w-xl md:max-w-2xl lg:max-w-4xl',
   'add-officer': 'sm:max-w-2xl',
   'add-admin': 'sm:max-w-2xl',
   'add-voucher': 'sm:max-w-3xl',
   'edit-voucher': 'sm:max-w-3xl',
}

watch(() => store.dialog.show, async() => {
   if (!store.dialog.show) {
      store.clearDialog()
      setTimeout(() => {
         dialogWidth.value = 'sm:max-w-lg'
         dialogComponent.value = 'div'
      }, 600)
   } else {
      const component = dialogComponentMap[store.dialog.type]
      if (component) dialogComponent.value = (await component()).default
      else dialogComponent.value = 'div'

      dialogWidth.value = dialogWidthMap[store.dialog.type] || 'sm:max-w-lg'
   }
})

const dialogUI : ComputedRef <{ [key: string]: string }> = computed(() => {
   return {
      base: 'relative text-left rtl:text-right overflow-visible flex flex-col',
      width: dialogWidth.value
   }
})
</script>