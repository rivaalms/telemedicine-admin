declare namespace Model {
   interface User {
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
}