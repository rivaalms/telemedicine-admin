<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submit"
>
   <div class="grid grid-cols-2 gap-4">
      <div class="grid grid-cols-1 gap-4">
         <u-form-group
            label="Nama Faskes"
            name="name"
            required
         >
            <u-input
               v-model="(state.name as string)"
               :disabled="loading"
            ></u-input>
         </u-form-group>
   
         <u-form-group
            label="Provinsi"
            name="province_id"
            required
         >
            <u-select-menu
               v-model="(state.province_id as number)"
               :options="provinceOptions"
               value-attribute="id"
               option-attribute="province_name"
               :disabled="loading"
               @update:model-value="onProvinceChange"
            >
               <template #label>
                  {{ provinceOptions.find(item => item.id === state.province_id)?.province_name || 'Pilih provinsi...' }}
               </template>
            </u-select-menu>
         </u-form-group>
   
         <u-form-group
            label="Kab/Kota"
            name="regency_id"
            required
         >
            <u-select-menu
               v-model="(state.regency_id as number)"
               :options="regencyOptions"
               value-attribute="id"
               option-attribute="regency_name"
               :disabled="loading"
            >
               <template #label>
                  {{ regencyOptions.find(item => item.id === state.regency_id)?.regency_name || 'Pilih kab/kota...' }}
               </template>
            </u-select-menu>
         </u-form-group>
   
         <u-form-group
            label="Alamat"
            name="address"
            required
         >
            <u-textarea
               v-model="(state.address as string)"
               :rows="4"
               autoresize
               :disabled="loading"
            ></u-textarea>
         </u-form-group>

         <u-form-group
            label="Base Color"
            name="base_color"
         >
            <u-input
               v-model="(state.base_color as string)"
               type="color"
               :disabled="loading"
            ></u-input>
         </u-form-group>
      </div>
      <div class="flex flex-col gap-4">
         <g-map-autocomplete 
            placeholder="Cari lokasi..."
            class="self-stretch"
            :options="mapAutocompleteOptions"
            @place_changed="getPlaceData"
         ></g-map-autocomplete>

         <g-map-map
            :center="mapMarker"
            :zoom="15"
            :options="mapOptions"
            class="col-span-2"
            @click="updateMarkerLocation"
         >
            <g-map-marker
               :position="mapMarker"
            ></g-map-marker>
         </g-map-map>

         <div class="col-span-2 place-content-end grid grid-cols-2 gap-2">
            <u-form-group
               label="Latitude"
               name="map_lat"
            >
               <u-input
                  :model-value="(state.map_lat as number)"
                  readonly
                  :disabled="loading"
               ></u-input>
            </u-form-group>
            <u-form-group
               label="Longitude"
               name="map_lng"
            >
               <u-input
                  :model-value="(state.map_lng as number)"
                  readonly
                  :disabled="loading"
               ></u-input>
            </u-form-group>
         </div>
      </div>
   </div>

   <div class="flex justify-end gap-2 mt-6">
      <u-button
         variant="ghost"
         color="gray"
         icon="i-heroicons-arrow-uturn-left"
         :disabled="loading"
         @click.stop="store.clearDialog()"
      >
         Kembali
      </u-button>

      <u-button
         color="emerald"
         icon="i-heroicons-check"
         :loading="loading"
         type="submit"
      >
         Simpan
      </u-button>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { getProvinces, getRegencies } from '@/utils/api/utils'
import { update as updateMedicalFacility, CreatePayload } from '@/utils/api/medical-facilities'
import * as yup from 'yup'

type FormState = {
   name: string | null
   province_id: number | null
   regency_id: number | null
   map_lat: number | string | null
   map_lng: number | string | null
   address: string | null
   base_color: string | null
}

type Schema = yup.ObjectSchema<{
   name: string
   province_id: number
   regency_id: number
   map_lat: number | null
   map_lng: number | null
   address: string
   base_color?: string | null
}>

const store = useAppStore()
const loading : Ref <boolean> = ref(false)

   const provinceOptions : Ref <API.Response.Province[]> = ref([])
const regencyOptions : Ref <API.Response.Regency[]> = ref([])
const mapMarker : Ref <{ [key: string]: number | null }> = ref({
   lat: parseFloat(store.dialog.data.map_lat),
   lng: parseFloat(store.dialog.data.map_lng)
})
const mapOptions : ComputedRef <{[key: string]: boolean }> = computed(() => ({
   zoomControl: true,
   mapTypeControl: false,
   streetViewControl: false,
   scaleControl: false,
   rotateControl: false,
   fullscreenControl: true,
}))
const mapAutocompleteOptions : ComputedRef <{ [key: string]: any }> = computed(() => ({
   bounds: {
      north: 0.1,
      south: 0.1,
      west: 0.1,
      east: 0.1
   },
   strictBounds: false,
   componentRestrictions: { country: "id" }
}))

const state : Ref <FormState> = ref({
   name: store.dialog.data.name,
   province_id: store.dialog.data.province_id,
   regency_id: store.dialog.data.regency_id,
   map_lat: parseFloat(store.dialog.data.map_lat),
   map_lng: parseFloat(store.dialog.data.map_lng),
   address: store.dialog.data.address,
   base_color: null
})

const validationSchema : Schema = yup.object({
   name: yup.string().required('Nama faskes harus diisi'),
   province_id: yup.number().typeError('Provinsi harus diisi').required('Provinsi harus diisi'),
   regency_id: yup.number().typeError('Kab./Kota harus diisi').required('Kab./Kota harus diisi'),
   map_lat: yup.number().required('Langitude harus diisi'),
   map_lng: yup.number().required('Longitude harus diisi'),
   address: yup.string().required('Alamat harus diisi'),
   base_color: yup.string().notRequired()
})

watch(() => mapMarker.value, () => {
   state.value.map_lat = mapMarker.value.lat
   state.value.map_lng = mapMarker.value.lng
})

onBeforeMount(async () : Promise <void> => {
   await getProvinces()
      .then(async (resp) => {
         provinceOptions.value = resp
         await fetchRegencies(state.value.province_id as number)
      })
})

const fetchRegencies = async (provinceId: number) : Promise <void> => {
   await getRegencies(provinceId)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async (provinceId: number) : Promise <void> => {
   state.value.regency_id = null
   await fetchRegencies(provinceId)
}

const submit = async () : Promise <void> => {
   loading.value = true
   state.value.map_lat = state.value.map_lat!.toString()
   state.value.map_lng = state.value.map_lng!.toString()

   await updateMedicalFacility(store.dialog.data.id, state.value as CreatePayload)
      .then(resp => {
         store.dialog.data = resp
         store.notify('success', `Fasilitas kesehatan ${resp.name} berhasil disunting`)
         store.dialog.callback()
         store.clearDialog()
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data?.message || error)
      })
      .finally(() => {
         loading.value = false
      })
}

const updateMarkerLocation = (event: any) => {
   mapMarker.value = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
   }
}

const getPlaceData = (event: any) => {
   mapMarker.value = {
      lat: event.geometry.location.lat(),
      lng: event.geometry.location.lng()
   }
}
</script>