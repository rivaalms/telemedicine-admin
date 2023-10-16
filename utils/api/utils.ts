const config = useRuntimeConfig().public

export async function getProvinces () : Promise <API.Response.Province[]> {
   const response = await $fetch <API.Response <API.Response.Province[]>> (`/provinces`, {
      method: 'GET'
   })
   return response.data!
}

export async function getRegencies (provinceId: number) : Promise <API.Response.Regency[]> {
   const response = await $fetch <API.Response <API.Response.Regency[]>> (`regencies-province/${provinceId}`, {
      method: 'GET'
   })
   return response.data!
}

export async function getMedicalFacilities () : Promise <Model.Doctor.MedicalFacility[]> {
   const response = await $fetch <API.Response <Model.Doctor.MedicalFacility[]>> (`/medical-facilities`, {
      method: 'GET'
   })
   return response.data!
}

export async function getRoles () : Promise <Utility.User.Role[]> {
   const response = await $fetch <API.Response <Utility.User.Role[]>> (`/roles`, {
      method: 'GET'
   })
   return response.data!
}