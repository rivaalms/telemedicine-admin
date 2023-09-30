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