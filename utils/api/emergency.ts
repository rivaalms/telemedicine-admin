export async function get () : Promise <Model.Emergency[]> {
   const response = await $fetch <API.Response<Model.Emergency[]>> (`/emergency`, {
      method: 'GET',
   })
   return response.data!
}

export async function getReports (payload: API.Request.Emergency.Report) : Promise <API.Response.LaravelPaginate <Model.Emergency[]>> {
   const response = await $fetch <API.Response <API.Response.LaravelPaginate <Model.Emergency[]>>> (`/emergency-reports`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}