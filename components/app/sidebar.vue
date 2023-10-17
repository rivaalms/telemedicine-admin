<template>
<div class="grid gap-1">
   <template v-for="item in routes" :key="item.to">
      <template v-if="includeRoles(item)">
         <template v-if="item.children">
            <u-accordion
               :items="[item]"
               :variant="useRoute().path === item.to ? 'soft' : 'ghost'"
               :color="useRoute().path === item.to ? 'primary' : 'gray'"
               :icon="item.icon"
            >
               <template #item="{ item }">
                  <div class="ms-6 grid gap-1">
                     <u-button
                        v-for="child in item.children"
                        :key="child.to"
                        :variant="useRoute().path === child.to ? 'soft' : 'ghost'"
                        :color="useRoute().path === child.to ? 'primary' : 'gray'"
                        :to="child.to"
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
            >
               {{ item.label }}
            </u-button>
         </template>
      </template>
   </template>
</div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const routes : ComputedRef <Utility.Router[]> = computed(() => useRoutes)
const role : ComputedRef <string> = computed(() => authStore.getRole)

const includeRoles = (route: Utility.Router) : boolean => {
   if (
      route.roles?.includes(role.value)
      || role.value === 'superAdmin'
      || role.value === 'Admin Faskes'
      || route.roles === '*'
   ) return true
   else return false
}
</script>