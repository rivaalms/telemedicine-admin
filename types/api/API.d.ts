declare namespace API {
   module Payload {
      interface ForgotPasswordByPhoneNumber {
         phone_number?: number | string
         password?: string
         password_confirmation?: string
      }
   }
}