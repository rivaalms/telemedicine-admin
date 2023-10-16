declare namespace Model {
   namespace Report {
      type Consultation = {
         transaction_number?: string | null
         trx_date?: string | null
         started_at?: string | null
         finished_at?: string | null
         total?: number | null
         status?: string | null
         patient?: Pick <Model.Patient, 'nik' | 'no_kk' | 'dob' | 'uuid' | 'name'>
         doctor?: Pick <Model.Doctor, 'uuid' | 'name'>
      }

      type Medicine = {
         order_date?: string | null
         voucher_amount?: number | null
         delivery_amount?: number | null
         medicine_amount?: number | null
         total?: number | null
         order_detail?: [
            {
               medicine_name?: string | null
               qty?: number | null
               unit?: string | null
               price?: number | null
            }
         ] | null
         customer?: Pick <Model.Patient, 'full_name' | 'email' | 'phone_number'> | null
         transaction?: Model.Transaction
      }

      type Emergency = Pick <Model.Emergency, 'id' | 'map_lat' | 'map_lng' | 'created_at' | 'status' | 'pickup_location' | 'soap' | 'ambulance'> & {
         patient?: {
            patient_nik?: string | null
            patient_name?: string | null
            patient_gender?: "P" | "L" | null
            patient_telp?: string | null
         }
         request_by?: Pick <Model.User, 'uuid' | 'full_name' | 'gender' | 'email' | 'phone_number' | 'device_id' | 'mobile_id' | 'nik'>
         doctor?: Pick <Model.Doctor, 'uuid' | 'full_name' | 'email' | 'phone_number' | 'device_id' | 'mobile_id'>
         ambulance?: Model.Ambulance
         transaction?: Model.Transaction
      }

      type Officer = {
         employee_no?: string | null
         name?: string | null
         gender?: "L" | "P" | null
         trans_summary?: number | null
      }

      type Doctor = Pick <Model.Doctor, 'no_str' | 'name' | 'gender'> & {
         trans_summary?: number | null
      }
   }
}