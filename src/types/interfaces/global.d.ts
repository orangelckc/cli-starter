declare type PromiseData<T> = Promise<Data<T>>

interface Data<T> {
  success: boolean
  message: string
  data?: T
}

declare type PromisePaginateData<T> = Promise<PaginateData<T>>

interface PaginateData<T> {
  success: boolean
  message: string
  data: {
    total: number
    list: T[]
  }
}
