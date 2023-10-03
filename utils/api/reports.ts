export async function getConsultations (payload: API.Payload.ConsultationReportPayload) : Promise <Model.Report.Consultation[]> {
   const response = await $fetch <API.Response <API.LaravelPaginationResponse<Model.Report.Consultation[]>>> (`/consultation`, {
      method: 'GET',
      query: {
         ...payload,
         per_page: 'ALL'
      }
   })
   return response.data!.data
}