declare namespace API {
   interface Response <T> {
      code?: number | string
      success?: boolean
      messages?: string | null
      data?: T
   }
   
   module Payload {
      interface Login {
         email: string
         password: string
      }
      
      interface ForgotPasswordByPhoneNumber {
         phone_number?: number | string
         password?: string
         password_confirmation?: string
      }
   }
}