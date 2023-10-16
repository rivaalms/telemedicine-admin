// @ts-ignore
import Parse from 'parse/dist/parse'

const config = useRuntimeConfig().public
const parseKey = config.parseKey
const parseUrl = config.parseUrl

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

export const useValidateNumber = (event: KeyboardEvent) => {
   if (!/^[0-9]+$/.test(event.key) || event.key === '.') return event.preventDefault()
}

export const useOtpType = [
   { type: 'phone', value: 1 },
   { type: 'password', value: 2 }
]