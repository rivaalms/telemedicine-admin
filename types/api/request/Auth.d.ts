declare namespace API.Request {
   namespace Auth {
      type Login = {
         email: string
         password: string
      }

      type UpdateEmail = Request.Auth.Login

      type UpdatePassword = {
         old_password: string
         password: string
         password_confirmation: string
         phone_number: string
      }

      type ForgotPasswordByPhone = {
         phone_number: string
         password: string
         password_confirmation: string
      }

      type OTP = {
         hash: string | null
         is_type: number
         phone_number: string
         ref_type: string | null
         verification_code: number | string | null
      }
   }
}