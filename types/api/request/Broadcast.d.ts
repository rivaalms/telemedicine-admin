declare namespace API.Request {
   type Broadcast = {
      to?: string | null
      app?: string | null
      title?: string | null
      body?: string | null
      start_date?: string | null
      end_date?: string | null
      content?: string | null
      notification_type?: string | null
   }
}