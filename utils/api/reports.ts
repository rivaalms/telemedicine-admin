export async function getConsultations (payload: Utility.DateRange) : Promise <Model.Report.Consultation[]> {
   const response = await $fetch <API.Response <API.Response.LaravelPaginate<Model.Report.Consultation[]>>> (`/consultation`, {
      method: 'GET',
      query: {
         ...payload,
         status: 'FINISHED',
         per_page: 'ALL'
      }
   })
   return response.data!.data
}

export async function getMedicinePurchases (payload: Utility.DateRange) : Promise <Model.Report.Medicine[]> {
   const response = await $fetch <API.Response <API.Response.LaravelPaginate <Model.Report.Medicine[]>>> (`order-reports`, {
      method: 'GET',
      query: {
         ...payload,
         status: 'PAID',
         per_page: 'ALL'
      }
   })
   return response.data!.data
}

export async function getEmergencies (payload: Utility.DateRange) : Promise <Model.Report.Emergency[]> {
   const response = await $fetch <API.Response <API.Response.LaravelPaginate <Model.Report.Emergency[]>>> (`emergency-reports`, {
      method: 'GET',
      query: {
         ...payload,
         status: 'FINISHED',
         per_page: 'ALL'
      }
   })
   return response.data!.data
}

export async function getEmergencyOfficers (payload: Utility.DateRange) : Promise <Model.Report.Officer[]> {
   const response = await $fetch <API.Response <Model.Report.Officer[]>> (`/emergency-summary-officers`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}

export async function getEmergencyDoctors (payload: Utility.DateRange) : Promise <Model.Report.Doctor[]> {
   const response = await $fetch <API.Response <Model.Report.Doctor[]>> (`/emergency-summary-doctors`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}