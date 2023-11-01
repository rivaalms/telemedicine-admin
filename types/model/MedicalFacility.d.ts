declare namespace Model {
   type MedicalFacility = {
      id: number
      name: string
      province_id: number
      province: string
      regency_id: number
      regency: string
      address: string | null
      map_lat: string | null
      map_lng: string | null
      distances: string | number | null
      image: string | null
   }
}