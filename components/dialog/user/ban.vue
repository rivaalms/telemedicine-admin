<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <u-form-group
      label="Alasan"
      name="reason"
   >
      <u-textarea
         v-model="state.reason"
         :rows="4"
         :disabled="loading"
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
            Ban User
         </u-button>

         <template #panel>
            <u-card>
               <p class="text-sm">Anda yakin ingin melakukan ban kepada akun ini?</p>
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
                     Ya, ban akun
                  </u-button>
               </div>
            </u-card>
         </template>
      </u-popover>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { banUser } from '@/utils/api/users'
import * as yup from 'yup'

namespace Form {
   export type State = {
      reason: string
   }

   export type Schema = yup.ObjectSchema<{
      reason?: string | null
   }>
}

const store = useAppStore()

const state : Ref <Form.State> = ref({
   reason: ''
})
const uuid : ComputedRef <string> = computed(() => store.dialog.data!.uuid)
const validationSchema : Form.Schema = yup.object({
   reason: yup.string().nullable()
})
const loading : Ref <boolean> = ref(false)

const submit = async () : Promise <void> => {
   loading.value = true
   await banUser(state.value.reason, uuid.value)
      .then((resp) => {
         store.notify('info', `Pengguna ${resp.full_name} berhasil di-ban`)
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