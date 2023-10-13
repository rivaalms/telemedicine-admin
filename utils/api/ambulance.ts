export async function get () : Promise <Model.Ambulance[]> {
   const response = await $fetch <API.Response <Model.Ambulance[]>> (`/ambulances`, {
      method: 'GET'
   })
   return response.data!
}

export async function createAmbulance (payload: Model.Ambulance) : Promise <Model.Ambulance> {
   const response = await $fetch <API.Response <Model.Ambulance>> (`/ambulances`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateAmbulance (ambulanceId: number, payload: Model.Ambulance) : Promise <Model.Ambulance> {
   const response = await $fetch <API.Response <Model.Ambulance>> (`/ambulances/${ambulanceId}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteAmbulance (ambulanceId: number) : Promise <boolean> {
   const response = await $fetch <API.Response <void>> (`/ambulances/${ambulanceId}`, {
      method: 'DELETE'
   })
   return true
}