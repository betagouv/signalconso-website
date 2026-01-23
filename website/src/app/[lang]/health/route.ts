import { NextResponse } from 'next/server'

export function GET() {
  const now = new Date()

  // Get current time in CET timezone
  const cetTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  const cetHour = cetTime.getHours()

  if (cetHour >= 18) {
    return new NextResponse('Service Unavailable - After 6 PM CET', { status: 503 })
  }
  return new NextResponse('OK', { status: 200 })
}