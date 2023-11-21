<template>
<div class="grid grid-cols-2 gap-2">
   <div
      ref="transactionIncome"
      class="col-span-2"
   >
      <lazy-dashboard-transaction-income></lazy-dashboard-transaction-income>
   </div>

   <!-- <div ref="emergency" class="col-span-2 xl:col-span-1">
      <lazy-dashboard-emergency></lazy-dashboard-emergency>
   </div> -->

   <div ref="doctorOnlineStatus" class="col-span-2 xl:col-span-1">
      <lazy-dashboard-doctor-online-status></lazy-dashboard-doctor-online-status>
   </div>

   <!-- <div ref="ambulances" class="col-span-2 xl:col-span-1">
      <lazy-dashboard-ambulances :render="render.ambulances"></lazy-dashboard-ambulances>
   </div> -->

   <div ref="patients" class="col-span-2 xl:col-span-1">
      <lazy-dashboard-patients :render="render.patients"></lazy-dashboard-patients>
   </div>

   <div
      ref="consultations"
      class="col-span-2"
   >
      <lazy-dashboard-consultations :render="render.consultations"></lazy-dashboard-consultations>
   </div>
</div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import { WritableComputedRef } from 'nuxt/dist/app/compat/vue-demi';

type Render = {
   ambulances: boolean
   patients: boolean
   consultations: boolean
}

type Scroller = {
   [key: string]: WritableComputedRef <number>
}

const store = useAppStore()
store.title = 'Dashboard'
useHead({ title: store.getTitle })

const transactionIncome : Ref <HTMLElement | undefined> = ref()
// const emergency : Ref <HTMLElement | undefined> = ref()
const doctorOnlineStatus : Ref <HTMLElement | undefined> = ref()
// const ambulances : Ref <HTMLElement | undefined> = ref()
const patients : Ref <HTMLElement | undefined> = ref()
const consultations : Ref <HTMLElement | undefined> = ref()

const render : Ref <Render> = ref({
   ambulances: false,
   patients: false,
   consultations: false
})

const { scrollY } : Scroller = inject('scroll')!

const unwatch = watch(scrollY, () => {
   onScroll()

   if (Object.values(render.value).every((val) => val === true)) unwatch()
})

const onScroll = () : void => {
   // const topAmbulances = ambulances.value!.getBoundingClientRect().top
   const topPatients = patients.value!.getBoundingClientRect().top
   const topConsultations = consultations.value!.getBoundingClientRect().top

   // if (topAmbulances - window.innerHeight < 0 && !render.value.ambulances) render.value.ambulances = true

   if (topPatients - window.innerHeight < 0 && !render.value.patients) render.value.patients = true

   if (topConsultations - window.innerHeight < 0 && !render.value.consultations) render.value.consultations = true
}
</script>