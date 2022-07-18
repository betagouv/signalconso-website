export type ValidationRejectReason = 'TOO_MANY_ATTEMPTS' | 'INVALID_CODE'

export interface ConsumerEmailResult {
  valid: boolean
  reason?: ValidationRejectReason
}
