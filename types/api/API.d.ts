declare namespace API {
   type Response <T> = {
      code?: number | string
      success?: boolean
      messages?: string | null
      data?: T
   }
   
   module Payload {
      type Login = {
         email: string
         password: string
      }
      
      type ForgotPasswordByPhoneNumber = {
         phone_number?: number | string
         password?: string
         password_confirmation?: string
      }

      type ReservationConsultationPayload = {
         status?: string | null
         start_date?: string | null
         end_date?: string | null
      }
   }
}