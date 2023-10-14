const ID_USER_PARSE = 'yuydgwcfe2783y8732djbhfcehj'
const DEVICE_ID = 'yuydgwcfe2783y8732djbhfcehj'

export async function login (payload: API.Payload.Login) : Promise <Model.Auth> {
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

export async function logout () : Promise <any> {
   const response = await $fetch <any> (`/auth/logout`, {
      method: 'POST'
   })
   return response
}

export async function forgotPasswordByPhoneNumber (payload: API.Payload.ForgotPasswordByPhoneNumber) : Promise <any> {
   const response = await $fetch <any> (`/forgot-password-by-phone`, {
      method: 'POST',
      body: payload
   })
   return response
}

export async function forgotPasswordByEmail (email: string) : Promise <any> {
   const response = await $fetch <any> (`/profile/reset-password-by-email`, {
      method: 'POST',
      body: {
         email
      }
   })
}

export async function updateEmail (payload: API.Payload.Login) : Promise <any> {
   const response = await $fetch <API.Response <any>> (`/profile/email`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function updatePhoneNumber (payload: { password: string, phone_number: string }) : Promise <any> {
   const response = await $fetch <API.Response <any>> (`/profile/phone-number`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function updatePassword (payload:  UpdatePassword) : Promise <any> {
   const response = await $fetch <API.Response <any>> (`/profile/password`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

type UpdatePassword = {
   old_password: string
   password: string
   password_confirmation: string
   phone_number: string
}