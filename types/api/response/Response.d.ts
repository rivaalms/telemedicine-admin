declare namespace API {
   type Response <T> = {
      code: number
      success: boolean
      messages: string | null
      data: T
   }

   namespace Response {
      type LaravelPaginate <T> = {
         current_page: number
         data: T
         first_page_url: string | null
         last_page_url: string | null
         next_page_url: string | null
         from: number
         to: number
         total: number
         page: number
         per_page: number
      }

      type Error = {
         response?: {
            _data?: {
               messages?: string
            }
         }
      }
   }
}