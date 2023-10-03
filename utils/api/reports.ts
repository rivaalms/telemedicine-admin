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

export async function getEmergencies (payload: API.Payload.DateRangePayload) : Promise <Model.Report.Emergency[]> {
   const response = await $fetch <API.Response <API.LaravelPaginationResponse <Model.Report.Emergency[]>>> (`emergency-reports`, {
      method: 'GET',
      query: {
         ...payload,
         status: 'FINISHED',
         per_page: 'ALL'
      }
   })
   return response.data!.data
}

export async function getEmergencyOfficers (payload: API.Payload.DateRangePayload) : Promise <Model.Report.Officer[]> {
   const response = await $fetch <API.Response <Model.Report.Officer[]>> (`/emergency-summary-officers`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}

export async function getEmergencyDoctors (payload: API.Payload.DateRangePayload) : Promise <Model.Report.Doctor[]> {
   const response = await $fetch <API.Response <Model.Report.Doctor[]>> (`/emergency-summary-doctors`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}