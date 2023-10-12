export async function getAdmin () : Promise <Model.User[]> {
   const response = await $fetch <API.Response <Model.User[]>> (`/users`, {
      method: 'GET'
   })
   return response.data!
}

export async function addAdmin (payload: Model.User) : Promise <Model.User> {
   const response = await $fetch <API.Response <Model.User>> (`/users`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function getOfficers () : Promise <Model.Officer[]> {
   const response = await $fetch <API.Response <Model.Officer[]>> (`/officers`, {
      method: 'GET'
   })
   return response.data!
}

export async function addOfficer (payload: Model.Officer) : Promise <Model.Officer> {
   const response = await $fetch <API.Response <Model.Officer>> (`/officers`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function getNurses () : Promise <Model.Nurse[]> {
   const response = await $fetch <API.Response <Model.Nurse[]>> (`/nurses`, {
      method: 'GET'
   })
   return response.data!
}

export async function addNurse (payload: Model.Nurse) : Promise <Model.Nurse> {
   const response = await $fetch <API.Response <Model.Nurse>> (`/nurses`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function banUser (reason: string, uuid: string) : Promise <Model.User> {
   const response = await $fetch <API.Response <Model.User>> (`/users-banned/${uuid}`, {
      method: 'PUT',
      body: {
         banned_reason: reason
      }
   })
   return response.data!
}

export async function unbanUser (uuid: string) : Promise <string> {
   const response = await $fetch <API.Response <[]>> (`/auth/active/${uuid}`, {
      method: 'POST'
   })
   return response.messages!
}

export async function topUpUser (payload: API.Payload.TopUpPayload) : Promise <Utils.TopUp> {
   const response = await $fetch <API.Response <Utils.TopUp>> (`/top-up`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function activateUser (uuid: string) : Promise <string> {
   const response = await $fetch <API.Response <null>> (`/users/status/${uuid}/active`, {
      method: 'PUT'
   })
   return response.messages!
}

export async function deactivateUser (uuid: string, note: string) : Promise <string> {
   const response = await $fetch <API.Response <null>> (`/users/status/${uuid}/inactive`, {
      method: 'PUT',
      body: {
         note
      }
   })
   return response.messages!
}