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
            label: 'Admin',
            to: '/users/admin'
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