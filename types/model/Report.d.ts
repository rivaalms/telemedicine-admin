declare namespace Model {
   module Report {
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
         transaction?: {
            transaction_number?: string | null
            transaction_date?: string | null
            payment_status?: string | null
         }
      }
   }
}