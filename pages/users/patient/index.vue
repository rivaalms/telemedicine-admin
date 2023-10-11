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

            <template v-if="data?.status === 'banned'">
               <p class="font-semibold">Banned at</p>
               <p class="col-span-3">{{ data?.banned_at! }}</p>
               <p class="font-semibold">Alasan</p>
               <p class="col-span-3">{{ data?.banned_reason! }}</p>
            </template>

            <template v-if="data?.status === 'blocked'">
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
            
            <template v-if="isAccountActive">
               <u-button
                  class="col-span-4 self-center mt-4"
                  variant="outline"
                  icon="i-heroicons-no-symbol"
                  block
                  @click.stop="store.showDialog('ban-user', `Ban ${data?.full_name}`, data)"
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

            <template v-else>
               <u-button
                  class="col-span-4 self-center mt-4"
                  icon="i-heroicons-check"
                  color="emerald"
                  block
                  @click.stop="store.showDialog('activate-user', `Aktifkan ${data?.full_name}`, data)"
               >
                  Aktifkan
               </u-button>
            </template>
         </div>
      </u-card>

      <u-card class="col-span-2 h-[537px] overflow-y-auto">
         <p class="font-semibold flex items-center gap-2 border-b-[1px] pb-2">
            <u-icon name="i-heroicons-user"></u-icon>
            Data Pasien
         </p>
         <div class="py-4 grid grid-cols-2 gap-4 text-sm">
            <div class="">
               <p class="text-gray-500">
                  NIK
               </p>
               <p class="tracking-wide">
                  {{ data?.nik || '-' }}
               </p>
            </div>
            <div class="">
               <p class="text-gray-500">
                  No. Kartu Keluarga
               </p>
               <p class="tracking-wide">
                  {{ data?.no_kk || '-' }}
               </p>
            </div>
            <div class="">
               <p class="text-gray-500">
                  Jenis Kelamin
               </p>
               <p class="tracking-wide">
                  {{ data?.gender === 'L' ? 'Laki-laki' : 
                     data?.gender === 'P' ? 'Perempuan' : '-'
                  }}
               </p>
            </div>
            <div class="">
               <p class="text-gray-500">
                  Tanggal Lahir
               </p>
               <p class="tracking-wide">
                  {{ data?.dob ? moment(data?.dob).format('DD MMM YYYY') : '-' }}
               </p>
            </div>
            <div class="">
               <p class="text-gray-500">
                  Tinggi Badan
               </p>
               <p class="tracking-wide">
                  {{ data?.body_height || '-' }} cm
               </p>
            </div>
            <div class="">
               <p class="text-gray-500">
                  Berat Badan
               </p>
               <p class="tracking-wide">
                  {{ data?.body_weight || '-' }} kg
               </p>
            </div>
            <div class="">
               <p class="text-gray-500">
                  Golongan Darah
               </p>
               <p class="tracking-wide">
                  {{ data?.blood_type || '-' }}
               </p>
            </div>
         </div>

         <p class="font-semibold flex items-center gap-2 border-b-[1px] pb-2">
            <u-icon name="i-heroicons-home"></u-icon>
            Alamat
         </p>
         <div class="py-4 grid gap-4 text-sm">
            <div v-for="item in data.addresses">
               <p class="text-gray-500">
                  {{ item.address_type }}
               </p>
               <p class="tracking-wide">
                  {{ item.address }}
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

const isAccountActive : ComputedRef <boolean> = computed(() => (data.value?.status === 'banned' || data.value?.status === 'blocked') ? false : true)

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