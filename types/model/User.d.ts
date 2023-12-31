declare namespace Model {
   type User = {
      uuid?: string
      full_name?: string | null
      gender?: string | null
      email?: string | null
      email_tmp?: string | null
      phone_number?: string | null
      phone_number_tmp?: string | null
      profile_picture?: string | null
      device_id?: string | null
      mobile_id?: string | null
      nik?: string | null
      parse?: string | number | null
      reset?: string | null
      registered_at?: string | null
      email_verified_at?: string | null
      activation_code?: string | number | null
      activated_at?: string | null
      balance?: string | number | null
      ref_type?: string | null
      ref_id?: number | null
      blocked_at?: string | null
      blocked_reason?: string | null
      banned_at?: string | null
      banned_reason?: string | null
      map_lat?: string | number | null
      map_lng?: string | number | null
      pin?: number | string | null
      last_activity?: string | null
      status?: string | null
      note?: string | null
      created_at?: string | null
      updated_at?: string | null
      last_token?: string | null
      role_id?: number | null
   }

   type Officer = Pick <User, 'uuid' | 'full_name' | 'email' | 'phone_number' | 'created_at' | 'gender'> & {
      employee_no?: string | number | null
      position?: string | null
   }

   type Nurse = Pick <User, 'uuid' | 'full_name' | 'email' | 'phone_number' | 'status' | 'gender' | 'created_at' | 'updated_at'>
}