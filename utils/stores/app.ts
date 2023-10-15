import { NotificationColor } from '@nuxt/ui/dist/runtime/types'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
   persist: true,

   state: () : AppState => ({
      appName: 'RSJP Paramarta',
      title: '',
      dialog: {
         show: false,
         title: '',
         type: '',
         data: null,
         callback: () => {}
      },
      slideover: false
   }),

   getters: {
      getAppName: (state) : string => state.appName,
      getTitle: (state) : string => state.title,
   },
   
   actions: {
      showDialog(type: string, title: string, data?: any, callback?: Function) {
         this.dialog.type = type
         this.dialog.title = title
         if (data) this.dialog.data = data
         if (callback) this.dialog.callback = callback
         this.dialog.show = true
      },

      clearDialog() {
         this.dialog.show = false
         setTimeout(() => {
            this.dialog.data = null
            this.dialog.title = ''
            this.dialog.type = ''
            this.dialog.callback = () => {}
         }, 200)
      },

      notify(type: 'success' | 'error' | 'info', message: string, id?: string) {
         let title : string = ''
         let color : NotificationColor = 'gray'
         let icon : string = 'i-heroicons-bell'

         switch (type) {
            case 'success':
               title = 'Sukses'
               color = 'emerald'
               icon = 'i-heroicons-check-circle'
               break
            case 'error':
               title = 'Error'
               color = 'red'
               icon = 'i-heroicons-exclamation-circle'
               break
            case 'info':
               title = 'Info'
               color = 'sky'
               icon = 'i-heroicons-information-circle'
               break
            default:
               break
         }
         
         useToast().add({
            id,
            title,
            description: message,
            color,
            icon,
         })
      }
   }
})

type AppState = {
   appName: string
   title: string
   dialog: {
      show: boolean
      title: string
      type: string
      data: any
      callback: Function
   }
   slideover: boolean
}