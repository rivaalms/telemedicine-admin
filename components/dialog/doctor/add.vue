<template>
<u-tabs
   v-model="currentTab"
   :items="tabs"
>
   <template #data>
      <dialog-doctor-components-add-data
         :disabled="isFormDisabled"
         @next-tab="onFormSubmitted"
      ></dialog-doctor-components-add-data>
   </template>

   <template #details>
      <dialog-doctor-components-add-details
         @next-tab="currentTab++"
         @prev-tab="currentTab--"
      ></dialog-doctor-components-add-details>
   </template>

   <template #image>
      <dialog-doctor-components-add-image
         @next-tab="currentTab++"
         @prev-tab="currentTab--"
      ></dialog-doctor-components-add-image>
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
                  Data registrasi dokter berhasil disimpan
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
               @click="store.clearDialog()"
            >
               Selesai
            </u-button>
         </div>
      </div>
   </template>
</u-tabs>
</template>

<script setup lang="ts">
const store = useAppStore()

const isFormDisabled : ComputedRef <boolean> = computed(() => store.dialog.data ? true : false)
const currentTab : Ref <number> = ref(0)
const tabs : Ref <any> = ref([
   { slot: 'data', label: 'Data Dokter' },
   { slot: 'details', label: 'Detail', disabled: true },
   { slot: 'image', label: 'Unggah Foto', disabled: true },
   { slot: 'finish', label: 'Selesai', disabled: true }
])

const onFormSubmitted = async () => {
   await Promise.all(
      tabs.value.map(async (item: any) => {
         if (item.disabled) item.disabled = false
      })
   )

   currentTab.value++
}
</script>