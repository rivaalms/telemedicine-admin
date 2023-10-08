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
         data: null
      }
   }),

   getters: {
      getAppName: (state) : string => state.appName,
      getTitle: (state) : string => state.title,
   },
   
   actions: {
      showDialog(type: string, title: string, data: any) {
         this.dialog.type = type
         this.dialog.title = title
         this.dialog.data = data
         this.dialog.show = true
      },

      clearDialog() {
         this.dialog.show = false
         setTimeout(() => {
            this.dialog.data = null
            this.dialog.title = ''
            this.dialog.type = ''
         }, 200)
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
   }
}