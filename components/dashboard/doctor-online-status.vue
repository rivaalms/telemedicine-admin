<template>
<div class="grid gap-2">
   <div class="flex justify-between">
      <p class="font-semibold text-lg">Ketersediaan Dokter</p>
   </div>

   <u-card class="overflow-auto h-[476px]">
      <div class="grid gap-2">
         <div
            v-for="item in data"
            class="flex justify-between items-center border-[1px] rounded-lg p-2"
         >
            <div class="flex-grow flex items-center">
               <u-avatar
                  :src="item.profile_picture!"
                  size="lg"
                  class="me-4"
               ></u-avatar>

               <p class="text-sm">{{ item.name }}</p>
            </div>

            <div>
               <u-tooltip text="Konsultasi">
                  <svg
                     class="me-2"
                     :class="onlineIndicatorColor(item.consultation)"
                     width="16"
                     height="16"
                     fill="currentColor" 
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
                  </svg>
               </u-tooltip>

               <u-tooltip text="Emergency">
                  <svg
                     :class="onlineIndicatorColor(item.emergency)"
                     width="16"
                     height="16"
                     fill="currentColor" 
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
                  </svg>
               </u-tooltip>
            </div>
         </div>
      </div>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getDoctorOnlineStatus } from '@/utils/api/dashboard'

const data : Ref <DoctorAvailability[]> = ref([])

onBeforeMount(async () => {
   await fetchDoctorOnlineStatus()
})

const fetchDoctorOnlineStatus = async () => {
   await getDoctorOnlineStatus()
      .then((resp) => {
         resp.forEach((item) => {
            if (item.status_available && item.status_emergency_available) {
               data.value.push({
                  name: item.full_name!,
                  profile_picture: item.profile_picture!,
                  consultation: item.status_available === 'Offline' ? 0
                     : item.status_available === 'Online' ? 1
                     : 2,
                  emergency: item.status_emergency_available === 'Offline' ? 0
                     : item.status_emergency_available === 'Online' ? 1
                     : 2
               })
            }
         })

         data.value.sort((a, b) => (b.consultation + b.emergency) - (a.consultation - a.emergency))
      })
}

const onlineIndicatorColor = (status: number) => {
   switch (status) {
      case 0:
         return 'text-red-500'
      case 1:
         return 'text-green-500'
      case 2:
         return 'text-amber-500'
      default:
         return ''
   }
}

type DoctorAvailability = {
   name: string
   profile_picture: string
   consultation: number
   emergency: number
}
</script>