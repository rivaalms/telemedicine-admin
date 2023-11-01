<template>
<u-form
   :schema="validationSchema"
   :state="state"
   :validate-on="['submit']"
   @submit.prevent="submitData"
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
               :disabled="props.disabled || loading"
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
               :disabled="props.disabled || loading"
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
               :disabled="props.disabled || loading"
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
               :disabled="props.disabled || loading"
            ></u-textarea>
         </u-form-group>

         <u-form-group
            label="Base Color"
            name="base_color"
         >
            <u-input
               v-model="(state.base_color as string)"
               type="color"
               :disabled="props.disabled || loading"
            ></u-input>
         </u-form-group>
      </div>
      <div class="grid grid-cols-2 gap-4">
         <GoogleMap
            :api-key="config.gmapKey"
            :center="mapMarker"
            :zoom="15"
            disable-default-ui
            zoom-control
            class="col-span-2"
            @click="updateMarkerLocation"
         >
            <Marker
               :options="{ position: mapMarker }"
               draggable
            ></Marker>
         </GoogleMap>

         <u-form-group
            label="Latitude"
            name="map_lat"
         >
            <u-input
               :model-value="(state.map_lat as number)"
               readonly
               :disabled="props.disabled || loading"
            ></u-input>
         </u-form-group>
         <u-form-group
            label="Longitude"
            name="map_lng"
         >
            <u-input
               :model-value="(state.map_lng as number)"
               readonly
               :disabled="props.disabled || loading"
            ></u-input>
         </u-form-group>
      </div>
   </div>

   <div class="flex items-center justify-end gap-2 mt-6">
      <u-button
         color="sky"
         type="submit"
         trailing-icon="i-heroicons-arrow-small-right"
         :loading="loading"
      >
         Selanjutnya
      </u-button>
   </div>
</u-form>
</template>

<script setup lang="ts">
import { getProvinces, getRegencies } from '@/utils/api/utils'
import { create as createMedicalFacility, CreatePayload } from '@/utils/api/medical-facilities' 
import { GoogleMap, Marker } from 'vue3-google-map'
import * as yup from 'yup'

type FormState = {
   name: string | null
   province_id: number | null
   regency_id: number | null
   map_lat: number | null
   map_lng: number | null
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

const config = useRuntimeConfig().public
const store = useAppStore()
const props = defineProps<{
   disabled?: boolean
}>()
const emit = defineEmits(['nextTab'])
const loading : Ref <boolean> = ref(false)

const provinceOptions : Ref <API.Response.Province[]> = ref([])
const regencyOptions : Ref <API.Response.Regency[]> = ref([])
const mapMarker : Ref <{ [key: string]: number | null }> = ref({
   lat: null,
   lng: null
})

const state : Ref <FormState> = ref({
   name: '',
   province_id: null,
   regency_id: null,
   map_lat: null,
   map_lng: null,
   address: null,
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
   navigator.geolocation.getCurrentPosition(position => {
      mapMarker.value = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
      }
   })

   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
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

const submitData = async () : Promise <void> => {
   loading.value = true
   await createMedicalFacility(state.value as CreatePayload)
      .then(resp => {
         store.dialog.data = resp
         store.notify('success', `Fasilitas kesehatan ${resp.name} berhasil ditambahkan`)
         emit('nextTab')
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
</script>