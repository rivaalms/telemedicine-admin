import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
   persist: true,

   state: () : any => ({
      title: ''
   }),

   getters: {
      getTitle: (state) => state.title
   }
})