export async function get () : Promise <Model.Emergency[]> {
   const response = await $fetch <API.Response<Model.Emergency[]>> (`/emergency`, {
      method: 'GET',
   })
   return response.data!
}