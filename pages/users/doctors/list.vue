<template>
<u-card>
   <app-data-table
      :columns="useDoctorsTableHeader"
      :rows="data"
      @fetch-data="(item) => doctorDetails(item)"
   ></app-data-table>
</u-card>
</template>

<script setup lang="ts">
import { get as GetDoctorList } from '@/utils/api/doctors'
const store = useAppStore()

store.title = "List Dokter"
useHead({ title: store.getTitle })

const data : Ref<any> = ref([])

onBeforeMount(async () => {
   await GetDoctorList()
      .then((resp) => {
         data.value = resp
      })
})

const doctorDetails = (item: any) => {
   return useRouter().push(`/users/doctors/${item.no_str}`)
}
</script>