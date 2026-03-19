import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IncomingMessage, ServerResponse } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readJsonBody = (req: IncomingMessage): Promise<Record<string, unknown>> =>
  new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
    })
    req.on('end', () => {
      if (!raw) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(raw) as Record<string, unknown>)
      } catch {
        resolve({})
      }
    })
  })

const sendJson = (res: ServerResponse, payload: unknown, statusCode = 200) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const getClientIP = (req: IncomingMessage): string | null => {
  const forwarded = req.headers['x-forwarded-for']
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded
  const realIP = req.headers['x-real-ip']
  const realIPValue = Array.isArray(realIP) ? realIP[0] : realIP
  if (forwardedValue) {
    return forwardedValue.split(',')[0].trim()
  }
  return realIPValue ?? null
}

const githubApi = async () => import('./src/lib/github')
const visitorsApi = async () => import('./src/lib/visitors')

const apiPlugin = (): Plugin => {
  const middleware = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url) {
      next()
      return
    }
    const url = new URL(req.url, 'http://localhost')
    if (!url.pathname.startsWith('/api/')) {
      next()
      return
    }

    try {
      if (url.pathname === '/api/github-stars' && req.method === 'GET') {
        const owner = url.searchParams.get('owner') || 'KartikLabhshetwar'
        const repo = url.searchParams.get('repo') || 'portfolio'
        const { fetchRepositoryStars } = await githubApi()
        const stars = await fetchRepositoryStars(owner, repo)
        sendJson(res, { success: true, stars })
        return
      }

      if (url.pathname === '/api/github-contributions' && req.method === 'GET') {
        const username = url.searchParams.get('username') || 'KartikLabhshetwar'
        const limit = Number.parseInt(url.searchParams.get('limit') || '50', 10)
        const { fetchUserPullRequests } = await githubApi()
        const contributions = await fetchUserPullRequests(username, Number.isNaN(limit) ? 50 : limit)
        sendJson(res, { success: true, contributions, count: contributions.length })
        return
      }

      if (url.pathname === '/api/visitors' && req.method === 'GET') {
        const { getVisitorStats } = await visitorsApi()
        const stats = await getVisitorStats()
        sendJson(res, { success: true, ...stats })
        return
      }

      if (url.pathname === '/api/visitors' && req.method === 'POST') {
        try {
          const { generateVisitorId, trackVisit } = await visitorsApi()
          const body = await readJsonBody(req)
          const fingerprint = typeof body.fingerprint === 'string' ? body.fingerprint : undefined
          const userAgentHeader = req.headers['user-agent']
          const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader
          const visitorId = generateVisitorId(getClientIP(req), userAgent ?? null, fingerprint)
          const data = await trackVisit(visitorId)
          sendJson(res, { success: true, uniqueVisitors: data.uniqueVisitors })
          return
        } catch {
          const { getVisitorStats } = await visitorsApi()
          const stats = await getVisitorStats().catch(() => ({ uniqueVisitors: 0 }))
          sendJson(res, { success: true, ...stats })
          return
        }
      }
    } catch {
      if (url.pathname === '/api/github-stars') {
        sendJson(res, { success: false, stars: 0 }, 500)
        return
      }
      if (url.pathname === '/api/github-contributions') {
        sendJson(res, { success: false, error: 'Failed to fetch contributions', contributions: [] }, 500)
        return
      }
      if (url.pathname === '/api/visitors') {
        sendJson(res, { success: false, uniqueVisitors: 0, error: 'Failed to get visitor stats' }, 500)
        return
      }
    }

    next()
  }

  return {
    name: 'portfolio-api-routes',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'next/link', replacement: path.resolve(__dirname, 'src/compat/next-link.tsx') },
      { find: 'next/image', replacement: path.resolve(__dirname, 'src/compat/next-image.tsx') },
      { find: 'next/navigation', replacement: path.resolve(__dirname, 'src/compat/next-navigation.ts') },
      { find: 'next/video', replacement: path.resolve(__dirname, 'src/compat/next-video.tsx') },
      { find: 'next-video', replacement: path.resolve(__dirname, 'src/compat/next-video.tsx') },
      { find: 'next/font/google', replacement: path.resolve(__dirname, 'src/compat/next-font-google.ts') },
    ],
  },
})
