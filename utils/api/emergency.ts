export async function get () : Promise<API.Response<any>> {
   const response = await $fetch <any> (`/emergency`, {
      method: 'GET',
   })
   return response.data
}