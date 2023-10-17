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

const activate = async () : Promise <void> => {
   loading.value = true

   try {
      if (isBanned.value) {
         await unbanUser(uuid.value)
         store.notify('info', `Pengguna ${store.dialog.data!.full_name} berhasil di-unban`)
      }
      else {
         await activateUser(uuid.value)
         store.notify('info', `Pengguna ${store.dialog.data!.full_name} berhasil diaktifkan`)
      }

      store.dialog.callback()
      store.clearDialog()
   } catch (error: any) {
      store.notify('error', error.response?._data?.messages || error)
   } finally {
      loading.value = false
   }
}
</script>