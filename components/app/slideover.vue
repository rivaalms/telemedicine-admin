<template>
<u-card
   class="flex flex-col flex-1"
   :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
>
   <template #header>
      <div class="flex justify-between items-center">
         <u-button
            variant="ghost"
            color="gray"
            class="block lg:hidden"
            icon="i-heroicons-bars-3"
            @click.stop="store.slideover = !store.slideover"
         ></u-button>

         <u-dropdown
            :items="menu"
         >
            <u-button
               variant="ghost"
               color="gray"
               class="block lg:hidden"
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
   </template>

   <lazy-app-sidebar
      @toggle-slideover="toggleSlideover"
   ></lazy-app-sidebar>
</u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()

const menu : ComputedRef <Utility.HeaderMenu[][]> = computed(() => [
   [
      {
         label: 'Profil saya',
         click: () => {
            navigateTo('/profile')
            if (store.slideover) store.slideover = false
         }
      }
   ],
   [
      {
         label: 'Keluar',
         slot: 'logout',
         click: () => {
            store.showDialog('logout', 'Keluar', null)
            if (store.slideover) store.slideover = false
         }
      }
   ]
])

const toggleSlideover = () => {
   if (store.slideover) store.slideover = false
}
</script>