declare namespace API {
   type Response <T> = {
      code?: number | string
      success?: boolean
      messages?: string | null
      data?: T
   }

   type ParseResponse <T> = {
      results: T
      count?: number
   }

   type LaravelPaginationResponse <T> = {
      current_page: number
      data: T
      first_page_url: string | null
      from: number
      last_page: number
      last_page_url: string | null
      next_page_url: string | null
      path: string | null
      per_page: number
      to: number
      total: number
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

      type ConsultationReportPayload = {
         status: string
         start_date: string
         end_date: string
      }

      type DateRangePayload = {
         start_date: string
         end_date: string
      }
   }
}