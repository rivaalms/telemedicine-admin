const config = useRuntimeConfig().public

export async function getSpecialists () : Promise <Model.Master.DoctorsSpecialist[]> {
   const response = await $fetch <API.Response <Model.Master.DoctorsSpecialist[]>> (`/specialists`, {
      method: 'GET',
      headers: {
         'faskes-id': config.faskesId
      }
   })
   return response.data!
}

export async function createSpecialist (payload: Model.Master.DoctorsSpecialist) : Promise <Model.Master.DoctorsSpecialist> {
   const response = await $fetch <API.Response <Model.Master.DoctorsSpecialist>> (`/specialists`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateSpecialist (slug: string, payload: Model.Master.DoctorsSpecialist) : Promise <Model.Master.DoctorsSpecialist> {
   const response = await $fetch <API.Response <Model.Master.DoctorsSpecialist>> (`/specialists/${slug}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}

export async function updateSpecialistImage (slug: string, image: any) : Promise <Model.Master.DoctorsSpecialist> {
   const payload = new FormData()
   payload.append('image', image)
   const response = await $fetch <API.Response <Model.Master.DoctorsSpecialist>> (`/specialist/${slug}/image`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function deleteSpecialist (slug: string) : Promise <boolean> {
   const response = await $fetch <API.Response <void>> (`/specialists/${slug}`, {
      method: 'DELETE',
   })
   return true
}

export async function getAdvertisement () : Promise <Model.Master.Advertisement[]> {
   const response = await $fetch <API.Response <Model.Master.Advertisement[]>> (`/advertisements`, {
      method: 'GET'
   })
   return response.data!
}

export async function getVouchers () : Promise <Model.Master.Voucher[]> {
   const response = await $fetch <API.Response <Model.Master.Voucher[]>> (`/vouchers`, {
      method: 'GET'
   })
   return response.data!
}