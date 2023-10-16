export async function getTransactionIncome (year: string) : Promise <Dashboard.TransactionIncome> {
   const response = await $fetch <API.Response <Dashboard.TransactionIncome>> (`/summary-transactions/monthly`, {
      method: 'GET',
      query: {
         year
      }
   })
   return response.data!
}

export async function getSummaryEmergency (payload: Utility.DateRange) : Promise <Dashboard.EmergencyStatus[]> {
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

export async function getSummaryPatients (payload: Utility.DateRange) : Promise <Dashboard.PatientGender> {
   const response = await $fetch <API.Response <Dashboard.PatientGender>> (`/summary-patients/daily`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}

export async function getSummaryAmbulance () : Promise <Dashboard.Ambulance[]> {
   const response = await $fetch <API.Response <Dashboard.Ambulance[]>> (`/summary-ambulance-type`, {
      method: 'GET'
   })
   return response.data!
}

export async function getDoctorOnlineStatus () : Promise <Dashboard.DoctorOnlineStatus[]> {
   const response = await $fetch <API.Response <Dashboard.DoctorOnlineStatus[]>> (`/doctor-status-user`, {
      method: 'GET',
      query: {
         status: 'active'
      }
   })
   return response.data!
}

export async function getSummaryConsultations (payload: Utility.DateRange) : Promise <Dashboard.ConsultationSummary> {
   const response = await $fetch <API.Response <Dashboard.ConsultationSummary>> (`/summary-consultations/daily`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}