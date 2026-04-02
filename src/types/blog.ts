export interface BlogPost {
  id: string
  title: string
  readTime: string
  author: string
  date: string
  content: string

  externalUrl?: string
  image?: string
  tags?: string[]

  sectionImages?: string[]   // ✅ important
}