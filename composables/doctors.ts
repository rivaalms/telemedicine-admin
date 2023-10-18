export const useDoctorsTableHeader : Utility.TableHeader[] = [
   { key: 'no_str', label: 'No Str' },
   { key: 'name', label: 'Nama' },
   { key: 'email', label: 'Email' },
   { key: 'phone_number', label: 'No Telepon' },
   { key: 'specialist', label: 'Spesialis' },
      { key: 'actions', label: 'Aksi', class: 'flex justify-end items-center' }

]

// NOTE: Used for doctor's schedule table on Doctor Profile page
export const useDoctorSchedulesTableHeader : Utility.TableHeader[] = [
   { key: 'day', label: 'Hari' },
   { key: 'start_time', label: 'Jam Mulai' },
   { key: 'end_time', label: 'Jam Berakhir' },
   { key: 'kuota', label: 'Kuota' },
      { key: 'actions', label: 'Aksi', class: 'flex justify-end items-center' }

]

// NOTE: Used for doctor's schedules on Doctor Schedules page
export const usePageDoctorSchedulesTableHeader : Utility.TableHeader[] = [
   { key: 'full_name', label: 'Nama' },
   { key: 'sun', label: 'Minggu' },
   { key: 'mon', label: 'Senin' },
   { key: 'tue', label: 'Selasa' },
   { key: 'wed', label: 'Rabu' },
   { key: 'thu', label: 'Kamis' },
   { key: 'fri', label: 'Jumat' },
   { key: 'sat', label: 'Sabtu' },
]

export const useParseDay = (day: number | string) : string => {
   switch (day) {
      case '0' || 0:
         return 'Minggu'
      case '1' || 1:
         return 'Senin'
      case '2' || 2:
         return 'Selasa'
      case '3' || 3:
         return 'Rabu'
      case '4' || 4:
         return 'Kamis'
      case '5' || 5:
         return 'Jumat'
      case '6' || 6:
         return 'Sabtu'
      default:
         return 'Invalid day'
   }
}