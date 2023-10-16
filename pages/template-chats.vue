<template>
<u-card>
   <app-data-table
      :columns="useTemplateChatsTableHeader"
      :rows="data"
      :data-length="dataLength"
      :loading="loading"
      @data-emit="(search: string, page: number, perPage: number) => emitHandler(search, page, perPage)"
   >
      <template #filters>
         <div class="col-start-12 flex justify-end items-center">
            <u-button
               icon="i-heroicons-plus"
               @click.stop="store.showDialog('add-template-chat', 'Tambah Template Chat', null, async () => await fetchTemplateChats())"
            >
               Tambah Template Chat
            </u-button>
         </div>
      </template>

      <template #actions="{ row }">
         <div class="flex justify-end items-center gap-2">
            <u-tooltip text="Sunting">
               <u-button
                  variant="ghost"
                  color="amber"
                  icon="i-heroicons-pencil"
                  @click.stop="store.showDialog('edit-template-chat', 'Sunting Template Chat', row, async () => await fetchTemplateChats())"
               ></u-button>
            </u-tooltip>
         </div>
      </template>
   </app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetTemplateChats } from '@/utils/api/template-chats'

const store = useAppStore()
store.title = 'Voucher'
useHead({ title: store.getTitle })

const raw : Ref <Model.TemplateChat[]> = ref([])
const data : Ref <Model.TemplateChat[]> = ref([])
const dataLength : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const search : Ref <string | null> = ref(null)
const page : Ref <number> = ref(1)
const perPage : Ref <number> = ref(10)

onBeforeMount(async () : Promise <void> => {
   await fetchTemplateChats()
})

const fetchTemplateChats = async () : Promise <void> => {
   loading.value = true
   await GetTemplateChats()
      .then((resp) => {
         raw.value = resp
         responseHandler()
      })
      .finally(() => {
         loading.value = false
      })
}

const responseHandler = () : void => {
   let response = raw.value

   if (search.value && search.value.length > 0) {
      response = response.filter(value => (value.text?.toString().toLowerCase().includes(search.value!.toLowerCase())))
   }
   dataLength.value = response.length
   data.value = response.slice((page.value - 1) * perPage.value, (page.value) * perPage.value)
}

const emitHandler = (emitSearch: string, emitPage: number, emitPerPage: number) : void => {
   search.value = emitSearch
   page.value = emitPage
   perPage.value = emitPerPage

   responseHandler()
}
</script>