export const useUserActivityTableHeaders : Utility.TableHeader[] = [
   { key: 'activity', label: 'Aktivitas' },
   { key: 'email', label: 'Email' },
   { key: 'createdAt', label: 'Waktu' }
]

export const useConsultationTableHeaders : Utility.TableHeader[] = [
   { key: 'patient_email', label: 'Email Pasien' },
   { key: 'doctor_email', label: 'Email Dokter' },
   { key: 'status', label: 'Status' },
   { key: 'updatedAt', label: 'Update Terakhir' }
]

export const useEmergencyLogTableHeaders : Utility.TableHeader[] = [
   { key: 'patient_email', label: 'Email Pasien' },
   { key: 'emergency_type', label: 'Tipe Emergency' },
   { key: 'status', label: 'Status' },
   { key: 'updatedAt', label: 'Update Terakhir' }
]