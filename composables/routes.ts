export const useRoutes : Router[] = [
   {
      label: 'Beranda',
      to: '/',
      children: null,
      icon: 'i-heroicons-home',
   },
   {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'i-heroicons-rectangle-group'
   },
   {
      label: 'Emergency',
      to: '/emergency',
      children: null,
      icon: 'i-heroicons-exclamation-triangle'
   },
   {
      label: 'Reservasi Konsultasi',
      to: '/reservation-consultation',
      icon: 'i-heroicons-calendar',
   },
   {
      label: 'Users',
      icon: 'i-heroicons-users',
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
      to: '/ambulance',
      icon: 'i-heroicons-truck'
   },
   {
      label: 'Data Master',
      icon: 'i-heroicons-adjustments-horizontal',
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
      label: 'Broadcast',
      to: '/broadcast',
      icon: 'i-heroicons-rss'
   },
   {
      label: 'Jadwal Dokter',
      to: '/doctors-schedules',
      icon: 'i-heroicons-calendar-days'
   },
   {
      label: 'Settings',
      to: '/settings',
      icon: 'i-heroicons-cog-6-tooth'
   },
   {
      label: 'Template Chat',
      to: '/template-chats',
      icon: 'i-heroicons-chat-bubble-left-ellipsis'
   },
   {
      label: 'Logs Report',
      icon: 'i-heroicons-clipboard-document-list',
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
      icon: 'i-heroicons-clipboard',
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
         },
         {
            label: 'Laporan Driver Emergency',
            to: '/reports/emergency-officers'
         },
         {
            label: 'Laporan Dokter Emergency',
            to: '/reports/emergency-doctors'
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