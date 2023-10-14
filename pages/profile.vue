<template>
<u-card>
   <div class="container mx-auto">
      <div class="grid grid-cols-5 gap-4 items-start">
         <div class="flex justify-center">
            <img
               :src="user.profile_picture || '/img/profile.svg'"
               alt="Profile"
               class="rounded-full h-[14rem]"
            >
         </div>

         <div class="col-span-3 flex justify-center">
            <div>
               <div class="mb-4">
                  <p class="text-xl font-semibold">
                     {{ user.name }}
                  </p>
                  <p class="text-gray-500">
                     {{ user.email }}
                  </p>
               </div>
   
               <div class="grid grid-cols-2 gap-12">
                  <div class="text-sm">
                     <p class="text-gray-500">
                        No. Telepon
                     </p>
                     <p class="tracking-wide">
                        {{ user.phone_number }}
                     </p>
                  </div>
   
                  <div class="text-sm">
                     <p class="text-gray-500">
                        Role
                     </p>
                     <p class="tracking-wide">
                        {{ user.role?.name }}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div class="grid gap-2">
            <div>
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-at-symbol"
                  class="w-full"
                  @click.stop="store.showDialog('edit-email-profile', 'Ubah Alamat Email', user)"
               >
                  Ubah Alamat Email
               </u-button>
            </div>

            <div>
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-phone"
                  class="w-full"
                  @click.stop="store.showDialog('edit-phone-profile', 'Ubah Nomor Telepon', user)"
               >
                  Ubah Nomor Telepon
               </u-button>
            </div>

            <div>
               <u-button
                  variant="ghost"
                  color="sky"
                  icon="i-heroicons-lock-closed"
                  class="w-full"
                  @click.stop="store.showDialog('edit-password-profile', 'Ubah Kata Sandi', user)"
               >
                  Ubah Kata Sandi
               </u-button>
            </div>

            <hr>

            <div>
               <u-button
                  variant="ghost"
                  color="red"
                  icon="i-heroicons-arrow-left-on-rectangle"
                  class="w-full"
               >
                  Keluar
               </u-button>
            </div>
         </div>
      </div>
   </div>
</u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
store.title = 'Profil Pengguna'
useHead({ title: store.getTitle })

const user : ComputedRef <Model.Auth> = computed(() => useAuthStore().getUser!)
</script>