<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <u-form-group
      label="Nominal"
      name="nominal"
      required
   >
      <u-input
         v-model="state.nominal"
      ></u-input>
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

      <u-button
         color="sky"
         icon="i-heroicons-wallet"
         type="submit"
         :loading="loading"
      >
         Top Up
      </u-button>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { topUpUser } from '@/utils/api/users'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const state : Ref <any> = ref({
   nominal: 1000
})

const validationSchema = yup.object({
   nominal: yup.number().required('Nominal harus diisi')
})

const submit = async () => {
   loading.value = true
   const payload : API.Payload.TopUpPayload = {
      uuid: store.dialog.data.uuid,
      nominal: state.value.nominal,
      channel: 'manual'
   }

   await topUpUser(payload)
      .then((resp) => {
         store.notify('success', `Saldo pasien ${resp.ReceiverName} berhasil ditambahkan`)
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