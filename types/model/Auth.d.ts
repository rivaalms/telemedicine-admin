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
      faskes_id?: string | null 
      medical_facility?: any
      role?: Utils.Role | null
   }
}