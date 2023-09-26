import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
   persist: true,

   state: () : any => ({
      appName: 'RSJP Paramarta',
      title: ''
   }),

   getters: {
      getAppName: (state) => state.appName,
      getTitle: (state) => state.title
   }
})