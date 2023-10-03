export const useRoutes : Router[] = [
   {
      label: 'Beranda',
      to: '/',
      children: null
      // icon: 'i-heroicons-home',
   },
   {
      label: 'Emergency',
      to: '/emergency',
      children: null
      // icon: 'i-heroicons-exclamation-triangle'
   },
   {
      label: 'Reservasi Konsultasi',
      to: '/reservation-consultation',
   },
   {
      label: 'Users',
      // icon: 'i-heroicons-users',
      children: [
         {
            label: 'Dokter',
            to: '/users/doctors/list',
         },
         {
            label: 'Pasien',
            to: '/users/patient'
         },
         {
            label: 'Perawat',
            to: '/users/nurse'
         },
         {
            label: 'Officer',
            to: '/users/officers'
         },
         {
            label: 'Admin',
            to: '/users/admin'
         }
      ]
   },
   {
      label: 'Ambulance',
      to: '/ambulance'
   },
   {
      label: 'Data Master',
      children: [
         {
            label: 'Spesialis Dokter',
            to: '/masters/doctors-specialists'
         },
         {
            label: 'Data Iklan',
            to: '/masters/advertisements'
         },
         {
            label: 'Voucher',
            to: '/masters/vouchers'
         }
      ]
   },
   {
      label: 'Jadwal Dokter',
      to: '/doctors-schedules'
   },
   {
      label: 'Settings',
      to: '/settings'
   },
   {
      label: 'Template Chat',
      to: '/template-chats'
   },
   {
      label: 'Logs Report',
      children: [
         {
            label: 'Aktivitas User',
            to: '/log-reports/user-activities'
         },
         {
            label: 'Konsultasi',
            to: '/log-reports/consultations'
         },
         {
            label: 'Emergency',
            to: '/log-reports/emergency'
         }
      ]
   },
   {
      label: 'Laporan',
      children: [
         {
            label: 'Laporan Konsultasi',
            to: '/reports/consultations'
         },
         {
            label: 'Laporan Pembelian Obat',
            to: '/reports/medicines'
         },
         {
            label: 'Laporan Emergency',
            to: '/reports/emergency'
         }
      ]
   }
]

type Router = {
   label: string
   to?: string
   children?: Router[] | null
   icon?: string
}