const ID_USER_PARSE = 'yuydgwcfe2783y8732djbhfcehj'
const DEVICE_ID = 'yuydgwcfe2783y8732djbhfcehj'

namespace Response.Auth {
   export type UpdateEmail = Omit <Model.Auth, 'AUTH-TOKEN'>
   export type OTP = Omit <Model.Auth, 'AUTH-TOKEN'> & {
      token: string
   }
}

export async function login (payload: API.Request.Auth.Login) : Promise <Model.Auth> {
   const response = await $fetch <API.Response<Model.Auth>> (`/auth/login`, {
      method: 'POST',
      body: payload,
      headers: {
         'ID-USER-PARSE': ID_USER_PARSE,
         'device-id': DEVICE_ID
      }
   })
   return response.data!
}

export async function logout () : Promise <boolean> {
   await $fetch <API.Response <[]>> (`/auth/logout`, {
      method: 'POST'
   })
   return true
}

export async function forgotPasswordByPhoneNumber (payload: API.Request.Auth.ForgotPasswordByPhone) : Promise <string> {
   const response = await $fetch <API.Response <string>> (`/forgot-password-by-phone`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function forgotPasswordByEmail (email: string) : Promise <boolean> {
   const response = await $fetch <API.Response <boolean>> (`/profile/reset-password-by-email`, {
      method: 'POST',
      body: {
         email
      }
   })
   return response.data!
}

export async function updateEmail (payload: API.Request.Auth.UpdateEmail) : Promise <Response.Auth.UpdateEmail> {
   const response = await $fetch <API.Response <Response.Auth.UpdateEmail>> (`/profile/email`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function updatePhoneNumber (payload: { password: string, phone_number: string }) : Promise <boolean> {
   const response = await $fetch <API.Response <boolean>> (`/profile/phone-number`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function updatePassword (payload: API.Request.Auth.UpdatePassword) : Promise <string> {
   const response = await $fetch <API.Response <string>> (`/profile/password`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function verifyOTP (payload: API.Request.Auth.OTP) : Promise <Response.Auth.OTP> {
   const response = await $fetch <API.Response <Response.Auth.OTP>> (`/verify-otp`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function resendOTP (phoneNumber: string) : Promise <Model.User> {
   const response = await $fetch <API.Response <Model.User>> (`/auth/resend-otp`, {
      method: 'POST',
      body: {
         phone_number: phoneNumber
      }
   })
   return response.data!
}

export async function activateAccount (uuid: string, password: string) {
   const response = await $fetch <API.Response<unknown>> (`/auth/activation/${uuid}`, {
      method: 'POST',
      body: {
         password
      }
   })
   return response
}

export async function checkAccountActivation (endpoint: string) {
   const response = await $fetch <API.Response<unknown>> (`/auth/verification/${endpoint}`, {
      method: 'GET'
   })
   return response
}