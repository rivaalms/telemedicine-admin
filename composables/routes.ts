export const ROLES = {
   SUPERADMIN: 'superAdmin',
   FACILITY: 'Admin Faskes',
   FINANCE: 'Admin Keuangan',
   TOPUP: 'Admin Top Up',
   EMERGENCY: 'Admin Emergency'
}

export const useRoutes : Utility.Router[] = [
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
      roles: [ ROLES.FACILITY, ROLES.FINANCE ]
   },
   {
      label: 'Emergency',
      to: '/emergency',
      children: null,
      icon: 'i-heroicons-exclamation-triangle',
      roles: [ ROLES.FACILITY, ROLES.EMERGENCY ]
   },
   {
      label: 'Reservasi Konsultasi',
      to: '/reservation-consultation',
      icon: 'i-heroicons-calendar',
      roles: [ ROLES.FACILITY ]
   },
   {
      label: 'Users',
      icon: 'i-heroicons-users',
      roles: [ ROLES.FACILITY, ROLES.FINANCE, ROLES.TOPUP ],
      children: [
         {
            label: 'Dokter',
            to: '/users/doctors/list',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         },
         {
            label: 'Pasien',
            to: '/users/patient',
            roles: [ ROLES.FACILITY, ROLES.TOPUP ]
         },
         {
            label: 'Perawat',
            to: '/users/nurse',
            roles: [ ROLES.FACILITY ]
         },
         {
            label: 'Officer',
            to: '/users/officers',
            roles: [ ROLES.FACILITY ]
         },
         {
            label: 'Admin',
            to: '/users/admin',
            roles: [ ROLES.FACILITY ]
         }
      ]
   },
   {
      label: 'Fasilitas Kesehatan',
      to: '/medical-facilities',
      icon: 'i-heroicons-building-office-2',
      roles: [ ROLES.SUPERADMIN ]
   },
   {
      label: 'Ambulance',
      to: '/ambulance',
      icon: 'i-heroicons-truck',
      roles: [ ROLES.FACILITY ]
   },
   {
      label: 'Data Master',
      icon: 'i-heroicons-adjustments-horizontal',
      roles: [ ROLES.FACILITY, ROLES.FINANCE ],
      children: [
         {
            label: 'Spesialis Dokter',
            to: '/masters/doctors-specialists',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         },
         {
            label: 'Data Iklan',
            to: '/masters/advertisements',
            roles: [ ROLES.FACILITY ]
         },
         {
            label: 'Voucher',
            to: '/masters/vouchers',
            roles: [ ROLES.FACILITY ]
         }
      ]
   },
   {
      label: 'Broadcast',
      to: '/broadcast',
      icon: 'i-heroicons-rss',
      roles: [ ROLES.FACILITY ]
   },
   {
      label: 'Jadwal Dokter',
      to: '/doctors-schedules',
      icon: 'i-heroicons-calendar-days',
      roles: 'none'
   },
   {
      label: 'Settings',
      to: '/settings',
      icon: 'i-heroicons-cog-6-tooth',
      roles: [ ROLES.FACILITY ]
   },
   {
      label: 'Template Chat',
      to: '/template-chats',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
      roles: [ ROLES.FACILITY ]
   },
   {
      label: 'Logs Report',
      icon: 'i-heroicons-clipboard-document-list',
      roles: [ ROLES.FACILITY ],
      children: [
         {
            label: 'Aktivitas User',
            to: '/log-reports/user-activities',
            roles: [ ROLES.FACILITY ]
         },
         {
            label: 'Konsultasi',
            to: '/log-reports/consultations',
            roles: [ ROLES.FACILITY ]
         },
         {
            label: 'Emergency',
            to: '/log-reports/emergency',
            roles: [ ROLES.FACILITY ]
         }
      ]
   },
   {
      label: 'Laporan',
      icon: 'i-heroicons-clipboard',
      roles: [ ROLES.FACILITY, ROLES.FINANCE ],
      children: [
         {
            label: 'Laporan Konsultasi',
            to: '/reports/consultations',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         },
         {
            label: 'Laporan Pembelian Obat',
            to: '/reports/medicines',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         },
         {
            label: 'Laporan Emergency',
            to: '/reports/emergency',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         },
         {
            label: 'Laporan Driver Emergency',
            to: '/reports/emergency-officers',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         },
         {
            label: 'Laporan Dokter Emergency',
            to: '/reports/emergency-doctors',
            roles: [ ROLES.FACILITY, ROLES.FINANCE ]
         }
      ]
   }
]