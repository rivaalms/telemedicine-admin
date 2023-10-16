export const useEmergencyTableHeader : Utility.TableHeader[] = [
   { key: 'request_by.full_name', label: 'Nama Pelapor' },
   { key: 'request_by.phone_number', label: 'No. Telpon Pelapor' },
   { key: 'patient.patient_name', label: 'Nama Pasien' },
   { key: 'patient.patient_nik', label: 'NIK Pasien' },
   { key: 'patient.patient_gender', label: 'Jenis Kelamin Pasien' },
   { key: 'created_at', label: 'Tanggal' },
   { key: 'status', label: 'Status' },
   { key: 'actions', label: '' }
]

export const useEmergencyReportTableHeader : Utility.TableHeader[] = [
   { key: 'created_at', label: 'Tanggal' },
   { key: 'request_by.full_name', label: 'Nama Pelapor' },
   { key: 'patient.patient_name', label: 'Nama Pasien' },
   { key: 'doctor.full_name', label: 'Nama Dokter' },
   { key: 'pickup_location', label: 'Alamat' }
]

export const useFilterStatusOptions : string[] = [
   'All',
   'Requested',
   'On Call',
   'On Going',
   'Pick Up',
   'Done',
   'Finished',
   "Reported",
   'Not Answered',
   'Rejected By Sistem',
]