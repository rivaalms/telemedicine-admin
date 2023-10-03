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
   }
}