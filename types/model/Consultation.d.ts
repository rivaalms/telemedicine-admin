declare namespace Model {
   type Consultation = {
      id?: number | null
      started_at?: string | null
      finished_at?: string | null
      status?: string | null
   }
   
   type ReservationConsultation = {
      code?: string | null
      reservation_date?: string | null
      reservation_time?: string | null
      status?: string | null
      payment_url?: string | null
      patient?: Pick <Model.Patient, 'nik' | 'uuid' | 'name' | 'email' | 'phone_number' | 'device_id' | 'mobile_id'>
      doctor?: Pick <Model.Doctor, 'uuid' | 'name' | 'email' | 'device_id' | 'mobile_id' | 'profile_picture'> & {
         specialist_object?: {
            name?: string | null
            slug?: string | null
            description?: string | null
            parent?: string | null
            image?: string | null
            order_number?: number | null
            tags?: any
         }
      }
      consultation: Model.Consultation
   }
}