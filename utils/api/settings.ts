const FASKES_ID = useRuntimeConfig().public.faskesId

export async function get () : Promise <Model.Setting[]> {
   const response = await $fetch <API.Response <Model.Setting[]>> (`/parameter-medical-facility`, {
      method: 'GET',
      headers: {
         'faskes-id': FASKES_ID
      },
   })
   return response.data!
}