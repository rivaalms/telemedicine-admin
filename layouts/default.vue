<template>
<div class="relative h-[100dvh] overflow-y-hidden">
   <app-header
      class=" left-0 top-0"
      :slideover="slideover"
      @slideover-change="(val: boolean) => slideover = val"
   />

   <div class="flex h-[calc(100dvh-56px)] overflow-hidden">
      <aside class="absolute left-0 top-0 z-50 h-[calc(100dvh-56px)] hidden lg:block lg:static lg:translate-x-0 w-60 px-2 py-2 border-r-[1px] overflow-y-auto">
         <app-sidebar/>
      </aside>

      <div ref="main" class="relative flex-1 overflow-y-auto bg-gray-100 flex flex-col">
         <main class="flex-grow p-2">
            <app-title/>
            <slot/>
         </main>
         <app-footer />
      </div>
   </div>
</div>

<lazy-u-slideover
   v-model="slideover"
>
   <lazy-app-slideover
      :slideover="slideover"
      @slideover-change="(val: boolean) => slideover = val"
      class="overflow-y-auto"
   ></lazy-app-slideover>
</lazy-u-slideover>

<lazy-app-dialog></lazy-app-dialog>

<lazy-u-notifications>
   <template #title="{ title }">
      <p class="font-semibold">{{ title }}</p>
   </template>
</lazy-u-notifications>
</template>

<script setup lang="ts">
const main : Ref <HTMLElement | null> = ref(null)
const slideover : Ref <boolean> = ref(false)
const { x, y } = useScroll(main)
provide('scroll', { scrollX: x, scrollY: y })
</script>