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

export async function getDoctorSchedules () : Promise <Model.PageDoctorSchedule[]> {
   const response = await $fetch <API.Response <Model.PageDoctorSchedule[]>> (`/doctor-schedules`, {
      method: 'GET'
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

export async function addDoctorSpecialist (payload: API.Payload.AddDoctorSpecialistPayload) : Promise <any> {
   const response = await $fetch <API.Response <any>> (`/doctor-specialists`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateDoctorSpecialist (specialistId: number, payload: Pick <Model.DoctorSpecialist, 'rate' | 'slug'>) : Promise <Model.DoctorSpecialist> {
   const response = await $fetch <API.Response <Model.DoctorSpecialist>> (`/doctor-specialists/${specialistId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteDoctorSpecialist (specialistId: number) : Promise <string> {
   const response = await $fetch <API.Response <string>> (`/doctor-specialists/${specialistId}`, {
      method: 'DELETE'
   })
   return response.messages!
}

export async function addDoctorEducation (payload: API.Payload.AddDoctorEducationPayload) : Promise <Model.DoctorEducation> {
   const response = await $fetch <API.Response <Model.DoctorEducation>> (`/doctor-educations`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateDoctorEducation (educationId: number, payload: Pick <Model.DoctorEducation, 'education' | 'graduation_year'>) : Promise <Model.DoctorEducation> {
   const response = await $fetch <API.Response <Model.DoctorEducation>> (`/doctor-educations/${educationId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteDoctorEducation (educationId: number) : Promise <boolean> {
   const response = await $fetch <void> (`/doctor-educations/${educationId}`, {
      method: 'DELETE'
   })
   return true
}