<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid gap-4">
      <u-form-group
         label="Teks"
         name="text"
         required
      >
         <u-textarea
            v-model="(state.text as string)"
            :rows="4"
            autoresize
            :disabled="loading"
         ></u-textarea>

         <template #help>
            <p class="text-sm text-gray-400">
               Gunakan "[]" untuk mendeklarasikan teks variabel
            </p>
         </template>
      </u-form-group>
   </div>

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
         color="emerald"
         icon="i-heroicons-check"
         :loading="loading"
         type="submit"
      >
         Simpan
      </u-button>
   </div>f
</u-form>
</template>

<script setup lang="ts">
import { createTemplateChat, updateTemplateChat } from '@/utils/api/template-chats'
import * as yup from 'yup'

const store = useAppStore()
const loading : Ref <boolean> = ref(false)
const isEdit : ComputedRef <boolean> = computed(() => store.dialog.type.includes('edit'))

const state : Ref <Model.TemplateChat> = ref({
   text: isEdit.value ? store.dialog.data.text : null,
})

const validationSchema = yup.object({
   text: yup.string().required('Teks harus diisi')
})

const submit = async () => {
   loading.value = true

   try {
      if (isEdit.value) await updateTemplateChat(store.dialog.data.id!, state.value)
      else await createTemplateChat(state.value)

      store.clearDialog()
   } catch (error) {

   } finally {
      loading.value = false
   }
}
</script>