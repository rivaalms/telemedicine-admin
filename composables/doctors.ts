export const useDoctorsTableHeader = [
   { key: 'no_str', label: 'No Str' },
   { key: 'name', label: 'Nama' },
   { key: 'email', label: 'Email' },
   { key: 'phone_number', label: 'No Telepon' },
   { key: 'specialist', label: 'Spesialis' },
   { key: 'actions' }
]

// NOTE: Used for doctor's schedule table on Doctor Profile page
export const useDoctorSchedulesTableHeader = [
   { key: 'day', label: 'Hari' },
   { key: 'start_time', label: 'Jam Mulai' },
   { key: 'end_time', label: 'Jam Berakhir' },
   { key: 'kuota', label: 'Kuota' },
   { key: 'actions' }
]

// NOTE: Used for doctor's schedules on Doctor Schedules page
export const usePageDoctorSchedulesTableHeader = [
   { key: 'full_name', label: 'Nama' },
   { key: 'sun', label: 'Minggu' },
   { key: 'mon', label: 'Senin' },
   { key: 'tue', label: 'Selasa' },
   { key: 'wed', label: 'Rabu' },
   { key: 'thu', label: 'Kamis' },
   { key: 'fri', label: 'Jumat' },
   { key: 'sat', label: 'Sabtu' },
]

export const useParseDay = (day: number | string) => {
   switch (day) {
      case '0' || 0:
         return 'Minggu'
         break
      case '1' || 1:
         return 'Senin'
         break
      case '2' || 2:
         return 'Selasa'
         break
      case '3' || 3:
         return 'Rabu'
         break
      case '4' || 4:
         return 'Kamis'
         break
      case '5' || 5:
         return 'Jumat'
         break
      case '6' || 6:
         return 'Sabtu'
         break
      default:
         return 'Invalid day'
         break
   }
}