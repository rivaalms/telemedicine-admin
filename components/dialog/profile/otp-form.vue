<template>
<div class="grid gap-4">
   <div class="flex flex-col items-center gap-4">
      <p class="text-gray-500">
         Masukkan kode OTP yang kami kirimkan ke nomor telepon Anda
      </p>

      <v-otp-input
         ref="otpInput"
         v-model:value="otp"
         :num-inputs="6"
         separator="-"
         input-classes="otp-input"
         :should-auto-focus="true"
         input-type="letter-numeric"
         :is-disabled="loading"
         @on-complete="submit"
      ></v-otp-input>
   </div>

   <div class="flex justify-between gap-2 mt-6">
      <u-button
         variant="ghost"
         color="gray"
         icon="i-heroicons-arrow-uturn-left"
         :disabled="isActive"
         @click.stop="onResendOtp"
      >
         Kirim Ulang OTP {{ isActive ? `(${countdown})` : '' }}
      </u-button>

      <u-button
         color="emerald"
         icon="i-heroicons-check"
         :disabled="loading"
         @click.stop="submit"
      >
         Konfirmasi
      </u-button>
   </div>
</div>
</template>

<script setup lang="ts">
import VOtpInput from 'vue3-otp-input'
import { verifyOTP, resendOTP } from '@/utils/api/auth'

const store = useAppStore()
const authStore = useAuthStore()

const props = defineProps<{
   type: 'phone' | 'password',
   phoneNumber: string,
   hash?: string | null
}>()

const loading : Ref <boolean> = ref(false)
const otp : Ref <string> = ref('')
const otpInput : Ref <InstanceType <typeof VOtpInput> | null> = ref(null)

const countdown : Ref <number> = ref(60)
const { isActive, resume, pause } = useTimeoutPoll(() => handleCountdown(), 1000)

onBeforeMount(() => {
   resume()
})

const handleCountdown = () : void => {
   if (countdown.value > 0) countdown.value--
   else pause()
}

const onResendOtp = async () => {
   await resendOTP(props.phoneNumber)
      .then((resp) => {
         store.notify('info', 'Kode OTP berhasil dikirim ulang')
         countdown.value = 60
         resume()
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data.messages || error)
      })
}

const submit = async () => {
   loading.value = true

   const payload : API.Payload.VerifyOTPPayload = {
      hash: props.hash || null,
      is_type: useOtpType.find((item: any) => item.type === props.type)?.value!,
      phone_number: props.phoneNumber,
      ref_type: 'medicalfacility',
      verification_code: otp.value
   }

   await verifyOTP(payload)
      .then((resp) => {
         const notifyType = props.type === 'password' ? 'Kata sandi' : 'Nomor telepon'
         store.notify('success', `${notifyType} Anda berhasil diperbarui`)
         if (props.type === 'phone') authStore.user!.phone_number = props.phoneNumber
         store.clearDialog()
      })
      .catch((error: any) => {
         store.notify('error', error.response?._data?.messages || error)
      })
      .finally(() => {
         loading.value = false
      })
}
</script>

<style>
.otp-input {
   max-width: 40px;
   height: 40px;
   padding: 5px;
   margin: 0 10px;
   font-size: 20px;
   border-radius: 4px;
   border: 1px solid rgba(0, 0, 0, 0.3);
   text-align: center;
}
</style>