<template>
   <header class="border-b-[1px]">
      <div class="mx-4 py-2 flex justify-between items-center">
         <nuxt-link to="/" class="py-2">
            {{ store.getAppName }}
         </nuxt-link>

         <div class="flex items-center gap-4">
            <u-dropdown
               :items="menu"
            >
               <u-button
                  variant="ghost"
                  color="gray"
                  class="hidden lg:block"
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

            <u-button
               variant="ghost"
               color="gray"
               class="block lg:hidden"
               icon="i-heroicons-bars-3"
               @click.stop="store.slideover = !store.slideover"
            ></u-button>
         </div>
      </div>
   </header>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()

const menu : ComputedRef <Utility.HeaderMenu[][]> = computed(() => [
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
         click: () => { store.showDialog('logout', 'Keluar', null) }
      }
   ]
])
</script>