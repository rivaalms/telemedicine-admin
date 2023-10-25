<template>
<main class="h-screen">
   <div class="h-full grid grid-cols-1 gap-12 place-content-center place-items-center">
      <nuxt-img 
         :src="imgSrc"
         quality="60"
         class="object-contain h-96 w-auto"
      />
      <div>
         <u-button
            size="lg"
            icon="i-heroicons-arrow-uturn-left"
            @click.stop="navigateTo('/')"
         >
            Kembali ke Halaman Utama
         </u-button>
      </div>
   </div>
</main>
</template>

<script setup lang="ts">
definePageMeta({
   middleware: undefined,
   layout: false
})
const store = useAppStore()
const imgSrc : ComputedRef <string> = computed(() => {
   const code = useRoute().params.code!.toString()
   store.title = code

   switch (code) {
      case '403':
         return '/img/403.svg'
      case '404':
         return '/img/404.svg'
      default:
         return ''
   }
})

useHead({ title: store.getTitle })
</script>