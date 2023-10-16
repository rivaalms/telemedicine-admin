import moment from 'moment'

export async function get (filters: API.Request.Consultation.ReservationConsultation) : Promise <Model.ReservationConsultation[]> {
   const payload = { ...filters }
   payload.start_date = moment(payload.start_date).format('YYYY-MM-DD')
   payload.end_date = moment(payload.end_date).format('YYYY-MM-DD')
   if (payload.status === 'All') payload.status = null
   
   const response = await $fetch <API.Response <Model.ReservationConsultation[]>> (`reservation-consultations`, {
      method: 'GET',
      query: payload
   })
   return response.data!
}