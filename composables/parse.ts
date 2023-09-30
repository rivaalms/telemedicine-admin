// @ts-ignore
import Parse from 'parse/dist/parse'

const config = useRuntimeConfig().public
const parseKey = config.parseKey
const parseUrl = config.parseUrl

Parse.initialize('parse-dev-app', 'javascript_key', parseKey)
Parse.serverURL = parseUrl

export { Parse as useParse }