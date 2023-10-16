namespace API.Response {
   type Parse <T> = {
      results: T
      count?: number
   }

   namespace Parse {
      type ObjectNotation = {
         _objCount: number
         className: string
         id: string
         toJSON: () => {}
      }
   }
}