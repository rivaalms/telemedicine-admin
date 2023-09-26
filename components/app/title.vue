<template>
<div class="py-4">
   <p class="font-semibold">
      {{ store.getTitle }}
   </p>
</div>
</template>

<script setup lang="ts">
const store = useAppStore()
</script>