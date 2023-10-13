const FASKES_ID = useRuntimeConfig().public.faskesId
export async function get () : Promise <Model.TemplateChat[]> {
   const response = await $fetch <API.Response <Model.TemplateChat[]>> (`/template-chats`, {
      method: 'GET',
      headers: {
         'faskes-id': FASKES_ID
      }
   })
   return response.data!
}

export async function createTemplateChat (payload: Model.TemplateChat) : Promise <Model.TemplateChat> {
   const response = await $fetch <API.Response <Model.TemplateChat>> (`/template-chats`, {
      method: 'POST',
      body: payload
   })
   return response.data!
}

export async function updateTemplateChat (id: number, payload: Model.TemplateChat) : Promise <Model.TemplateChat> {
   const response = await $fetch <API.Response <Model.TemplateChat>> (`/template-chats/${id}`, {
      method: 'PUT',
      body: payload
   })
   return response.data!
}