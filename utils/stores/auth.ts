import { defineStore } from 'pinia'
import * as Auth from '@/utils/api/auth'

namespace Store.State {
   export type User = {
      user: Model.Auth | null
   }
}

export const useAuthStore = defineStore('auth', {
   persist: true,

   state: () : Store.State.User => ({
      user: null,
   }),

   getters: {
      getUser: (state) : Model.Auth | null => state.user,
      isLoggedIn: (state) : boolean => !!state.user,
      getRole: (state) : string => {
         if (state.user?.ref_type === "App\\Model\\MedicalFacility" && state.user?.role) return state.user.role.name!
         return 'superAdmin'
      }
   },

   actions: {
      async login(payload: API.Request.Auth.Login) {
         if (this.isLoggedIn) return

         return await Auth.login(payload)
            .then((resp: Model.Auth) => {
               if (!resp.ref_type || resp.ref_type === "App\\Model\\MedicalFacility") {
                  this.user = resp
                  localStorage.setItem('user', JSON.stringify(this.user))
               }
               else throw Error
            })
      },

      async logout() {
         if (this.isLoggedIn) await Auth.logout()
         this.user = null
         if (localStorage.getItem('user')) localStorage.removeItem('user')
         useAppStore().notify('info', 'Log out berhasil')
         return Promise.resolve(null)
      },
   },
})