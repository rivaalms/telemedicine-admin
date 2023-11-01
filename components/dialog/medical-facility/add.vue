<template>
<u-tabs
   v-model="currentTab"
   :items="tabs"
>
   <template #data>
      <lazy-dialog-medical-facility-components-add-data
         :disabled="isFormDisabled"
         @next-tab="onFormSubmitted"
      ></lazy-dialog-medical-facility-components-add-data>
   </template>

   <template #image>
      <lazy-dialog-medical-facility-components-add-image
         @next-tab="currentTab++"
         @prev-tab="currentTab--"
      ></lazy-dialog-medical-facility-components-add-image>
   </template>

   <template #finish>
      <div class="grid gap-2">
         <u-card>
            <div class="flex flex-col justify-center items-center gap-4">
               <u-icon
                  name="i-heroicons-check-circle"
                  class="text-emerald-500 text-5xl"
               ></u-icon>
               <p class="font-semibold text-sm">
                  Data registrasi fasilitas kesehatan berhasil disimpan
               </p>
            </div>
         </u-card>

         <div class="flex items-center justify-between gap-2 mt-6">
            <u-button
               color="gray"
               variant="ghost"
               icon="i-heroicons-arrow-small-left"
               @click="currentTab--"
            >
               Sebelumnya
            </u-button>
            <u-button
               color="emerald"
               trailing-icon="i-heroicons-check"
               @click="closeDialog"
            >
               Selesai
            </u-button>
         </div>
      </div>
   </template>
</u-tabs>
</template>

<script setup lang="ts">
type Tab = {
   slot: string
   label: string
   disabled?: boolean
}

const store = useAppStore()

const isFormDisabled : ComputedRef <boolean> = computed(() => store.dialog.data ? true : false)
const currentTab : Ref <number> = ref(0)
const tabs : Ref <Tab[]> = ref([
   { slot: 'data', label: 'Data Fasilitas Kesehatan' },
   { slot: 'image', label: 'Unggah Foto', disabled: true },
   { slot: 'finish', label: 'Selesai', disabled: true }
])

const onFormSubmitted = async () : Promise <void> => {
   await Promise.all(
      tabs.value.map(async (item: Tab) => {
         if (item.disabled) item.disabled = false
      })
   )
   currentTab.value++
}

const closeDialog = () => {
   store.dialog.callback()
   store.clearDialog()
}
</script>