export async function getSpecialists () : Promise <Model.Master.DoctorsSpecialist[]> {
   const response = await $fetch <API.Response <Model.Master.DoctorsSpecialist[]>> (`/specialists`, {
      method: 'GET'
   })
   return response.data!
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