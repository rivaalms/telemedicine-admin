export async function searchPatient(payload: string | number) : Promise<Model.Patient> {
   const response = await $fetch <API.Response<Model.Patient>> (`patients-phonenumber-email`, {
      method: 'GET',
      query: {
         query: payload
      }
   })
   return response.data!
}