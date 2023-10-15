export async function broadcast (image: any, data: Model.Broadcast) : Promise <any> {
   const payload = new FormData()
   payload.append('image', image)
   payload.append('data', JSON.stringify(data))

   const response = await $fetch <API.Response <any>> (`/broadcast`, {
      method: 'POST',
      body: payload
   })

   return response.data!
}