declare namespace API.Request {
   namespace Doctor {
      type Specialist = {
         uuid: string
         doctor_specialists: Array <{
            slug: string
            rate: number
         }>
      }

      type Education = {
         uuid: string
         graduation_year: string
         education: string
      }

      type MedicalFacility = {
         uuid: string
         name: string
         province_id: number
         regency_id: number
      }

      type Schedule = {
         doctor_uuid: string
         day: string
         start_time: string
         end_time: string
         kuota: string
      }
   }
}