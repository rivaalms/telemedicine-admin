const config = useRuntimeConfig().public

export async function getProvinces () : Promise <Utils.Province[]> {
   const response = await $fetch <API.Response <Utils.Province[]>> (`/provinces`, {
      method: 'GET'
   })
   return response.data!
}

export async function getRegencies (provinceId: number) : Promise <Utils.Regency[]> {
   const response = await $fetch <API.Response <Utils.Regency[]>> (`regencies-province/${provinceId}`, {
      method: 'GET'
   })
   return response.data!
}

export async function getDoctorSpecialists () : Promise <Utils.Specialist[]> {
   const response = await $fetch <API.Response <Utils.Specialist[]>> (`/specialists`, {
      method: 'GET',
      headers: {
         'faskes-id': config.faskesId
      }
   })
   return response.data!
}