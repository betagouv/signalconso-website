export enum ResponseEvaluation {
  Negative = 'Negative',
  Neutral = 'Neutral',
  Positive = 'Positive',
}

export interface ResponseConsumerReview {
  evaluation: ResponseEvaluation
  details?: string
  creationDate?: Date
}

export interface ResponseConsumerReviewExists {
  value: boolean
}
