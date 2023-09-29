export const useReservationTableHeader = [
   { key: 'reservation_date', label: 'Tanggal' },
   { key: 'reservation_time', label: 'Jam' },
   { key: 'patient.name', label: 'Nama Pasien' },
   { key: 'patient.phone_number', label: 'No. Telepon Pasien' },
   { key: 'doctor.name', label: 'Nama Dokter' },
   { key: 'status', label: 'Status' },
]

export const useReservationStatusOptions = [
   'All',
   'Unpaid',
   'Paid',
   'Canceled',
   'Failed'
]