declare namespace Utils {
   type Province = {
      id: number
      province_name: string
      created_at?: string | null
      updated_at?: string | null
   }

   type Regency = {
      id: number
      province_id: number
      regency_name: string
      created_at?: string | null
      updated_at?: string | null
   }
}