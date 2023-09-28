declare namespace Model {
   type Emergency = {
      id?: number,
      emergency_type?: string
      map_lat?: string | null
      map_lng?: string | null
      created_at?: string
      status?: string
      pickup_location?: string | null
      soap?: {
         S?: string | null
         O?: string | null 
         A?: string | null
         P?: string | null
      }
      patient?: Model.Emergency.Patient
      request_by?: Model.User
      doctor?: Omit<Model.User, 'nik' | 'gender'>
      ambulance?: Model.Ambulance
      transaction?: Model.Transaction
   }

   module Emergency {
      type Patient = {
         patient_nik?: string | number
         patient_name?: string | null
         patient_gender?: string | null
         patient_telp?: string | number | null
      }
   }
}