export type SpecialCategorySetup<T> =
  | {
      status: 'skipped'
    }
  | {
      status: 'loading'
    }
  | {
      status: 'loaded'
      result: T
    }
