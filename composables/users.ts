export const useAdminTableHeader : Utility.TableHeader[] = [
   { key: 'full_name', label : 'Nama' },
   { key: 'email', label : 'Email' },
   { key: 'phone_number', label : 'No. Telepon' },
   { key: 'status', label : 'Status' },
]

export const useOfficerTableHeader : Utility.TableHeader[] = [
   { key: 'employee_no', label: 'No. Induk Karyawan' },
   { key: 'full_name', label: 'Nama' },
   { key: 'email', label: 'Email' },
   { key: 'phone_number', label: 'No. Telepon' },
   { key: 'position', label: 'Posisi' },
   { key: 'created_at', label: 'Tgl. Registrasi' }
]

export const useNurseTableHeader : Utility.TableHeader[] = [
   { key: 'full_name', label: 'Nama' },
   { key: 'gender', label: 'Jenis Kelamin' },
   { key: 'email', label: 'Email' },
   { key: 'phone_number', label: 'No. Telepon' },
   { key: 'status', label: 'Status' },
   { key: 'actions' }
]