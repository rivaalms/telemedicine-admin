declare namespace Model {
   type Auth = {
      "AUTH-TOKEN"?: string
      uuid?: string
      name?: string
      email?: string
      phone_number?: string
      device_id?: string | null
      mobile_id?: string | null
      profile_picture?: string | null
      ref_type?: string | null
      pin?: boolean
      medical_facility?: any
      role?: {
         id?: string | number
         name?: string
      } | null
   }

   type User = {
      uuid?: string
      full_name?: string
      gender?: string | null
      email?: string | null
      phone_number?: string | null
      device_id?: string | null
      mobile_id?: string | null
      nik?: string | null
   }

   type Patient = {
      patient_nik?: string | number
      patient_name?: string | null
      patient_gender?: string | null
      patient_telp?: string | number | null
   }
}