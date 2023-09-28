export const useDoctorsTableHeader = [
   { key: 'no_str', label: 'No Str' },
   { key: 'name', label: 'Nama' },
   { key: 'email', label: 'Email' },
   { key: 'phone_number', label: 'No Telepon' },
   { key: 'specialist', label: 'Spesialis' },
   { key: 'actions' }
]

export const useDoctorSchedulesTableHeader = [
   { key: 'day', label: 'Hari' },
   { key: 'start_time', label: 'Jam Mulai' },
   { key: 'end_time', label: 'Jam Berakhir' }
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