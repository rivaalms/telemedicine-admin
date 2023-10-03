export async function getTransactionIncome (year: string) : Promise <Dashboard.TransactionIncome> {
   const response = await $fetch <API.Response <Dashboard.TransactionIncome>> (`/summary-transactions/monthly`, {
      method: 'GET',
      query: {
         year
      }
   })
   return response.data!
}

export async function getSummaryEmergency (payload: API.Payload.DateRangePayload) : Promise <Dashboard.EmergencyStatus[]> {
   const response = await $fetch <API.Response <Dashboard.EmergencyStatus[]>> ('/summary-emergency-status/daily', {
      method: 'GET',
      query: payload
   })
   return response.data!
}

export async function getEmergencyTrends (year: string) : Promise <Dashboard.EmergencyTrend> {
   const response = await $fetch <API.Response <Dashboard.EmergencyTrend>> (`/summary-emergency-trend`, {
      method: 'GET',
      query: {
         year
      }
   })
   return response.data!
}