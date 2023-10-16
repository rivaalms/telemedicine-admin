declare namespace Utility {
   type DateRange = {
      start_date?: string | null
      end_date?: string | null
   }

   type TableHeader = {
      key: string
      label?: string
   }

   namespace LogsReport {
      type UpdatedAt = {
         __type?: string | null
         iso?: string | null
      }
   }

   namespace Patient {
      type Address = {
         address_type?: string
         address?: string
         map_lat?: string | null
         map_lng?: string | null
         note?: string | null
      }
   }

   namespace User {
      type Role = {
         id: number
         name: string
      }
   }

   namespace Dashboard {
      type MonthlyData = {
         [monthDigit: string]: {
            month: string
            total?: number
            rejected?: string | number | null
            finished?: string | number | null
            notAnswered?: string | number | null
         }
      }

      type ConsultationSummaryByDoctor = {
         full_name: string | null
         total: number | null
      }
   
      type ConsultationSummaryBySpecialist = {
         specialist: string | null
         total: number | null
      }
   }
}