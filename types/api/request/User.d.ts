declare namespace API.Request {
   namespace User {
      type TopUp = {
         uuid: string
         nominal: number
         channel: string
      }
   }
}