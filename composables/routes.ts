type Router = {
   label: string
   to?: string
   children?: Router[] | null
   icon?: string
   roles?: string | string[]
}

export const useRoutes : Router[] = [
   {
      label: 'Beranda',
      to: '/',
      children: null,
      icon: 'i-heroicons-home',
      roles: '*'
   },
   {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'i-heroicons-rectangle-group',
      roles: [ 'Admin Faskes', 'Admin Keuangan' ]
   },
   {
      label: 'Emergency',
      to: '/emergency',
      children: null,
      icon: 'i-heroicons-exclamation-triangle',
      roles: [ 'Admin Faskes', 'Admin Emergency' ]
   },
   {
      label: 'Reservasi Konsultasi',
      to: '/reservation-consultation',
      icon: 'i-heroicons-calendar',
      roles: [ 'Admin Faskes' ]
   },
   {
      label: 'Users',
      icon: 'i-heroicons-users',
      children: [
         {
            label: 'Dokter',
            to: '/users/doctors/list',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         },
         {
            label: 'Pasien',
            to: '/users/patient',
            roles: [ 'Admin Faskes', 'Admin Top Up' ]
         },
         {
            label: 'Perawat',
            to: '/users/nurse',
            roles: [ 'Admin Faskes' ]
         },
         {
            label: 'Officer',
            to: '/users/officers',
            roles: [ 'Admin Faskes' ]
         },
         {
            label: 'Admin',
            to: '/users/admin',
            roles: [ 'Admin Faskes' ]
         }
      ]
   },
   {
      label: 'Ambulance',
      to: '/ambulance',
      icon: 'i-heroicons-truck',
      roles: [ 'Admin Faskes' ]
   },
   {
      label: 'Data Master',
      icon: 'i-heroicons-adjustments-horizontal',
      children: [
         {
            label: 'Spesialis Dokter',
            to: '/masters/doctors-specialists',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         },
         {
            label: 'Data Iklan',
            to: '/masters/advertisements',
            roles: [ 'Admin Faskes' ]
         },
         {
            label: 'Voucher',
            to: '/masters/vouchers',
            roles: [ 'Admin Faskes' ]
         }
      ]
   },
   {
      label: 'Broadcast',
      to: '/broadcast',
      icon: 'i-heroicons-rss',
      roles: [ 'Admin Faskes' ]
   },
   {
      label: 'Jadwal Dokter',
      to: '/doctors-schedules',
      icon: 'i-heroicons-calendar-days',
      roles: [ 'Admin Faskes', 'Admin Keuangan' ]
   },
   {
      label: 'Settings',
      to: '/settings',
      icon: 'i-heroicons-cog-6-tooth',
      roles: [ 'Admin Faskes' ]
   },
   {
      label: 'Template Chat',
      to: '/template-chats',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
      roles: [ 'Admin Faskes' ]
   },
   {
      label: 'Logs Report',
      icon: 'i-heroicons-clipboard-document-list',
      children: [
         {
            label: 'Aktivitas User',
            to: '/log-reports/user-activities',
            roles: [ 'Admin Faskes' ]
         },
         {
            label: 'Konsultasi',
            to: '/log-reports/consultations',
            roles: [ 'Admin Faskes' ]
         },
         {
            label: 'Emergency',
            to: '/log-reports/emergency',
            roles: [ 'Admin Faskes' ]
         }
      ]
   },
   {
      label: 'Laporan',
      icon: 'i-heroicons-clipboard',
      children: [
         {
            label: 'Laporan Konsultasi',
            to: '/reports/consultations',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         },
         {
            label: 'Laporan Pembelian Obat',
            to: '/reports/medicines',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         },
         {
            label: 'Laporan Emergency',
            to: '/reports/emergency',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         },
         {
            label: 'Laporan Driver Emergency',
            to: '/reports/emergency-officers',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         },
         {
            label: 'Laporan Dokter Emergency',
            to: '/reports/emergency-doctors',
            roles: [ 'Admin Faskes', 'Admin Keuangan' ]
         }
      ]
   }
]