declare namespace Model {
   namespace LogsReport {
      type UserActivity = {
         objectId?: string | null
         uid?: string | null
         email?: string | null
         user_type?: string | null
         activity?: string | null
         updated_at?: Utility.LogsReport.UpdatedAt | null
         medical_facility_id?: number | null
         createdAt?: string | null
         updatedAt?: string | null
      }

      type Consultation = {
         objectId?: string | null
         consultation_id?: number | null
         patient_email?: string | null
         doctor_email?: string | null
         last_updated?: string | null
         status?: string | null
         updated_at?: Utility.LogsReport.UpdatedAt | null
         medical_facility_id?: number | null
         createdAt?: string | null
         updatedAt?: string | null
      }

      type Emergency = {
         objectId?: string | null
         patient_email?: string | null
         emergency_type?: string | null
         status?: string | null
         createdAt?: string | null
         updatedAt?: string | null
      }
   }
}