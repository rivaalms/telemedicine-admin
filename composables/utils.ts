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