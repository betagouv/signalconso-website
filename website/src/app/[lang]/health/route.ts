import { NextResponse } from 'next/server'

const START_TIME = Date.now()
const FIVE_MINUTES = 5 * 60 * 1000 // 5 minutes in milliseconds

export function GET() {
  const currentTime = Date.now()
  if (currentTime - START_TIME > FIVE_MINUTES) {
    return new NextResponse('Service Unavailable', { status: 503 })
  }
  return new NextResponse('OK', { status: 200 })
}