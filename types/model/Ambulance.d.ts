declare namespace Model {
   type Ambulance = {
      id?: number | string | null
      plate_number?: string | null
      vehicle_type?: string | null
      camera_address?: string | null
      camera_token?: string | number | null
      officer?: Omit<Model.User, 'nik' | 'gender'>
   }
}