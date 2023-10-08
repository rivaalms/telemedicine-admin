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

         <template v-if="profile?.status === 'banned'">
            <p class="font-semibold">Banned at</p>
            <p class="col-span-3">{{ profile?.banned_at! }}</p>
            <p class="font-semibold">Alasan</p>
            <p class="col-span-3">{{ profile?.banned_reason! }}</p>
         </template>

         <template v-if="profile?.status === 'blocked'">
            <p class="font-semibold">Blocked at</p>
            <p class="col-span-3">{{ profile?.blocked_at! }}</p>
            <p class="font-semibold">Alasan</p>
            <p class="col-span-3">{{ profile?.blocked_reason! }}</p>
         </template>

         <template v-if="isAccountActive">
            <u-button
               class="col-span-4 self-center mt-4"
               variant="outline"
               icon="i-heroicons-no-symbol"
               color="red"
               block
               @click.stop="store.showDialog('ban-doctor', `Ban ${profile?.full_name}`, profile)"
            >
               Ban
            </u-button>
            <u-button
               class="col-span-4 self-center"
               icon="i-heroicons-no-symbol"
               color="red"
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
               @click.stop="store.showDialog('activate-doctor', `Aktifkan ${profile?.full_name}`, profile)"
            >
               Aktifkan
            </u-button>
         </template>
      </div>
   </u-card>

   <u-card
      class="col-span-2 h-[calc(537px)] overflow-y-auto"
   >
      <div class="flex justify-between items-center border-b-[1px] pb-2">
         <p class="font-semibold flex items-center gap-2">
            <u-icon name="i-heroicons-user"></u-icon>
            Data Pribadi
         </p>

         <u-tooltip text="Sunting data pribadi">
            <u-button
               variant="ghost"
               color="amber"
               icon="i-heroicons-pencil-square"
               size="xs"
               @click.stop="store.showDialog('edit-personal-data-doctor', 'Sunting Data Pribadi', profile)"
            ></u-button>
         </u-tooltip>
      </div>
      <div class="py-2 grid grid-cols-2 gap-4 text-sm">
         <div class="">
            <p class="text-gray-500">
               No. STR
            </p>
            <p class="tracking-wide">
               {{ profile?.no_str }}
            </p>
         </div>
         <div class="">
            <p class="text-gray-500">
               Tanggal Jangka Waktu STR
            </p>
            <p class="tracking-wide">
               {{ profile?.str_date }}
            </p>
         </div>
         <div class="">
            <p class="text-gray-500">
               Jenis Kelamin
            </p>
            <p class="tracking-wide">
               {{ profile?.gender === 'L' ? 'Laki-laki' :
                  profile?.gender === 'P' ? 'Perempuan' :
                  ''
               }}
            </p>
         </div>
         <div class="">
            <p class="text-gray-500">
               Tanggal Jangka Waktu SIP
            </p>
            <p class="tracking-wide">
               {{ profile?.sip_date }}
            </p>
         </div>
         <div class="">
            <p class="text-gray-500">
               Provinsi
            </p>
            <p class="tracking-wide">
               {{ profile?.province_name }}
            </p>
         </div>
         <div class="">
            <p class="text-gray-500">
               Kabupaten/Kota
            </p>
            <p class="tracking-wide">
               {{ profile?.regency_name }}
            </p>
         </div>
         <div class="">
            <p class="text-gray-500">
               Start Experience
            </p>
            <p class="tracking-wide">
               {{ profile?.start_experience }}
            </p>
         </div>
      </div>

      <div class="grid grid-cols-2 gap-4 py-4">
         <div>
            <div class="flex justify-between items-center border-b-[1px] pb-2">
               <p class="font-semibold flex items-center gap-2">
                  <u-icon name="i-heroicons-clipboard"></u-icon>
                  Spesialis
               </p>

               <u-tooltip text="Sunting spesialis">
                  <u-button
                     variant="ghost"
                     color="amber"
                     icon="i-heroicons-pencil-square"
                     size="xs"
                  ></u-button>
               </u-tooltip>
            </div>
            <div
               v-for="item in specialist"
               :key="item.slug!"
               class="text-sm pt-4"
            >
               <p class="font-semibold">
                  {{ item.specialist }}
               </p>
               <p class="text-gray-500">Rate: {{ parseCurrency(item.rate!) }}</p>
            </div>
         </div>

         <div>
            <div class="flex justify-between items-center border-b-[1px] pb-2">
               <p class="font-semibold flex items-center gap-2">
                  <u-icon name="i-heroicons-academic-cap"></u-icon>
                  Riwayat Pendidikan
               </p>

               <u-tooltip text="Sunting riwayat pendidikan">
                  <u-button
                     variant="ghost"
                     color="amber"
                     icon="i-heroicons-pencil-square"
                     size="xs"
                  ></u-button>
               </u-tooltip>
            </div>
            <div
               v-for="item in educations"
               :key="item.id!"
               class="text-sm pt-4"
            >
               <p class="font-semibold">
                  {{ item.education }}
               </p>
               <p class="text-gray-500">
                  Tahun Kelulusan: {{ item.graduation_year }}
               </p>
            </div>
         </div>
      </div>

      <div class="flex justify-between items-center border-b-[1px] py-2">
         <p class="font-semibold flex items-center gap-2">
            <u-icon name="i-heroicons-building-office"></u-icon>
            Tempat Praktek
         </p>

         <u-tooltip text="Sunting tempat praktek">
            <u-button
               variant="ghost"
               color="amber"
               icon="i-heroicons-pencil-square"
               size="xs"
            ></u-button>
         </u-tooltip>
      </div>
      <div
         v-for="item in medicalFacility"
         :key="item.id!"
         class="pt-2 text-sm"
      >
         <p class="font-semibold">
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
      <div class="flex justify-between items-center border-b-[1px] pb-2">
         <p class="font-semibold flex items-center gap-2">
            <u-icon name="i-heroicons-calendar"></u-icon>
            Jadwal Praktek
         </p>
      </div>

      <u-table
         :columns="useDoctorSchedulesTableHeader"
         :rows="schedule ? schedule : []"
         class="pt-2"
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

const isAccountActive : ComputedRef <boolean> = computed(() => (profile.value?.status === 'banned' || profile.value?.status === 'blocked') ? false : true)

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