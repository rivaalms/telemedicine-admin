<template>
<div class="grid lg:grid-cols-2 gap-5">
   <g-map-map
      :center="center"
      :zoom="15"
      :options="mapOptions"
      class="h-[500px]"
   >
      <g-map-marker
         :position="center"
      ></g-map-marker>
   </g-map-map>

   <div class="grid content-start gap-6">
      <div class="grid lg:grid-cols-2 gap-4 place-content-start">
         <p class="lg:col-span-2 font-semibold">Informasi Pelapor & Pasien</p>
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

      <div class="grid lg:grid-cols-2 gap-4 place-content-start">
         <p class="lg:col-span-2 font-semibold">Informasi Ambulance & Dokter</p>
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
import moment from 'moment'

const store = useAppStore()
const data : Model.Emergency = store.dialog.data
const center : ComputedRef <{ lat: number, lng: number }> = computed(() => {
   return { lat: parseFloat(data.map_lat!), lng: parseFloat(data.map_lng!) }
})
const mapOptions : ComputedRef <{[key: string]: boolean }> = computed(() => ({
   zoomControl: true,
   mapTypeControl: false,
   streetViewControl: false,
   scaleControl: false,
   rotateControl: false,
   fullscreenControl: true,
}))
</script>