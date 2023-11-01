export type CreatePayload = Omit <Model.MedicalFacility, 'image' | 'distances' | 'regency' | 'province' | 'id'> & { base_color: string | null }

export async function get () : Promise <Model.MedicalFacility[]> {
   const response = await $fetch <API.Response <Model.MedicalFacility[]>> (`/medical-facilities`, {
      method: 'GET'
   })
   return response.data!
}

export async function create (payload: CreatePayload) : Promise <Model.MedicalFacility> {
   const response = await $fetch <API.Response <Model.MedicalFacility>> (`/medical-facilities`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}