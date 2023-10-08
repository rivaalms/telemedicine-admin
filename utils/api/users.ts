export async function getAdmin () : Promise <Model.User[]> {
   const response = await $fetch <API.Response <Model.User[]>> (`/users`, {
      method: 'GET'
   })
   return response.data!
}

export async function getOfficers () : Promise <Model.Officer[]> {
   const response = await $fetch <API.Response <Model.Officer[]>> (`/officers`, {
      method: 'GET'
   })
   return response.data!
}

export async function getNurses () : Promise <Model.Nurse[]> {
   const response = await $fetch <API.Response <Model.Nurse[]>> (`/nurses`, {
      method: 'GET'
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

export async function activateUser (uuid: string) : Promise <string> {
   const response = await $fetch <API.Response <[]>> (`/auth/active/${uuid}`, {
      method: 'POST'
   })
   return response.messages!
}