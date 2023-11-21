<template>
<main class="h-[calc(100dvh)] flex items-center justify-center">
   <u-card
      v-if="!isActivated"
      class="overflow-visible w-1/4"
   >
      <template #header>
         <div class="flex flex-col">
            <p class="font-semibold">{{ store.getTitle }}</p>
            <p class="text-sm">Silakan membuat kata sandi</p>
         </div>
      </template>

      <u-form
         :schema="validationSchema"
         :state="state"
         :validate-on="['submit']"
         @submit.prevent="submit"
      >
         <div class="grid gap-4">
            <u-form-group
               label="Kata Sandi"
               name="password"
               required
            >
               <u-input
                  v-model="state.password"
                  :disabled="loading"
                  :type="showPassword ? 'text' : 'password'"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="Konfirmasi Kata Sandi"
               name="confirm_password"
               required
            >
               <u-input
                  v-model="state.confirm_password"
                  :disabled="loading"
                  :type="showPassword ? 'text' : 'password'"
               ></u-input>
            </u-form-group>
         </div>

         <div class="flex items-center justify-between mt-6">
            <u-checkbox
               v-model="showPassword"
               label="Tampilkan kata sandi"
            ></u-checkbox>
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

   <u-card v-else class="overflow-visible w-1/4">
      <template #header>
         <p class="font-semibold">
            Aktivasi Akun Berhasil
         </p>
      </template>

      <p>Selamat! Akun Anda telah aktif.</p>
      <div class="flex justify-center mt-6">
         <u-button
            icon="i-heroicons-arrow-uturn-left"
            @click.stop="navigateTo('/login')"
         >
            Kembali ke halaman login
         </u-button>
      </div>
   </u-card>
</main>
</template>

<script setup lang="ts">
import { activateAccount, checkAccountActivation } from '@/utils/api/auth'
import * as yup from 'yup'

definePageMeta({
   layout: false
})

const store = useAppStore()
store.title = 'Aktivasi Akun'
useHead({
   title: store.getTitle
})

const isActivated : Ref <boolean> = ref(false)
const uuid: Ref <string | null> = ref(null)
const showPassword : Ref <boolean> = ref(false)

const searchParams : ComputedRef <string> = computed(() => useRequestURL().searchParams.get('t') || '')
const loading : Ref <boolean> = ref(false)

const state = ref({
   password: '',
   confirm_password: ''
})

const validationSchema = yup.object({
   password: yup.string().min(8, 'Kata sandi harus berisi minimal ${min} karakter').required('Kata sandi harus diisi'),
   confirm_password: yup.string().test('password', 'Konfirmasi kata sandi tidak sama', (val, ctx) => val === state.value.password)
})

onBeforeMount(async () => {
   await checkActivated()
})

const submit = async () => {
   loading.value = true
   await activateAccount(uuid.value as string, state.value.password)
      .then((resp: any) => {
         if (resp.data.success) {
            isActivated.value = true
         }
      })
      .catch((e: any) => store.notify('error', e.response?._data?.messages || e.response?.data?.messages || e))
      .finally(() => loading.value = false)
}

const checkActivated = async () => {
   if (searchParams.value.length < 37) navigateTo('/errors/404')

   await checkAccountActivation(searchParams.value)
      .then(resp => {
         if (resp.messages === 'User Actived') isActivated.value = true
      })
      .catch((e: any) => {
         const message = e.response?.data?.messages || e.response?._data?.messages
         if (message === 'The payload is invalid.') navigateTo('/errors/404')
         else uuid.value = e.response.data.data.uuid
      })
}
</script>