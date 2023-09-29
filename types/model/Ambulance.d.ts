declare namespace Model {
   type Ambulance = {
      id?: number | string | null
      plate_number?: string | null
      vehicle_type?: string | null
      ambulance_type?: string | null
      status?: string | null
      camera_address?: string | null
      camera_token?: string | number | null
      officer_id?: number | null
      officer?: Omit<Model.User, 'nik' | 'gender'>
      created_at?: string | null
      updated_at?: string | null
   }
}