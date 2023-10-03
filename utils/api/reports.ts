export async function getConsultations (payload: API.Payload.DateRangePayload) : Promise <Model.Report.Consultation[]> {
   const response = await $fetch <API.Response <API.LaravelPaginationResponse<Model.Report.Consultation[]>>> (`/consultation`, {
      method: 'GET',
      query: {
         ...payload,
         status: 'FINISHED',
         per_page: 'ALL'
      }
   })
   return response.data!.data
}

export async function getMedicinePurchases (payload: API.Payload.DateRangePayload) : Promise <Model.Report.Medicine[]> {
   const response = await $fetch <API.Response <API.LaravelPaginationResponse <Model.Report.Medicine[]>>> (`order-reports`, {
      method: 'GET',
      query: {
         ...payload,
         status: 'PAID',
         per_page: 'ALL'
      }
   })
   return response.data!.data
}