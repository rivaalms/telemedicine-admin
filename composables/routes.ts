export const useRoutes = [
   {
      label: 'Beranda',
      to: '/',
      // icon: 'i-heroicons-home',
   },
   {
      label: 'Emergency',
      to: '/emergency',
      // icon: 'i-heroicons-exclamation-triangle'
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
         }
      ]
   }
]