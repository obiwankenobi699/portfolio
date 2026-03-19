import { fetchUserPullRequests } from '../src/lib/github'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, contributions: [], error: 'Method not allowed' })
    return
  }

  try {
    const username = typeof req.query?.username === 'string' ? req.query.username : 'KartikLabhshetwar'
    const limitRaw = typeof req.query?.limit === 'string' ? req.query.limit : '50'
    const parsedLimit = Number.parseInt(limitRaw, 10)
    const limit = Number.isNaN(parsedLimit) ? 50 : parsedLimit

    const contributions = await fetchUserPullRequests(username, limit)
    res.status(200).json({
      success: true,
      contributions,
      count: contributions.length,
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contributions',
      contributions: [],
    })
  }
}
