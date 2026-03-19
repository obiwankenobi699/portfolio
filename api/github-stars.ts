import { fetchRepositoryStars } from '../src/lib/github'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, stars: 0 })
    return
  }

  try {
    const owner = typeof req.query?.owner === 'string' ? req.query.owner : 'KartikLabhshetwar'
    const repo = typeof req.query?.repo === 'string' ? req.query.repo : 'portfolio'
    const stars = await fetchRepositoryStars(owner, repo)
    res.status(200).json({ success: true, stars })
  } catch {
    res.status(500).json({ success: false, stars: 0 })
  }
}
