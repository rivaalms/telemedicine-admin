<template>
<div class="grid grid-cols-3 gap-2">
   <u-card
      class="h-[calc(537px)] overflow-y-auto"
   >
      <div class="flex flex-col items-center border-b-[1px]">
         <img :src="profile?.profile_picture! || ''" class="rounded-full h-60" alt="Doctor">
         <p class="p-4 font-semibold text-lg">
            {{ profile?.full_name! }}
         </p>
      </div>
      <div class="grid grid-cols-4 gap-2 pt-4 text-sm">
         <p class="font-semibold">Email</p>
         <p class="col-span-3">{{ profile?.email! }}</p>
         <p class="font-semibold">No. Telp</p>
         <p class="col-span-3">{{ profile?.phone_number! }}</p>
         <p class="font-semibold">Status</p>
         <p class="col-span-3">{{ profile?.status! }}</p>

         <template v-if="profile?.banned_at">
            <p class="font-semibold">Banned at</p>
            <p class="col-span-3">{{ profile?.banned_at! }}</p>
            <p class="font-semibold">Alasan</p>
            <p class="col-span-3">{{ profile?.banned_reason! }}</p>
         </template>

         <template v-if="profile?.blocked_at">
            <p class="font-semibold">Blocked at</p>
            <p class="col-span-3">{{ profile?.blocked_at! }}</p>
            <p class="font-semibold">Alasan</p>
            <p class="col-span-3">{{ profile?.blocked_reason! }}</p>
         </template>

         <template v-if="!profile?.banned_at && !profile?.blocked_at">
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

   <u-card
      class="col-span-2 h-[calc(537px)] overflow-y-auto"
   >
      <p class="text-xl font-semibold border-b-[1px] pb-4">
         Data Pribadi
      </p>
      <div class="py-4 grid grid-cols-2 gap-4 text-sm">
         <div class="">
            <p class="text-base font-semibold mb-1">
               No. STR
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.no_str }}
            </p>
         </div>
         <div class="">
            <p class="text-base font-semibold mb-1">
               Tanggal Jangka Waktu STR
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.str_date }}
            </p>
         </div>
         <div class="">
            <p class="text-base font-semibold mb-1">
               Jenis Kelamin
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.gender === 'L' ? 'Laki-laki' :
                  profile?.gender === 'P' ? 'Perempuan' :
                  ''
               }}
            </p>
         </div>
         <div class="">
            <p class="text-base font-semibold mb-1">
               Tanggal Jangka Waktu SIP
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.sip_date }}
            </p>
         </div>
         <div class="">
            <p class="text-base font-semibold mb-1">
               Provinsi
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.province_name }}
            </p>
         </div>
         <div class="">
            <p class="text-base font-semibold mb-1">
               Kabupaten/Kota
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.regency_name }}
            </p>
         </div>
         <div class="">
            <p class="text-base font-semibold mb-1">
               Start Experience
            </p>
            <p class="text-gray-500 tracking-wide">
               {{ profile?.start_experience }}
            </p>
         </div>
      </div>

      <div class="grid grid-cols-2 gap-4 py-4">
         <div>
            <p class="text-xl font-semibold border-b-[1px] pb-4">
               Spesialis
            </p>
            <div
               v-for="item in specialist"
               :key="item.slug!"
               class="text-sm pt-4"
            >
               <p class="text-base font-semibold">
                  {{ item.specialist }}
               </p>
               <p class="text-gray-500">Rate: {{ parseCurrency(item.rate!) }}</p>
            </div>
         </div>

         <div>
            <p class="text-xl font-semibold border-b-[1px] pb-4">
               Riwayat Pendidikan
            </p>
            <div
               v-for="item in educations"
               :key="item.id!"
               class="text-sm pt-4"
            >
               <p class="text-base font-semibold">
                  {{ item.education }}
               </p>
               <p class="text-gray-500">
                  Tahun Kelulusan: {{ item.graduation_year }}
               </p>
            </div>
         </div>
      </div>

      <p class="text-xl font-semibold border-b-[1px] py-4">
         Tempat Praktek
      </p>
      <div
         v-for="item in medicalFacility"
         :key="item.id!"
         class="pt-4 text-sm"
      >
         <p class="text-base font-semibold">
            {{ item.name }}
         </p>
         <p class="text-gray-500">
            {{ item.province_name }}, {{ item.regency_name }}
         </p>
      </div>
   </u-card>

   <u-card
      class="col-span-3"
   >
      <p class="text-xl font-semibold border-b-[1px] pb-4">
         Jadwal Praktek
      </p>

      <u-table
         :columns="useDoctorSchedulesTableHeader"
         :rows="schedule ? schedule : []"
         class="pt-4"
      >
         <template #day-data="{ row }">
            {{ useParseDay(row.day) }}
         </template>
      </u-table>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getByStr } from '@/utils/api/doctors'

useHead({ title: 'Profil Dokter' })

const store = useAppStore()
const profile : Ref <Model.Doctor | null> = ref(null)
const specialist : Ref <Model.DoctorSpecialist[] | null> = ref(null)
const educations : Ref <Model.DoctorEducation[] | null> = ref(null)
const medicalFacility : Ref <Model.MedicalFacility[] | null> = ref(null)
const schedule : Ref <Model.DoctorSchedule[] | null> = ref(null)

onBeforeMount(async () => {
   await getByStr(useRoute().params.str!.toString())
      .then((resp) => {
         profile.value = resp
         specialist.value = resp.doctor_specialists!
         educations.value = resp.educations!
         medicalFacility.value = resp.facilities!
         schedule.value = resp.doctor_schedules!
         store.title = resp.full_name!
      })
})

const parseCurrency = (value: string | number) => {
   const number = Number(value)
   return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
   })
}
</script>