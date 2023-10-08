<template>
<div class="grid grid-cols-2 gap-5">
   <GoogleMap
      :api-key="gmapKey"
      :center="center"
      :zoom="15"
      disable-default-ui
      zoom-control
      class="h-[500px]"
   >
      <Marker
         :options="{ position: center }"
      ></Marker>
   </GoogleMap>

   <div class="grid content-start gap-6">
      <div class="grid grid-cols-2 gap-4 place-content-start">
         <p class="col-span-2 font-semibold">Informasi Pelapor & Pasien</p>
         <div class="">
            <p class="text-semibold text-sm text-gray-500">Nama Pelapor</p>
            <p class="text-sm">{{ data.request_by?.full_name! || '-' }}</p>
         </div>
         <div class="">
            <p class="text-semibold text-sm text-gray-500">No. Telepon Pelapor</p>
            <p class="text-sm">{{ data.request_by?.phone_number! || '-' }}</p>
         </div>
         <div class="">
            <p class="text-semibold text-sm text-gray-500">NIK Pelapor</p>
            <p class="text-sm">{{ data.request_by?.nik! || '-' }}</p>
         </div>
         <div class="">
            <p class="text-semibold text-sm text-gray-500">Nama Pasien</p>
            <p class="text-sm">{{ data.patient?.patient_name! || '-' }}</p>
         </div>
         <div class="">
            <p class="text-semibold text-sm text-gray-500">Tanggal</p>
            <p class="text-sm">{{ moment(data.created_at!).format('DD/MM/YYYY HH:mm:ss') || '-' }}</p>
         </div>
         <div class="">
            <p class="text-semibold text-sm text-gray-500">Status</p>
            <p class="text-sm">{{ data.status! || '-' }}</p>
         </div>
      </div>

      <div class="grid grid-cols-2 gap-4 place-content-start">
         <p class="col-span-2 font-semibold">Informasi Ambulance & Dokter</p>
         <div>
            <p class="text-semibold text-sm text-gray-500">Driver</p>
            <p class="text-sm">{{ data.ambulance?.officer?.full_name! || '-' }}</p>
         </div>
         <div>
            <p class="text-semibold text-sm text-gray-500">Tipe</p>
            <p class="text-sm">{{ data.ambulance?.ambulance_type! || '-' }}</p>
         </div>
         <div>
            <p class="text-semibold text-sm text-gray-500">Plat Nomor</p>
            <p class="text-sm">{{ data.ambulance?.plate_number! || '-' }}</p>
         </div>
         <div>
            <p class="text-semibold text-sm text-gray-500">Dokter</p>
            <p class="text-sm">{{ data.doctor?.full_name! || '-' }}</p>
         </div>
      </div>
   </div>
</div>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import moment from 'moment'

const store = useAppStore()
const data : Model.Emergency = store.dialog.data
const gmapKey = computed(() => useRuntimeConfig().public.gmapKey)
const center = computed(() => {
   return { lat: parseFloat(data.map_lat!), lng: parseFloat(data.map_lng!) }
})
</script>