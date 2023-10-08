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