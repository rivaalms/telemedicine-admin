<template>
<div class="grid gap-1">
   <template v-for="item in routes" :key="item.to">
      <template v-if="includeRoles(item)">
         <template v-if="item.children">
            <u-accordion
               :items="[item]"
               :variant="item.children.find(child => child.to === useRoute().path) ? 'soft' : 'ghost'"
               :color="item.children.find(child => child.to === useRoute().path) ? 'primary' : 'gray'"
               :icon="item.icon"
            >
               <template #item="{ item }">
                  <template v-for="child in item.children">
                     <template v-if="includeRoles(child)">
                        <div class="ms-6 grid gap-1">
                           <u-button
                              :key="child.to"
                              :variant="useRoute().path === child.to ? 'soft' : 'ghost'"
                              :color="useRoute().path === child.to ? 'primary' : 'gray'"
                              :to="child.to"
                              @click="emit('toggle-slideover')"
                           >
                              {{ child.label }}
                           </u-button>
                        </div>
                     </template>
                  </template>
               </template>
            </u-accordion>
         </template>
   
         <template v-else>
            <u-button
               :variant="useRoute().path === item.to ? 'soft' : 'ghost'"
               :color="useRoute().path === item.to ? 'primary' : 'gray'"
               :to="item.to"
               :icon="item.icon"
               @click="emit('toggle-slideover')"
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

const emit = defineEmits(['toggle-slideover'])

const includeRoles = (route: Utility.Router) : boolean => {
   if (route.roles !== 'none'
      && (
         route.roles?.includes(role.value)
         || role.value === 'superAdmin'
         || route.roles === '*'
      )
   ) return true
   else return false
}
</script>