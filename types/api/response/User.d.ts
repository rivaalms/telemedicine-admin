declare namespace API.Response {
   namespace User {
      type TopUp = {
         TransactionID: string
         TransactionType: string
         TransferStatus: string
         ReceiverGLAccountNo: string | number | null
         ReceiverName: string
         Amount: number
         Action: {
            REDIRECT: {
               Url?: string | null
            } | null
            QR: {
               Url?: string | null
            } | null
         } | null
      }
   }

   namespace Auth {
      type OTP = {
         token: string
         uuid: string
         name: string
         email: string
         phone_number: string
         device_id: string
         user_type: string
         pin: boolean
         nik: string | null
         profile_picture: string | null
      }
   }

   namespace Doctor {
      type Schedule = Pick <Model.Doctor, 'uuid' | 'full_name'> & {
         schedules: Omit <Model.Doctor.Schedule, 'doctors_id' | 'updated_at' | 'created_at'>[]
      }
   }
}