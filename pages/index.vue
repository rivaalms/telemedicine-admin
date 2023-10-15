<template>
   <u-card>
      <p class="text-lg font-semibold">
         Selamat datang, {{ user?.name || '' }}!
      </p>
   </u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()
const user = computed(() => authStore.getUser)

store.title = 'Beranda'
useHead({ title: store.getTitle })
</script>