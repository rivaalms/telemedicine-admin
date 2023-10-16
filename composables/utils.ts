// @ts-ignore
import Parse from 'parse/dist/parse'

type OTP = {
   type: string
   value: number
}

const config = useRuntimeConfig().public
const parseKey : string = config.parseKey
const parseUrl : string = config.parseUrl

Parse.initialize('parse-dev-app', 'javascript_key', parseKey)
Parse.serverURL = parseUrl

export { Parse as useParse }

export const useFormatCurrency = (value: string | number) : string => {
   const number = Number(value)
   return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
   })
}

export const useValidateNumber = (event: KeyboardEvent) : void => {
   if (!/^[0-9]+$/.test(event.key) || event.key === '.') return event.preventDefault()
}

export const useOtpType : OTP[] = [
   { type: 'phone', value: 1 },
   { type: 'password', value: 2 }
]