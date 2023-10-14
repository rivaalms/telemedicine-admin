<template>
   <header class="border-b-[1px]">
      <div class="mx-4 py-2 flex justify-between items-center">
         <nuxt-link to="/" class="py-2">
            {{ store.getAppName }}
         </nuxt-link>

         <u-dropdown
            :items="menu"
         >
            <u-button
               variant="ghost"
               color="gray"
            >
               <template #leading>
                  <u-avatar
                     :alt="authStore.getUser?.name"
                     size="xs"
                  />
               </template>
               
               {{ authStore.getUser?.name }}

               <template #trailing>
                  <u-icon name="i-heroicons-chevron-down"/>
               </template>
            </u-button>

            <template #logout="{ item }">
               <span class="text-red-500">
                  {{ item.label }}
               </span>
            </template>
         </u-dropdown>
      </div>
   </header>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()

const menu = computed(() => {
   return [
      [
         {
            label: 'Profil saya',
            click: () => { navigateTo('/profile') }
         }
      ],
      [
         {
            label: 'Keluar',
            slot: 'logout',
            click: async () => {
               await authStore.logout()
                  .then(() => { navigateTo('/login') })
            }
         }
      ]
   ]
})
</script>