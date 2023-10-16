export async function broadcast (image: any, data: Model.Broadcast) : Promise <string> {
   const payload = new FormData()
   payload.append('image', image)
   payload.append('data', JSON.stringify(data))

   const response = await $fetch <API.Response <string>> (`/broadcast`, {
      method: 'POST',
      body: payload
   })

   return response.data!
}