<template>
<u-card>
   <template #header>
      <div class="flex justify-between">
         <p class="font-semibold">Ketersediaan Dokter</p>
      </div>
   </template>

   <div class="overflow-y-auto h-[400.7px] divide-y">
      <div
         v-for="item in data"
         class="flex justify-between items-center gap-4 p-4"
      >
         <div class="flex-grow flex items-center truncate">
            <u-avatar
               :src="item.profile_picture!"
               size="md"
               class="me-4"
            ></u-avatar>

            <p class="text-sm truncate">{{ item.name }}</p>
         </div>

         <div class="flex flex-nowrap">
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

            <!-- <u-tooltip text="Emergency">
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
            </u-tooltip> -->
         </div>
      </div>
   </div>
</u-card>
</template>

<script setup lang="ts">
import { getDoctorOnlineStatus } from '@/utils/api/dashboard'

type DoctorAvailability = {
   name: string
   profile_picture: string
   consultation: number
   // emergency: number
}

const data : Ref <DoctorAvailability[]> = ref([])

onBeforeMount(async () : Promise <void> => {
   await fetchDoctorOnlineStatus()
})

const fetchDoctorOnlineStatus = async () : Promise <void> => {
   await getDoctorOnlineStatus()
      .then((resp) => {
         resp.forEach((item) => {
            data.value.push({
               name: item.full_name!,
               profile_picture: item.profile_picture!,
               consultation: item.status_available === 'Busy' ? 2
                  : item.status_available === 'Online' ? 1
                  : 0,
               // emergency: item.status_emergency_available === 'Busy' ? 2
               //    : item.status_emergency_available === 'Online' ? 1
               //    : 0
            })
         })

         // data.value.sort((a, b) => (b.consultation + b.emergency) - (a.consultation - a.emergency))
         data.value.sort((a, b) => b.consultation - a.consultation)
      })
}

const onlineIndicatorColor = (status: number) : string => {
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
</script>