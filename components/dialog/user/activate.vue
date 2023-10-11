<template>
<p>Anda yakin ingin mengaktifkan akun ini?</p>
<div class="flex justify-end gap-2 mt-4">
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
      color="emerald"
      icon="i-heroicons-check"
      :loading="loading"
      @click.stop="activate"
   >
      Aktifkan
   </u-button>
</div>
</template>

<script setup lang="ts">
import { unbanUser, activateUser } from '@/utils/api/users'

const store = useAppStore()
const uuid : ComputedRef <string> = computed(() => store.dialog.data!.uuid)
const loading : Ref <boolean> = ref(false)
const isBanned : ComputedRef <boolean> = computed(() => store.dialog.type === 'unban-user')

const activate = async () => {
   loading.value = true

   try {
      if (isBanned.value) await unbanUser(uuid.value)
      else await activateUser(uuid.value)

      store.clearDialog()
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}
</script>