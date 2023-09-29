export async function get (filters: API.Payload.ReservationConsultationPayload) : Promise <Model.ReservationConsultation[]> {
   const payload = { ...filters }
   if (payload.status === 'All') payload.status = null
   
   const response = await $fetch <API.Response <Model.ReservationConsultation[]>> (`reservation-consultations`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}