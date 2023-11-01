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

export async function update (id: number, payload: CreatePayload) : Promise <Model.MedicalFacility> {
   const response = await $fetch <API.Response <Model.MedicalFacility>> (`/medical-facilities/${id}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function deleteMedicalFacility (id: number) : Promise <boolean> {
   await $fetch <void> (`/medical-facilities/${id}`, {
      method: 'DELETE'
   })
   return true
}

export async function updateImage (id: number, image: Blob) : Promise <Model.MedicalFacility> {
   const payload = new FormData()
   payload.append('image', image)

   const response = await $fetch <API.Response <Model.MedicalFacility>> (`/medical-facilities/${id}/image`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}