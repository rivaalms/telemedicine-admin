import { defineStore } from 'pinia'
import * as Auth from '@/utils/api/auth'

export const useAuthStore = defineStore('auth', {
   persist: true,

   state: () : AuthState => ({
      user: null,
   }),

   getters: {
      getUser: (state) : any => state.user,
      isLoggedIn: (state) : boolean => !!state.user,
      getRole: (state) : string => {
         if (state.user?.ref_type === "App\\Model\\MedicalFacility" && state.user?.role) return state.user.role.name!
         return 'superAdmin'
      }
   },

   actions: {
      async login(payload: API.Payload.Login) {
         if (this.isLoggedIn) return

         return await Auth.login(payload)
            .then((resp: Model.User) => {
               if (!resp.ref_type || resp.ref_type === "App\\Model\\MedicalFacility") this.user = resp
               else return alert('akun tidak terdaftar')
            })
      },

      async logout() {
         if (this.isLoggedIn) await Auth.logout()
         this.user = null
         return Promise.resolve(null)
      },

      async forgotPasswordByPhone(payload: API.Payload.ForgotPasswordByPhoneNumber) {
         return Auth.forgotPasswordByPhoneNumber(payload)
      },

      async forgotPasswordByEmail(email: string) {
         return Auth.forgotPasswordByEmail(email)
      }
   },
})

interface AuthState {
   user: Model.User | null
}