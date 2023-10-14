<template>
<p>Anda yakin ingin keluar?</p>

<div class="flex justify-end gap-2 mt-6">
   <u-button
      variant="ghost"
      color="gray"
      icon="i-heroicons-arrow-uturn-left"
      :disabled="loading"
      @click.stop="store.clearDialog()"
   >
      Kembali
   </u-button>

   <u-button
      color="red"
      icon="i-heroicons-arrow-left-on-rectangle"
      :loading="loading"
      @click.stop="logout"
   >
      Keluar
   </u-button>
</div>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()

const loading : Ref <boolean> = ref(false)

const logout = async () => {
   await authStore.logout()
      .then(() => { navigateTo('/login') })
}
</script>