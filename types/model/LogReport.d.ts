declare namespace Model {
   module LogsReport {
      type UserActivity = {
         objectId?: string | null
         uid?: string | null
         email?: string | null
         user_type?: string | null
         activity?: string | null
         updated_at?: {
            __type?: string | null
            iso?: string | null
         } | null
         medical_facility_id?: number | null
         createdAt?: string | null
         updatedAt?: string | null
      }
   }
}