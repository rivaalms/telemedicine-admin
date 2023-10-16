export async function get () : Promise<Model.Doctor[]> {
   const response = await $fetch <API.Response<Model.Doctor[]>> (`doctors-medical-facility`, {
      method: 'GET'
   })
   return response.data!
}

export async function getByStr (noStr: string | number) : Promise <Model.Doctor> {
   const response = await $fetch <API.Response<Model.Doctor>> (`doctors-nostr/${noStr}`, {
      method: 'GET'
   })
   return response.data!
}

export async function getDoctorSchedules () : Promise <API.Response.Doctor.Schedule[]> {
   const response = await $fetch <API.Response <API.Response.Doctor.Schedule[]>> (`/doctor-schedules`, {
      method: 'GET'
   })
   return response.data!
}

export async function addDoctor (paylaod: Model.Doctor) : Promise <Model.Doctor> {
   const response = await $fetch <API.Response <Model.Doctor>> (`/doctors`, {
      method: 'POST',
      body: paylaod
   })
   return response.data!
}

export async function updateDoctor (payload: Model.Doctor) : Promise <Model.Doctor> {
   const response = await $fetch <API.Response <Model.Doctor>> (`/doctors`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function addDoctorSpecialist (payload: API.Request.Doctor.Specialist) : Promise <any> {
   const response = await $fetch <API.Response <any>> (`/doctor-specialists`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateDoctorSpecialist (specialistId: number, payload: Pick <Model.Doctor.Specialist, 'rate' | 'slug'>) : Promise <Model.Doctor.Specialist> {
   const response = await $fetch <API.Response <Model.Doctor.Specialist>> (`/doctor-specialists/${specialistId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteDoctorSpecialist (specialistId: number) : Promise <boolean> {
   await $fetch <API.Response <boolean>> (`/doctor-specialists/${specialistId}`, {
      method: 'DELETE'
   })
   return true
}

export async function addDoctorEducation (payload: API.Request.Doctor.Education) : Promise <Model.Doctor.Education> {
   const response = await $fetch <API.Response <Model.Doctor.Education>> (`/doctor-educations`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateDoctorEducation (educationId: number, payload: Pick <API.Request.Doctor.Education, 'education' | 'graduation_year'>) : Promise <Model.Doctor.Education> {
   const response = await $fetch <API.Response <Model.Doctor.Education>> (`/doctor-educations/${educationId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteDoctorEducation (educationId: number) : Promise <boolean> {
   await $fetch <void> (`/doctor-educations/${educationId}`, {
      method: 'DELETE'
   })
   return true
}

export async function addDoctorMedicalFacility (payload : API.Request.Doctor.MedicalFacility) : Promise <Model.Doctor.MedicalFacility> {
   const response = await $fetch <API.Response <Model.Doctor.MedicalFacility>> (`doctor-facilities`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateDoctorMedicalFacility (medicalFacilityId: number, payload: Omit <API.Request.Doctor.MedicalFacility, 'uuid'>) : Promise <Model.Doctor.MedicalFacility> {
   const response = await $fetch <API.Response <Model.Doctor.MedicalFacility>> (`/doctor-facilities/${medicalFacilityId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteDoctorMedicalFacility (medicalFacilityId: number) : Promise <boolean> {
   await $fetch <void> (`/doctor-facilities/${medicalFacilityId}`, {
      method: 'DELETE'
   })
   return true
}

export async function addDoctorSchedule (payload: API.Request.Doctor.Schedule) : Promise <Model.Doctor.Schedule> {
   const response = await $fetch <API.Response <Model.Doctor.Schedule>> (`/doctor-schedules`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateDoctorSchedule (scheduleId: number, payload: API.Request.Doctor.Schedule) : Promise <Model.Doctor.Schedule> {
   const response = await $fetch <API.Response <Model.Doctor.Schedule>> (`/doctor-schedules/${scheduleId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function addDoctorImage (uuid: string, image: Blob) : Promise <Model.Doctor> {
   const payload = new FormData()
   payload.append('image', image)

   const response = await $fetch <API.Response <Model.Doctor>> (`/doctors/${uuid}/image`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}