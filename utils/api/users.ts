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