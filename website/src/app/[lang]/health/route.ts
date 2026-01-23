import { NextResponse } from 'next/server'

// Create a date for today at 6:00 PM CET (17:00 UTC in winter, 16:00 UTC in summer)
const CET_OFFSET = 60 // CET is UTC+1
const cutoffTime = new Date()
cutoffTime.setUTCHours(17 - CET_OFFSET / 60, 0, 0, 0) // 6 PM CET

export function GET() {
  const now = new Date()
  if (now >= cutoffTime) {
    return new NextResponse('Service Unavailable - After 6 PM CET', { status: 503 })
  }
  return new NextResponse('OK', { status: 200 })
}