import { generateVisitorId, getVisitorStats, trackVisit } from '../src/lib/visitors'

const getClientIP = (req: any): string | null => {
  const forwarded = req.headers?.['x-forwarded-for']
  const realIP = req.headers?.['x-real-ip']
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded
  const realIPValue = Array.isArray(realIP) ? realIP[0] : realIP

  if (typeof forwardedValue === 'string' && forwardedValue.length > 0) {
    return forwardedValue.split(',')[0].trim()
  }

  return typeof realIPValue === 'string' ? realIPValue : null
}

const readFingerprint = (body: unknown): string | undefined => {
  if (body && typeof body === 'object' && 'fingerprint' in body) {
    const value = (body as Record<string, unknown>).fingerprint
    return typeof value === 'string' ? value : undefined
  }
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body) as Record<string, unknown>
      return typeof parsed.fingerprint === 'string' ? parsed.fingerprint : undefined
    } catch {
      return undefined
    }
  }
  return undefined
}

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const stats = await getVisitorStats()
      res.status(200).json({ success: true, ...stats })
    } catch {
      res.status(500).json({ success: false, uniqueVisitors: 0, error: 'Failed to get visitor stats' })
    }
    return
  }

  if (req.method === 'POST') {
    try {
      const fingerprint = readFingerprint(req.body)
      const userAgentHeader = req.headers?.['user-agent']
      const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader
      const visitorId = generateVisitorId(getClientIP(req), typeof userAgent === 'string' ? userAgent : null, fingerprint)
      const data = await trackVisit(visitorId)
      res.status(200).json({ success: true, uniqueVisitors: data.uniqueVisitors })
    } catch {
      try {
        const stats = await getVisitorStats()
        res.status(200).json({ success: true, ...stats })
      } catch {
        res.status(500).json({ success: false, uniqueVisitors: 0, error: 'Failed to track visitor' })
      }
    }
    return
  }

  res.status(405).json({ success: false, uniqueVisitors: 0, error: 'Method not allowed' })
}
