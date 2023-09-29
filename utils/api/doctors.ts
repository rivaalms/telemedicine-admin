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