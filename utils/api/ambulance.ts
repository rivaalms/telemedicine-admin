export async function get () : Promise <Model.Ambulance[]> {
   const response = await $fetch <API.Response <Model.Ambulance[]>> (`/ambulances`, {
      method: 'GET'
   })
   return response.data!
}