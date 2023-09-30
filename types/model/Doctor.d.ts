declare namespace Model {
   type Doctor = {
      uuid?: string
      name?: string
      full_name?: string
      email?: string | null
      phone_number?: number | string
      profile_picture?: string | null
      gender?: string | null
      blocked_at?: string | null
      blocked_reason?: string | null
      banned_at?: string | null
      banned_reason?: string | null
      status?: string | null
      device_id?: string | null
      mobile_id?: string | null
      no_str?: string
      str_date?: string | null
      sip_date?: string | null
      province_id?: number | null
      province_name?: string | null
      regency_id?: number | null
      regency_name?: string | null
      specialist_slug?: string | null
      specialist?: string
      start_experience?: string | null
      experience?: string | null
      rates?: number | null
      educations?: Model.DoctorEducation[] | null
      facilities?: Model.MedicalFacility[] | null
      str_file?: any,
      mou_file?: any,
      sip_file?: any,
      cv_file?: any,
      tags?: any,
      doctor_specialists?: Model.DoctorSpecialist[] | null
      doctor_schedules?: Model.DoctorSchedule[] | null
      created_at?: string | null
   }

   type DoctorEducation = {
      id?: number | null
      doctor_id?: number | null
      education?: string | number | null
      graduation_year?: string | number | null
      created_at?: string | null
      updated_at?: string | null
   }

   type MedicalFacility = {
      id?: string | null
      doctor_id?: string | number | null
      medical_facility_id?: number | null
      name?: string | null
      province_id?: number | null
      regency_id?: number | null
      max_service_time?: string | number | null
      max_quota?: string | number | null
      created_at?: string | null
      updated_at?: string | null
      province_name?: string | null
      regency_name?: string | null
   }

   type DoctorSpecialist = {
      doctor_specialist_id?: number | null
      slug?: string | null
      specialist?: string | null
      rate?: number | string | null
   }

   type DoctorSchedule = {
      id?: number | null
      day?: number | string | null
      start_time?: string | null
      end_time?: string | null
      kuota?: string | number | null
   }

   type PageDoctorSchedule = Pick <Model.Doctor, 'uuid' | 'full_name'> & {
      schedules?: DoctorSchedule[]
   }
}