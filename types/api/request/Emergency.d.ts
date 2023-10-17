declare namespace API.Request {
   namespace Emergency {
      type Report = {
         start_date?: string | null
         end_date?: string | null
         status: string
         latest: number
         page?: number
      }
   }
}