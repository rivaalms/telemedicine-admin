declare namespace Utils {
   type Province = {
      id: number
      province_name: string
      name?: string
      created_at?: string | null
      updated_at?: string | null
   }

   type Regency = {
      id: number
      province_id: number
      regency_name: string
      name?: string
      created_at?: string | null
      updated_at?: string | null
   }

   type Specialist = {
      name: string
      slug: string
      description?: string | null
      parent?: any
      image?: string | null
      order_number?: number
      tags?: any[]
   }
}