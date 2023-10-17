<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <u-form-group
      label="Catatan"
      name="note"
      required
   >
      <u-textarea
         v-model="state.note"
         :rows="4"
         :disabled="loading"
         autoresize
      ></u-textarea>
   </u-form-group>

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

      <u-popover>
         <u-button
            color="red"
            icon="i-heroicons-no-symbol"
            :loading="loading"
         >
            Nonaktifkan
         </u-button>

         <template #panel>
            <u-card>
               <p class="text-sm">Anda yakin ingin menonaktifkan akun ini?</p>
               <div class="grid grid-cols-2 gap-2 mt-4">
                  <u-button
                     block
                     variant="ghost"
                     color="gray"
                     icon="i-heroicons-x-mark"
                     :disabled="loading"
                     @click.stop="store.clearDialog()"
                  >
                     Tidak, batalkan
                  </u-button>

                  <u-button
                     block
                     type="submit"
                     color="red"
                     icon="i-heroicons-no-symbol"
                     :loading="loading"
                  >
                     Ya, nonaktifkan user
                  </u-button>
               </div>
            </u-card>
         </template>
      </u-popover>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { deactivateUser } from '@/utils/api/users'
import * as yup from 'yup'

namespace Form {
   export type State = {
      note: string
   }

   export type Schema = yup.ObjectSchema<{
      note: string
   }>
}

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const state : Ref <Form.State> = ref({
   note: ''
})

const validationSchema : Form.Schema = yup.object({
   note: yup.string().required('Catatan harus diisi')
})

const submit = async () : Promise <void> => {
   loading.value = true
   await deactivateUser(store.dialog.data.uuid, state.value.note)
      .then((resp) => {
         store.notify('info', `Pengguna ${store.dialog.data!.full_name} berhasil dinonaktifkan`)
         store.dialog.callback()
         store.clearDialog()
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data?.messages || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>