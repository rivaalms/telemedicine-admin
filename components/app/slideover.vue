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

   <div class="grid gap-1">
      <template v-for="item in routes" :key="item.to">
         <template v-if="includeRoles(item)">
            <template v-if="item.children">
               <u-accordion
                  :items="[item]"
                  :variant="useRoute().path === item.to ? 'soft' : 'ghost'"
                  :color="useRoute().path === item.to ? 'primary' : 'gray'"
                  :icon="item.icon"
                  size="md"
               >
                  <template #item="{ item }">
                     <div class="ms-6 grid gap-1">
                        <u-button
                           v-for="child in item.children"
                           :key="child.to"
                           :variant="useRoute().path === child.to ? 'soft' : 'ghost'"
                           :color="useRoute().path === child.to ? 'primary' : 'gray'"
                           :to="child.to"
                           size="md"
                           @click="store.slideover = !store.slideover"
                        >
                           {{ child.label }}
                        </u-button>
                     </div>
                  </template>
               </u-accordion>
            </template>
      
            <template v-else>
               <u-button
                  :variant="useRoute().path === item.to ? 'soft' : 'ghost'"
                  :color="useRoute().path === item.to ? 'primary' : 'gray'"
                  :to="item.to"
                  :icon="item.icon"
                  size="md"
                  @click="store.slideover = !store.slideover"
               >
                  {{ item.label }}
               </u-button>
            </template>
         </template>
      </template>
   </div>
</u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()

const menu = computed(() => [
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

const routes = computed(() => useRoutes)
const role : ComputedRef <string> = computed(() => authStore.getRole)

const includeRoles = (route: typeof routes.value[0]) : boolean => {
   if (
      route.roles?.includes(role.value)
      || role.value === 'superAdmin'
      || role.value === 'Admin Faskes'
      || route.roles === '*'
   ) return true
   else return false
}
</script>