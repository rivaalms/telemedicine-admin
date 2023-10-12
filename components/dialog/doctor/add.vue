<template>
<u-tabs
   v-model="currentTab"
   :items="tabs"
>
   <template #data>
      <u-form
         :schema="validationSchemaData"
         :state="stateData"
         :validate-on="['submit']"
         @submit.prevent="submitData"
      >
         <div class="grid grid-rows-4 grid-flow-col gap-4">
            <u-form-group
               label="Nama Lengkap"
               name="full_name"
               required
            >
               <u-input
                  v-model="stateData.full_name"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="Jenis Kelamin"
               name="gender"
               required
            >
               <u-select-menu
                  v-model="stateData.gender"
                  :options="genderOptions"
                  value-attribute="value"
                  option-attribute="label"
                  :disabled="isFormDisabled"
               >
                  <template #label>
                     {{ genderOptions.find((item: any) => item.value === stateData.gender)?.label || 'Pilih jenis kelamin...' }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Email"
               name="email"
               required
            >
               <u-input
                  v-model="stateData.email"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="No. Telepon"
               name="phone_number"
               required
            >
               <u-input
                  v-model="stateData.phone_number"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="No. STR"
               name="no_str"
               required
            >
               <u-input
                  v-model="stateData.no_str"
                  :disabled="isFormDisabled"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="Masa Berlaku STR"
               name="str_date"
               required
            >
               <vue-date-picker
                  v-model="stateData.str_date"
                  auto-apply
                  @update:model-value="(value) => { stateData.str_date =  moment(value).format('YYYY-MM-DD') }"
               >
                  <template #trigger>
                     <u-input
                        :model-value="stateData.str_date"
                        icon="i-heroicons-calendar"
                        readonly="readonly"
                        :disabled="isFormDisabled"
                     ></u-input>
                  </template>
               </vue-date-picker>
            </u-form-group>

            <u-form-group
               label="Masa Berlaku SIP"
               name="sip_date"
               required
            >
               <vue-date-picker
                  v-model="stateData.sip_date"
                  auto-apply
                  @update:model-value="(value) => { stateData.sip_date =  moment(value).format('YYYY-MM-DD') }"
               >
                  <template #trigger>
                     <u-input
                        :model-value="stateData.sip_date"
                        icon="i-heroicons-calendar"
                        readonly="readonly"
                        :disabled="isFormDisabled"
                     ></u-input>
                  </template>
               </vue-date-picker>
            </u-form-group>

            <u-form-group
               label="Start Experience"
               name="start_experience"
               required
            >
               <vue-date-picker
                  v-model="stateData.start_experience"
                  auto-apply
                  @update:model-value="(value) => { stateData.start_experience =  moment(value).format('YYYY-MM-DD') }"
               >
                  <template #trigger>
                     <u-input
                        :model-value="stateData.start_experience"
                        icon="i-heroicons-calendar"
                        readonly="readonly"
                        :disabled="isFormDisabled"
                     ></u-input>
                  </template>
               </vue-date-picker>
            </u-form-group>

            <u-form-group
               label="Provinsi"
               name="province_id"
               required
            >
               <u-select-menu
                  v-model="stateData.province_id"
                  :options="provinceOptions"
                  value-attribute="id"
                  option-attribute="province_name"
                  :disabled="isFormDisabled"
                  @update:model-value="onProvinceChange"
               >
                  <template #label>
                     {{ provinceOptions.find(item => item.id === stateData.province_id)?.province_name || 'Pilih Provinsi...' }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Kab/Kota"
               name="regency_id"
               required
            >
               <u-select-menu
                  v-model="stateData.regency_id"
                  :options="regencyOptions"
                  :disabled="isFormDisabled"
                  value-attribute="id"
                  option-attribute="regency_name"
               >
                  <template #label>
                     {{ regencyOptions.find(item => item.id === stateData.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Tags"
               name="tags"
               required
            >
               <u-select-menu
                  v-model="stateData.tags"
                  :options="[ {label: 'Tidak ada data' } ]"
                  :disabled="isFormDisabled"
               >
                  <template #label>
                     {{ 'Pilih Tags...' }}
                  </template>
               </u-select-menu>
            </u-form-group>
         </div>

         <div class="flex items-center justify-end gap-2 mt-6">
            <u-button
               color="sky"
               type="submit"
               trailing-icon="i-heroicons-arrow-small-right"
            >
               Selanjutnya
            </u-button>
         </div>
      </u-form>
   </template>

   <template #details>
      <div class="grid grid-cols-3 gap-2">
         <!-- SECTION: Specialist -->
         <div class="grid gap-y-4">
            <p class="font-semibold">
               Spesialis Dokter
            </p>
            <u-card>
               <div
                  v-for="item in specialist"
                  class="grid divide-y pb-4"
               >
                  <div class="text-sm py-2 truncate">
                     <div class="flex items-center justify-between gap-2">
                        <p class="font-semibold truncate">{{ item.name || '-' }}</p>
                        <div class="flex gap-2">
                           <u-popover :ui="{ base: 'overflow-visible' }">
                              <u-button
                                 size="2xs"
                                 color="amber"
                                 variant="ghost"
                                 icon="i-heroicons-pencil"
                                 @click="() => { stateSpecialist = { slug: item.slug, rate: item.rate } }"
                              ></u-button>

                              <template #panel>
                                 <!-- SECTION: Edit Specialist -->
                                 <u-card class="overflow-visible">
                                    <u-form
                                       :schema="validationSchemaSpecialist"
                                       :state="stateSpecialist"
                                       :validate-on="['submit']"
                                       @submit.prevent="submitSpecialist(true, item)"
                                    >
                                       <div class="grid gap-2">
                                          <u-form-group
                                             label="Spesialis"
                                             name="specialist"
                                             required
                                          >
                                             <u-select-menu
                                                v-model="stateSpecialist.slug"
                                                :options="specialistOptions"
                                                value-attribute="slug"
                                                option-attribute="name"
                                                @click="fetchSpecialist"
                                             >
                                                <template #label>
                                                   {{ specialistOptions.find((item: any) => item.slug === stateSpecialist.slug)?.name || 'Pilih spesialis...' }}
                                                </template>
                                             </u-select-menu>
                                          </u-form-group>
   
                                          <u-form-group
                                             label="Rate"
                                             name="rate"
                                             required
                                          >
                                             <u-input
                                                v-model="stateSpecialist.rate"
                                             ></u-input>
                                          </u-form-group>
                                       </div>

                                       <div class="flex justify-end gap-2 mt-4">
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
                                 </u-card>
                                 <!-- !SECTION -->
                              </template>
                           </u-popover>

                           <u-popover :ui="{ base: 'overflow-visible' }">
                              <u-button
                                 size="2xs"
                                 color="red"
                                 variant="ghost"
                                 icon="i-heroicons-trash"
                              ></u-button>

                              <template #panel>
                                 <!-- SECTION: Delete Specialist -->
                                 <u-card class="overflow-visible">
                                    <p>Anda yakin ingin menghapus data ini?</p>
                                    <div class="flex justify-end gap-2 mt-4">
                                       <u-button
                                          color="red"
                                          icon="i-heroicons-trash"
                                          @click.stop="deleteSpecialist(item)"
                                       >
                                          Hapus
                                       </u-button>
                                    </div>
                                 </u-card>
                                 <!-- !SECTION -->
                              </template>
                           </u-popover>
                        </div>
                     </div>
                     <p class="text-gray-500">Rate: {{ item.rate || '-' }}</p>
                  </div>
               </div>

               <u-popover :ui="{ base: 'overflow-visible' }">
                  <u-button
                     block
                     color="sky"
                     variant="outline"
                     icon="i-heroicons-plus"
                     @click="() => { stateSpecialist = { slug: '', rate: '' } }"
                  >
                     Tambah Spesialis
                  </u-button>

                  <template #panel>
                     <!-- SECTION: Add Specialist -->
                     <u-card class="overflow-visible">
                        <u-form
                           :schema="validationSchemaSpecialist"
                           :state="stateSpecialist"
                           :validate-on="['submit']"
                           @submit.prevent="submitSpecialist(false)"
                        >
                           <div class="grid gap-2">
                              <u-form-group
                                 label="Spesialis"
                                 name="specialist"
                                 required
                              >
                                 <u-select-menu
                                    v-model="stateSpecialist.slug"
                                    :options="specialistOptions"
                                    value-attribute="slug"
                                    option-attribute="name"
                                    @click="fetchSpecialist"
                                 >
                                    <template #label>
                                       {{ specialistOptions.find((item: any) => item.slug === stateSpecialist.slug)?.name || 'Pilih spesialis...' }}
                                    </template>
                                 </u-select-menu>
                              </u-form-group>

                              <u-form-group
                                 label="Rate"
                                 name="rate"
                                 required
                              >
                                 <u-input
                                    v-model="stateSpecialist.rate"
                                 ></u-input>
                              </u-form-group>

                              <div class="flex justify-end gap-2 mt-2">
                                 <u-button
                                    color="emerald"
                                    icon="i-heroicons-check"
                                    :loading="loading"
                                    type="submit"
                                 >
                                    Simpan
                                 </u-button>
                              </div>
                           </div>
                        </u-form>
                     </u-card>
                     <!-- !SECTION -->
                  </template>
               </u-popover>
            </u-card>
         </div>
         <!-- !SECTION -->

         <!-- SECTION: Education -->
         <div class="grid gap-y-4">
            <p class="font-semibold">
               Riwayat Pendidikan
            </p>
            <u-card>
               <div
                  v-for="item in education"
                  class="grid divide-y pb-4"
               >
                  <div class="text-sm py-2 truncate">
                     <div class="flex items-center justify-between gap-2">
                        <p class="font-semibold truncate">{{ item.education || '-' }}</p>
                        <div class="flex gap-2">
                           <u-popover :ui="{ base: 'overflow-visible' }">
                              <u-button
                                 size="2xs"
                                 color="amber"
                                 variant="ghost"
                                 icon="i-heroicons-pencil"
                                 @click="() => { stateEducation = { education: item.education, graduation_year: item.graduation_year } }"
                              ></u-button>

                              <template #panel>
                                 <!-- SECTION: Edit Education -->
                                 <u-card class="overflow-visible">
                                    <u-form
                                       :schema="validationSchemaEducation"
                                       :state="stateEducation"
                                       :validate-on="['submit']"
                                       @submit.prevent="submitEducation(true, item)"
                                    >
                                       <div class="grid gap-2">
                                          <u-form-group
                                             label="Universitas"
                                             name="education"
                                             required
                                          >
                                             <u-input
                                                v-model="stateEducation.education"
                                             ></u-input>
                                          </u-form-group>
   
                                          <u-form-group
                                             label="Tahun Kelulusan"
                                             name="graduation_year"
                                             required
                                          >
                                             <vue-date-picker
                                                v-model="stateEducation.graduation_year"
                                                year-picker
                                                auto-apply
                                             >
                                                <template #trigger>
                                                   <u-input
                                                      :model-value="stateEducation.graduation_year"
                                                      readonly="readonly"
                                                      icons="i-heroicons-calendar"
                                                   ></u-input>
                                                </template>
                                             </vue-date-picker>
                                          </u-form-group>
                                       </div>

                                       <div class="flex justify-end gap-2 mt-4">
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
                                 </u-card>
                                 <!-- !SECTION -->
                              </template>
                           </u-popover>

                           <u-popover :ui="{ base: 'overflow-visible' }">
                              <u-button
                                 size="2xs"
                                 color="red"
                                 variant="ghost"
                                 icon="i-heroicons-trash"
                              ></u-button>

                              <template #panel>
                                 <!-- SECTION: Delete Education -->
                                 <u-card class="overflow-visible">
                                    <p>Anda yakin ingin menghapus data ini?</p>
                                    <div class="flex justify-end gap-2 mt-4">
                                       <u-button
                                          color="red"
                                          icons="i-heroicons-trash"
                                          @click.stop="deleteEducation(item)"
                                       ></u-button>
                                    </div>
                                 </u-card>
                                 <!-- !SECTION -->
                              </template>
                           </u-popover>
                        </div>
                        <p class="text-gray-500">Tahun Kelulusan: {{ item.graduation_year }}</p>
                     </div>
                  </div>
               </div>
               
               <u-popover :ui="{ base: 'overflow-visible' }">
                  <u-button
                     block
                     color="sky"
                     variant="outline"
                     icon="i-heroicons-plus"
                     @click="() => stateEducation = { education: '', graduation_year: '' }"
                  >
                     Tambah Riwayat Pendidikan
                  </u-button>

                  <template #panel>
                     <!-- SECTION: Add Education -->
                     <u-card class="overflow-visible">
                        <u-form
                           :schema="validationSchemaEducation"
                           :state="stateEducation"
                           :validate-on="['submit']"
                           @submit.prevent="submitEducation(false)"
                        >
                           <div class="grid gap-2">
                              <u-form-group
                                 label="Universitas"
                                 name="education"
                                 required
                              >
                                 <u-input
                                    v-model="stateEducation.education"
                                 ></u-input>
                              </u-form-group>

                              <u-form-group
                                 label="Tahun Kelulusan"
                                 name=graduation_year
                                 required
                              >
                                 <vue-date-picker
                                    v-model="stateEducation.graduation_year"
                                    year-picker
                                    auto-apply
                                 >
                                    <template #trigger>
                                       <u-input
                                          :model-value="stateEducation.graduation_year"
                                          readonly="readonly"
                                          icons="i-heroicons-calendar"
                                       ></u-input>
                                    </template>
                                 </vue-date-picker>
                              </u-form-group>
                           </div>

                           <div class="flex justify-end gap-2 mt-4">
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
                     </u-card>
                     <!-- !SECTION -->
                  </template>
               </u-popover>
            </u-card>
         </div>
         <!-- !SECTION -->

         <!-- SECTION: Medical Facility -->
         <div class="grid gap-y-4">
            <p class="font-semibold">
               Lokasi Praktek
            </p>
            <u-card>
               <div
                  v-for="item in medicalFacility"
                  class="grid divide-y pb-4"
               >
                  <div class="text-sm py-2 truncate">
                     <div class="flex items-center justify-between gap-2">
                        <p class="font-semibold truncate">{{  item.name || '-' }}</p>
                        <div class="flex gap-2">
                           <u-popover :ui="{ base: 'overflow-visible' }">
                              <u-button
                                 size="2xs"
                                 color="amber"
                                 variant="ghost"
                                 icon="i-heroicons-pencil"
                                 @click="() => { stateMedicalFacility = { name: item.name, province_id: item.province_id, regency_id: item.regency_id } }"
                              ></u-button>
   
                              <template #panel>
                                 <!-- SECTION: Edit Medical Facility -->
                                 <u-card class="overflow-visible">
                                    <u-form
                                       :schema="validationSchemaMedicalFacility"
                                       :state="stateMedicalFacility"
                                       :validate-on="['submit']"
                                       @submit.prevent="submitMedicalFacility(true, item)"
                                    >
                                       <div class="grid gap-2">
                                          <u-form-group
                                             label="Tempat Praktek"
                                             name="name"
                                             required
                                          >
                                             <u-input
                                                v-model="stateMedicalFacility.name"
                                             ></u-input>
                                          </u-form-group>
   
                                          <u-form-group
                                             label="Provinsi"
                                             name="province_id"
                                             required
                                          >
                                             <u-select-menu
                                                v-model="stateMedicalFacility.province_id"
                                                :options="provinceOptions"
                                                value-attribute="id"
                                                option-attribute="province_name"
                                                @update:model-value="onProvinceChange"
                                             >
                                                <template #label>
                                                   {{ provinceOptions.find(item => item.id === stateMedicalFacility.province_id)?.province_name || 'Pilih provinsi...' }}
                                                </template>
                                             </u-select-menu>
                                          </u-form-group>
   
                                          <u-form-group
                                             label="Kab/Kota"
                                             name="regency_id"
                                             required
                                          >
                                             <u-select-menu
                                                v-model="stateMedicalFacility.regency_id"
                                                :options="regencyOptions"
                                                value-attribute="id"
                                                option-attribute="regency_name"
                                             >
                                                <template #label>
                                                   {{ regencyOptions.find(item => item.id === stateMedicalFacility.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
                                                </template>
                                             </u-select-menu>
                                          </u-form-group>
                                       </div>
   
                                       <div class="flex justify-end gap-2 mt-4">
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
                                 </u-card>
                                 <!-- !SECTION -->
                              </template>
                           </u-popover>

                           <u-popover :ui="{ base: 'overflow-visible' }">
                              <u-button
                                 size="2xs"
                                 color="red"
                                 variant="ghost"
                                 icon="i-heroicons-trash"
                              ></u-button>

                              <template #panel>
                                 <!-- SECTION: Delete Medical Facility -->
                                 <u-card class="overflow-visible">
                                    <p>Anda yakin ingin menghapus data ini?</p>
                                    <div class="flex justify-end gap-2 mt-4">
                                       <u-button
                                          color="red"
                                          icons="i-herocins-trash"
                                          @click.stop="deleteMedicalFacility(item)"
                                       ></u-button>
                                    </div>
                                 </u-card>
                                 <!-- !SECTION -->
                              </template>
                           </u-popover>
                        </div>
                        <p class="text-gray-500">{{ `${item.regency!.name}, ${item.province!.name}` }}</p>
                     </div>
                  </div>
               </div>

               <u-popover :ui="{ base: 'overflow-visible' }">
                  <u-button
                     block
                     color="sky"
                     variant="outline"
                     icon="i-heroicons-plus"
                     @click="() => stateMedicalFacility = { name: '', province_id: null, regency_id: null }"
                  >
                     Tambah Lokasi Praktek
                  </u-button>

                  <template #panel>
                     <!-- SECTION: Add Medical Facility -->
                     <u-card class="overflow-visible">
                        <u-form
                           :schema="validationSchemaMedicalFacility"
                           :state="stateMedicalFacility"
                           :validate-on="['submit']"
                           @submit.prevent="submitMedicalFacility(false)"
                        >
                           <div class="grid gap-2">
                              <u-form-group
                                 label="Lokasi Praktek"
                                 name="name"
                                 required
                              >
                                 <u-input
                                    v-model="stateMedicalFacility.name"
                                 ></u-input>
                              </u-form-group>

                              <u-form-group
                                 label="Provinsi"
                                 name="province_id"
                                 required
                              >
                                 <u-select-menu
                                    v-model="stateMedicalFacility.province_id"
                                    :options="provinceOptions"
                                    value-attribute="id"
                                    option-attribute="province_name"
                                    @update:model-value="onProvinceChange"
                                 >
                                    <template #label>
                                       {{ provinceOptions.find(item => item.id === stateMedicalFacility.province_id)?.province_name || 'Pilih provinsi...' }}
                                    </template>
                                 </u-select-menu>
                              </u-form-group>

                              <u-form-group
                                 label="Kab/Kota"
                                 name="regency_id"
                                 required
                              >
                                 <u-select-menu
                                    v-model="stateMedicalFacility.regency_id"
                                    :options="regencyOptions"
                                    value-attribute="id"
                                    option-attribute="regency_name"
                                 >
                                    <template #label>
                                       {{ regencyOptions.find(item => item.id === stateMedicalFacility.regency_id)?.regency_name || 'Pilih Kab/Kota...' }}
                                    </template>
                                 </u-select-menu>
                              </u-form-group>
                           </div>

                           <div class="flex justify-end gap-2 mt-4">
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
                     </u-card>
                     <!-- !SECTION -->
                  </template>
               </u-popover>
            </u-card>
         </div>
         <!-- !SECTION -->

         <div class="col-span-3 flex items-center justify-between gap-2 mt-6">
            <u-button
               color="gray"
               variant="ghost"
               icon="i-heroicons-arrow-small-left"
               @click="currentTab--"
            >
               Sebelumnya
            </u-button>
            <u-button
               color="sky"
               trailing-icon="i-heroicons-arrow-small-right"
               @click="currentTab++"
            >
               Selanjutnya
            </u-button>
         </div>
      </div>
   </template>

   <template #image>
      <div class="grid gap-2">
         <!-- SECTION: Upload Image -->
         <u-card class="shadow-none overflow-visible">
            <div class="grid">
               <input
                  class="hidden"
                  type="file"
                  ref="imageInput"
                  name="image"
                  accept="image/*"
                  @change="(event) => setImage(event)"
               />

               <div class="flex justify-center mb-4">
                  <img
                     v-if="croppedImage"
                     :src="croppedImage"
                  />
               </div>

               <div v-if="isCropping" class="grid gap-4 mb-4">
                  <vue-cropper
                     :src="image"
                     ref="cropper"
                     drag-mode="none"
                     :aspect-ratio="1/1"
                     preview=".preview"
                  ></vue-cropper>

                  <div class="flex justify-center gap-4">
                     <u-button
                        variant="ghost"
                        color="gray"
                        icon="i-heroicons-x-mark"
                        @click.stop="cancelCrop"
                     >
                        Batal
                     </u-button>

                     <u-button
                        color="sky"
                        icon="i-heroicons-scissors"
                        @click.stop="cropImage"
                     >
                        Potong
                     </u-button>
                  </div>
               </div>

               <div class="flex justify-center gap-4">
                  <u-button
                     v-if="!isCropping"
                     color="sky"
                     :variant="!imageFile ? 'solid' : 'ghost'"
                     icon="i-heroicons-photo"
                     @click.stop="() => {
                        cancelCrop()
                        imageInput.click()
                     }"
                  >
                     {{ !imageFile ? 'Pilih Foto' : 'Ubah Foto' }}
                  </u-button>

                  <u-button
                     v-if="imageFile"
                     color="emerald"
                     icon="i-heroicons-check"
                     @click.stop="uploadImage"
                  >
                     Simpan
                  </u-button>
               </div>
            </div>
         </u-card>
         <!-- !SECTION -->
         
         <div class="flex items-center justify-between gap-2 mt-6">
            <u-button
               color="gray"
               variant="ghost"
               icon="i-heroicons-arrow-small-left"
               @click="currentTab--"
            >
               Sebelumnya
            </u-button>
            <u-button
               color="sky"
               trailing-icon="i-heroicons-arrow-small-right"
               @click="currentTab++"
            >
               Selanjutnya
            </u-button>
         </div>
      </div>
   </template>
</u-tabs>
</template>

<script setup lang="ts">
import { getProvinces, getRegencies, getDoctorSpecialists } from '@/utils/api/utils'
import {
   addDoctor,
   addDoctorSpecialist,
   updateDoctorSpecialist,
   deleteDoctorSpecialist,
   addDoctorEducation,
   updateDoctorEducation,
   deleteDoctorEducation,
   addDoctorMedicalFacility,
   updateDoctorMedicalFacility,
   deleteDoctorMedicalFacility,
   addDoctorImage
} from '@/utils/api/doctors'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import * as yup from 'yup'
import moment from 'moment'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

const store = useAppStore()
const doctor : Ref <Model.Doctor | null> = ref(null)
const specialist : Ref <Model.DoctorSpecialist[]> = ref([])
const education : Ref <Model.DoctorEducation[]> = ref([])
const medicalFacility : Ref <Model.MedicalFacility[]> = ref([])

const isFormDisabled : ComputedRef <boolean> = computed(() => doctor.value ? true : false)
const stepper : Ref <number> = ref(0)
const currentTab : Ref <number> = ref(0)
const loading : Ref <boolean> = ref(false)
const tabs : Ref <any> = ref([
   { slot: 'data', label: 'Data Dokter' },
   { slot: 'details', label: 'Detail', disabled: true },
   { slot: 'image', label: 'Unggah Foto', disabled: false },
   { slot: 'finish', label: 'Selesai', disabled: true }
])

const genderOptions : ComputedRef <any> = computed(() => [
   { label: 'Laki-laki', value: 'L' },
   { label: 'Perempuan', value: 'P' }
])
const provinceOptions : Ref <Utils.Province[]> = ref([])
const regencyOptions : Ref <Utils.Regency[]> = ref([])
const specialistOptions : Ref <any> = ref([
   { name: 'Loading...' }
])

const stateData : Ref <any> = ref({
   full_name: '',
   gender: '',
   email: '',
   phone_number: '',
   no_str: '',
   str_date: '',
   sip_date: '',
   start_experience: '',
   province_id: null,
   regency_id: null,
   tags: []
})

const stateSpecialist : Ref <any> = ref({
   slug: '',
   rate: ''
})

const stateEducation : Ref <any> = ref({
   education: '',
   graduation_year: ''
})

const stateMedicalFacility : Ref <any> = ref({
   name: '',
   province_id: null,
   regency_id: null
})

const validationSchemaData = yup.object({
   full_name: yup.string().required('Nama harus diisi'),
   gender: yup.string().required('Jenis kelamin harus diisi'),
   email: yup.string().required('Email harus diisi'),
   phone_number: yup.string().required('No. telepon harus diisi'),
   no_str: yup.string().required('No. STR harus diisi'),
   str_date: yup.string().required('Tanggal STR harus diisi'),
   sip_date: yup.string().required('Tanggal SIP harus diisi'),
   start_experience: yup.string().required('Start experience harus diisi'),
   province_id: yup.string().required('Provinsi harus diisi'),
   regency_id: yup.string().required('Kab/Kota harus diisi'),
   tags: yup.mixed().nullable()
})

const validationSchemaSpecialist = yup.object({
   slug: yup.string().required('Spesialis harus diisi'),
   rate: yup.number().required('Rate harus diisi')
})

const validationSchemaEducation = yup.object({
   education: yup.string().required('Nama universitas harus diisi'),
   graduation_year: yup.string().required('Tahun kelulusan harus diisi')
})

const validationSchemaMedicalFacility = yup.object({
   name: yup.string().required('Nama harus diisi'),
   province_id: yup.number().required('Provinsi harus diisi'),
   regency_id: yup.number().required('Kab/Kota harus diisi')
})

const image : Ref <any> = ref(null)
const croppedImage : Ref <any> = ref(null)
const imageFile : Ref <any> = ref(null)
const imageInput : Ref <any> = ref()
const cropper : Ref <any> = ref()
const isCropping : Ref <boolean> = ref(false)

onBeforeMount(async () => {
   await getProvinces()
      .then(resp => {
         provinceOptions.value = resp
      })
})

const fetchRegencies = async (provinceId: number) => {
   await getRegencies(provinceId)
      .then(resp => {
         regencyOptions.value = resp
      })
}

const onProvinceChange = async (provinceId: number) => {
   stateData.value.regency_id = null
   await fetchRegencies(provinceId)
}

const fetchSpecialist = async () => {
   if (specialistOptions.value.find((item: any) => item.name === 'Loading...')) {
      await getDoctorSpecialists()
         .then((resp) => {
            specialistOptions.value = resp
         })
   }
   return true
}

const submitData = async () => {
   loading.value = true
   await addDoctor(stateData.value)
      .then(resp => {
         doctor.value = resp
         tabs.value.forEach((item: any) => {
            if (item.disabled) item.disabled = false
         })
      })
      .then(() => {
         currentTab.value++
      })
      .finally(() => {
         loading.value = false
      })
}

const submitSpecialist = async (isEdit: boolean, data?: any) => {
   loading.value = true

   try {
      if (isEdit) {
         await updateDoctorSpecialist(data!.specialist_id, stateSpecialist.value)
            .then((resp) => {
               specialist.value.forEach((item: any, index: number) => {
                  if (item.specialist_id == resp.specialist_id) specialist.value[index] = resp
               })
            })
      } else {
         const payload : API.Payload.AddDoctorSpecialistPayload = {
            uuid: doctor.value!.uuid!,
            doctor_specialists: [ stateSpecialist.value ]
         }
         await addDoctorSpecialist(payload)
            .then((resp) => {
               resp.forEach((item: any) => {
                  specialist.value.push(item)
               })
            })
      }

      stateSpecialist.value = {
         slug: '',
         rate: ''
      }
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}

const deleteSpecialist = async (data: Model.DoctorSpecialist) => {
   await deleteDoctorSpecialist(data.specialist_id!)
      .then((resp) => {
         specialist.value = specialist.value.filter((item) => item.specialist_id !== data.specialist_id)
      })
}

const submitEducation = async (isEdit: boolean, data?: Model.DoctorEducation) => {
   loading.value = true

   try {
      if (isEdit) {
         await updateDoctorEducation(data!.id!, stateEducation.value)
            .then((resp) => {
               education.value.forEach((item, index: number) => {
                  if (item.id == resp.id) education.value[index] = resp
               })
            })
      } else {
         const payload : API.Payload.AddDoctorEducationPayload = {
            uuid: doctor.value!.uuid!,
            ...stateEducation.value,
         }
         await addDoctorEducation(payload)
            .then((resp) => {
               education.value.push(resp)
            })
      }
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}

const deleteEducation = async (data: Model.DoctorEducation) => {
   await deleteDoctorEducation(data.id!)
      .then((resp) => {
         education.value = education.value.filter((item) => item.id !== data.id)
      })
}

const submitMedicalFacility = async (isEdit: boolean, data?: Model.MedicalFacility) => {
   loading.value = true

   try {
      if (isEdit) {
         await updateDoctorMedicalFacility(data!.medical_facility_id!, stateMedicalFacility.value)
            .then((resp) => {
               medicalFacility.value.forEach((item, index: number) => {
                  if (item.medical_facility_id == resp.medical_facility_id) medicalFacility.value[index] = resp
               })
            })
      } else {
         const payload : API.Payload.AddDoctorMedicalFacilityPayload = {
            uuid: doctor.value!.uuid!,
            ...stateMedicalFacility.value
         }
         await addDoctorMedicalFacility(payload)
            .then((resp) => {
               medicalFacility.value.push(resp)
            })
      }
   } catch (error) {
      console.error(error)
   } finally {
      loading.value = false
   }
}

const deleteMedicalFacility = async (data: Model.MedicalFacility) => {
   await deleteDoctorMedicalFacility(data.medical_facility_id!)
      .then((resp) => {
         medicalFacility.value = medicalFacility.value.filter((item) => item.medical_facility_id !== data.medical_facility_id)
      })
}

const setImage = (event: any) => {
   const file = event.target!.files[0]
   if (file.type.indexOf('image/') < 0) {
      console.error('Not an image')
      return
   }

   if ((file.size / 1024) > 600) {
      console.error('Image must not larger than 600kb')
      return
   }

   if (typeof FileReader === 'function') {
      const reader = new FileReader()
      reader.onload = (event: any) => {
         image.value = event.target.result
         cropper.value.setCropBoxData({ width: '150px', height: '150px' })
         cropper.value.replace(event.target.result)
      }
      reader.readAsDataURL(file)
      isCropping.value = true
   }
}

const cropImage = async () => {
   croppedImage.value = cropper.value.getCroppedCanvas().toDataURL()

   cropper.value.getCroppedCanvas().toBlob(async (blob: any) => {
      let fileImg = new File([blob], "image.png")
      let exitLoop = false

      if ((fileImg.size / 1024) > 600) {
         while ((fileImg.size / 1024) > 600 || exitLoop === false) {
            await reduceFileRes(fileImg)
               .then((resp: any) => {
                  fileImg = resp
               })
               .catch((error: any) => {
                  exitLoop = true
                  console.error(error)
                  return
               })
         }
      } else {
         imageFile.value = fileImg
      }
   })

   isCropping.value = false
}

const reduceFileRes = async (fileImg: any) => {
   return new Promise((resolve, reject) => {
      const maxWidth = 600
      const maxHeight = 600
      const mimeType = 'image/png'
      const quality = 1
      let result

      const blobUrl = URL.createObjectURL(fileImg)
      const img = new Image()
      img.src = blobUrl

      img.onerror = function () {
         URL.revokeObjectURL(this.src)
         console.error('Cannot load image')
      }
      
      img.onload = function () {
         // @ts-ignore
         URL.revokeObjectURL(this.src)
         const canvas = document.createElement('canvas')
         canvas.width = maxWidth
         canvas.height = maxHeight

         const ctx = canvas.getContext('2d')
         ctx!.drawImage(img, 0, 0, maxWidth, maxHeight)
         canvas.toBlob((blob: any) => {
            result = new File([blob], 'image.png')
            imageFile.value = result
            resolve(result)
         }, mimeType, quality)
      }
   })
}

const cancelCrop = () => {
   image.value = null
   croppedImage.value = null
   imageFile.value = null
   isCropping.value = false
}

const uploadImage = async () => {
   await addDoctorImage(doctor.value!.uuid!, imageFile.value)
      .then((resp) => {
         doctor.value = resp
      })
}
</script>