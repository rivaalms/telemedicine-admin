declare namespace Model {
   module Master {
      type DoctorsSpecialist = {
         name?: string | null
         slug?: string | null
         description?: string | null
         parent?: string | number | null
         image?: string | null
         order_number?: number | null
         tags?: any
      }

      type Advertisement = {
         title?: string | null
         slug?: string | null
         start_date?: string | null
         end_date?: string | null
         description?: string | null
         image?: string | null
      }

      type Voucher = {
         code?: string | number | null
         name?: string | null
         slug?: string | null
         start_date?: string | null
         end_date?: string | null
         transaction_type?: number | null
         type?: number | null
         nominal?: number | null
         quota?: number | null
         notes?: string | null
         status?: string | null
         specialist?: string | number | null
         specialist_name?: string | null
         experience?: string | number | null
         rules?: {
            medicine_category?: string | number | null
            medicine_classification?: string | number | null
            max_usage?: string | number | null
            users?: string | null
            image?: string | null
         }
      }
   }
}