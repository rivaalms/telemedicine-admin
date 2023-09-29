export async function getAdmin () : Promise <Model.User[]> {
   const response = await $fetch <API.Response <Model.User[]>> (`/users`, {
      method: 'GET'
   })
   return response.data!
}