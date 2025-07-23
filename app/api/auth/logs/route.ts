import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, status, ip, userAgent } = body

    if (!email || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const logLine = `[${new Date().toLocaleString()}] [${status.toUpperCase()}] ${email} - IP: ${ip ?? 'unknown'} - UA: ${userAgent ?? 'unknown'}\n`
    const logPath = path.join(process.cwd(), 'logs', 'login.log')
    console.log("logPath: ", logPath)
    // สร้างโฟลเดอร์ logs ถ้ายังไม่มี
    const logsDir = path.dirname(logPath)
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }

    fs.appendFileSync(logPath, logLine)

    return NextResponse.json({ message: 'Log saved' }, { status: 200 })
  } catch (error) {
    console.error('❌ Log error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
