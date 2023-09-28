<template>
<div class="grid grid-cols-1 gap-2">
   <u-card>
      <div class="grid grid-cols-3 gap-2">
         <u-form-group
            label="No. Telepon/Email Pasien"
         >
         <div class="flex gap-2">
            <u-input
               v-model="patientSearch"
               name="patientSearch"
               :disabled="loading"
               class="flex-grow"
            ></u-input>
            <u-button
               icon="i-heroicons-magnifying-glass"
               label="Cari"
               :loading="loading"
               @click.stop="fetchPatient"
            ></u-button>
         </div>
         </u-form-group>
      </div>
   </u-card>
   
   <div
      v-if="data"
      class="grid grid-cols-3 gap-2"
   >
      <u-card class="h-[537px] overflow-y-auto">
         <div class="flex flex-col items-center border-b-[1px]">
            <img :src="data?.profile_picture || ''" class="rounded-full h-60" alt="Patient">
            <p class="p-4 font-semibold text-lg">
               {{ data?.full_name }}
            </p>
         </div>

         <div class="grid grid-cols-4 gap-2 pt-4 text-sm">
            <p class="font-semibold">Email</p>
            <p class="col-span-3">{{ data?.email! }}</p>
            <p class="font-semibold">No. Telp</p>
            <p class="col-span-3">{{ data?.phone_number! }}</p>
            <p class="font-semibold">Status</p>
            <p class="col-span-3">{{ data?.status! }}</p>

            <template v-if="data?.banned_at">
               <p class="font-semibold">Banned at</p>
               <p class="col-span-3">{{ data?.banned_at! }}</p>
               <p class="font-semibold">Alasan</p>
               <p class="col-span-3">{{ data?.banned_reason! }}</p>
            </template>

            <template v-if="data?.blocked_at">
               <p class="font-semibold">Blocked at</p>
               <p class="col-span-3">{{ data?.blocked_at! }}</p>
               <p class="font-semibold">Alasan</p>
               <p class="col-span-3">{{ data?.blocked_reason! }}</p>
            </template>

            <u-button
               class="col-span-4 self-center mt-4"
               color="sky"
               icon="i-heroicons-wallet-20-solid"
               block
            >
               Top Up Saldo
            </u-button>
            
            <template v-if="!data?.banned_at && !data?.blocked_at">
               <u-button
                  class="col-span-4 self-center mt-4"
                  variant="outline"
                  icon="i-heroicons-no-symbol"
                  block
               >
                  Ban
               </u-button>
               <u-button
                  class="col-span-4 self-center"
                  icon="i-heroicons-no-symbol"
                  block
               >
                  Block
               </u-button>
            </template>
         </div>
      </u-card>

      <u-card class="col-span-2 h-[537px] overflow-y-auto">
         <p class="text-xl font-semibold border-b-[1px] pb-4">
            Data Pasien
         </p>
         <div class="py-4 grid grid-cols-2 gap-4 text-sm">
            <div class="">
               <p class="text-base font-semibold mb-1">
                  NIK
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ data?.nik }}
               </p>
            </div>
            <div class="">
               <p class="text-base font-semibold mb-1">
                  No. Kartu Keluarga
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ data?.no_kk }}
               </p>
            </div>
            <div class="">
               <p class="text-base font-semibold mb-1">
                  Jenis Kelamin
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ data?.gender === 'L' ? 'Laki-laki' : 
                     data?.gender === 'P' ? 'Perempuan' : ''
                  }}
               </p>
            </div>
            <div class="">
               <p class="text-base font-semibold mb-1">
                  Tanggal Lahir
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ moment(data?.dob).format('DD MMM YYYY') }}
               </p>
            </div>
            <div class="">
               <p class="text-base font-semibold mb-1">
                  Tinggi Badan
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ data?.body_height }} cm
               </p>
            </div>
            <div class="">
               <p class="text-base font-semibold mb-1">
                  Berat Badan
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ data?.body_weight }} kg
               </p>
            </div>
            <div class="">
               <p class="text-base font-semibold mb-1">
                  Golongan Darah
               </p>
               <p class="text-gray-500 tracking-wide">
                  {{ data?.blood_type }}
               </p>
            </div>
         </div>
      </u-card>
   </div>
</div>
</template>

<script setup lang="ts">
import { searchPatient } from '@/utils/api/patient'
import moment from 'moment'

const store = useAppStore()
store.title = 'Pasien'
useHead({ title: store.getTitle })

const patientSearch : Ref <string | number | undefined> = ref(undefined)
const data : Ref <Model.Patient | null> = ref(null)
const loading : Ref <boolean> = ref(false)

const fetchPatient = async () => {
   loading.value = true
   await searchPatient(patientSearch.value!)
      .then((resp) => {
         data.value = resp
      })
      .finally(() => {
         loading.value = false
      })
}
</script>