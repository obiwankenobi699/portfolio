'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function inlineJSX(t: string): React.ReactNode {
  return t.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    return p
  })
}

const PQ_STARTERS = [
  'A project answers', 'The hook is', 'Three layers',
  'Most teams arrive', 'This is the clearest',
  'The real reason', 'What made it work',
  'False positives are', 'Semantic search is not',
  'Pixel reconstruction teaches',
]

function Prose({ content, sectionImages = [] }: { content: string; sectionImages?: string[] }) {
  const elems: React.ReactNode[] = []
  const lines = content.split('\n')
  let code: string[] = [], inCode = false
  let slotIdx = 0, figN = 0, isFirst = true, pqCount = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('```')) {
      inCode = !inCode
      if (!inCode && code.length) { elems.push(<pre key={`c${i}`}>{code.join('\n')}</pre>); code = [] }
      continue
    }
    if (inCode) { code.push(line); continue }
    if (line.startsWith('### ')) {
      const imgSrc = sectionImages[slotIdx] || ''
      figN++
      if (imgSrc) {
        elems.push(
          <div key={`img${i}`} className="prose-img">
            <img src={imgSrc} alt={line.replace('### ', '')} loading="lazy" />
            <div className="prose-img-cap">{String(figN).padStart(2, '0')} — {line.replace('### ', '')}</div>
          </div>
        )
      } else {
        elems.push(
          <div key={`slot${i}`} className="prose-slot">
            <div className="prose-slot-corner tl" />
            <div className="prose-slot-corner br" />
            <div className="prose-slot-inner">
              <div className="prose-slot-icon">◻</div>
              <span className="prose-slot-lbl">Fig. {String(figN).padStart(2, '0')} — Image slot</span>
              <span className="prose-slot-hint">Add path to sectionImages[{slotIdx}] in blogs.ts</span>
            </div>
          </div>
        )
      }
      slotIdx++
      elems.push(<h3 key={`h${i}`}>{line.replace('### ', '')}</h3>)
      continue
    }
    if (line === '---') { elems.push(<hr key={`hr${i}`} />); continue }
    if (!line.trim()) continue
    if (isFirst && line.length > 40) {
      elems.push(<p key={`lead${i}`} className="prose-lead">{inlineJSX(line)}</p>)
      isFirst = false; continue
    }
    if (pqCount < 3 && line.length < 160 && PQ_STARTERS.some(s => line.startsWith(s))) {
      elems.push(<div key={`pq${i}`} className="pq"><p>{inlineJSX(line)}</p></div>)
      pqCount++; continue
    }
    elems.push(<p key={`p${i}`}>{inlineJSX(line)}</p>)
  }
  return <div className="prose">{elems}</div>
}

export default function BlogPostClient({ blog }: { blog: BlogPost & { sectionImages?: string[] } }) {
  const router = useRouter()
  const [pct, setPct] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    const el = ref.current; if (!el) return
    setPct(Math.min(100, Math.round(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100)))
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --ink:#0a0905;--gold:#b8975a;--gold-dim:#7a6038;--smoke:#161310;--ash:#2a2720;
          --dust:#6b6455;--fog:#9c9080;--cream:#e8e0d0;
          --serif:'Libre Baskerville',Georgia,serif;--sans:'Syne',sans-serif;--mono:'Fira Code',monospace;
        }
        .reader{position:fixed;inset:0;z-index:800;background:var(--ink);overflow-y:auto;overflow-x:hidden}
        .r-progress{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),#8c2020);z-index:810;transition:width .1s linear}
        .r-nav{position:sticky;top:0;z-index:805;background:rgba(10,9,5,.93);backdrop-filter:blur(20px);border-bottom:1px solid var(--ash);padding:.9rem 3rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
        .r-back{background:none;border:1px solid var(--ash);color:var(--dust);font-family:var(--sans);font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;padding:.42rem .9rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:.5rem}
        .r-back:hover{border-color:var(--gold);color:var(--gold)}
        .r-nav-title{font-family:var(--serif);font-size:.82rem;color:var(--fog);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:50%;font-style:italic}
        .r-nav-right{font-size:.56rem;letter-spacing:.15em;text-transform:uppercase;color:var(--dust);flex-shrink:0;display:flex;align-items:center;gap:.6rem}
        .r-pct-star{color:var(--gold)}
        .r-hero{width:100%;position:relative;overflow:hidden}
        .r-hero img{width:100%;max-height:70vh;object-fit:cover;display:block;filter:brightness(.52) grayscale(12%)}
        .r-hero-grad{position:absolute;inset:0;background:linear-gradient(to top,var(--ink) 0%,rgba(10,9,5,.2) 60%,transparent 100%)}
        .r-hero-info{position:absolute;bottom:0;left:0;right:0;padding:3rem 4rem 3.5rem}
        .r-hero-eye{font-size:.58rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:flex;align-items:center;gap:.7rem}
        .r-hero-eye::before{content:'';width:2rem;height:1px;background:var(--gold)}
        .r-hero-h1{font-family:var(--serif);font-size:clamp(2rem,5vw,4.5rem);font-weight:700;line-height:1.0;color:var(--cream)}
        .r-hero-blank{width:100%;padding:5rem 4rem 3.5rem;border-bottom:1px solid var(--ash)}
        .r-article{max-width:72ch;margin:0 auto;padding:4rem 2rem 10rem}
        .r-meta{display:flex;flex-wrap:wrap;gap:1.2rem;align-items:center;padding-bottom:2rem;border-bottom:1px solid var(--ash);margin-bottom:3rem;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dust)}
        .r-author{color:var(--gold);font-weight:600}
        .r-sep{color:var(--ash)}
        .prose-lead{font-family:var(--serif);font-size:1.2rem;line-height:1.8;color:var(--cream);font-style:italic;margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid var(--ash)}
        .prose p{font-family:var(--serif);font-size:1.05rem;line-height:1.85;color:#bdb6a5;margin-bottom:1.6rem}
        .prose h3{font-family:var(--sans);font-size:1rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--cream);margin:3.5rem 0 1.2rem;padding-left:1rem;border-left:3px solid var(--gold);line-height:1.3}
        .prose hr{border:none;border-top:1px solid var(--ash);margin:2.5rem 0}
        .prose pre{background:#0d0c08;border:1px solid var(--ash);border-left:3px solid var(--gold);padding:1.6rem;overflow-x:auto;font-family:var(--mono);font-size:.76rem;line-height:1.75;color:#9e9580;margin:2rem 0;position:relative;white-space:pre}
        .prose pre::before{content:'CODE';position:absolute;top:.6rem;right:.8rem;font-size:.45rem;letter-spacing:.25em;color:var(--gold-dim);font-family:var(--sans)}
        .prose code{font-family:var(--mono);font-size:.88em;color:var(--gold);background:rgba(184,151,90,.08);padding:.1em .4em}
        .prose strong{color:var(--cream);font-weight:700}
        .pq{margin:2.5rem -1.5rem;padding:1.5rem 2rem 1.5rem 2.5rem;background:var(--smoke);border-left:4px solid var(--gold);position:relative}
        .pq::before{content:'"';font-family:var(--serif);font-size:5rem;line-height:.8;color:rgba(184,151,90,.12);position:absolute;top:.5rem;left:.8rem;pointer-events:none}
        .pq p{font-family:var(--serif)!important;font-style:italic;font-size:1.2rem!important;line-height:1.5!important;color:var(--cream)!important;margin:0!important;position:relative;z-index:1}
        .prose-img{width:100%;margin:2.5rem 0;position:relative;overflow:hidden;border:1px solid var(--ash)}
        .prose-img img{width:100%;display:block;object-fit:cover;max-height:460px;filter:brightness(.9) grayscale(8%)}
        .prose-img-cap{padding:.6rem .9rem;background:var(--smoke);font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dust);border-top:1px solid var(--ash);display:flex;align-items:center;gap:.6rem}
        .prose-img-cap::before{content:'Fig.';color:var(--gold)}
        .prose-slot{width:100%;aspect-ratio:16/9;background:var(--smoke);border:1px solid var(--ash);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;margin:2.5rem 0;position:relative;overflow:hidden}
        .prose-slot-corner{position:absolute;width:.5rem;height:.5rem;border:1px solid var(--gold-dim)}
        .prose-slot-corner.tl{top:.5rem;left:.5rem;border-right:none;border-bottom:none}
        .prose-slot-corner.br{bottom:.5rem;right:.5rem;border-left:none;border-top:none}
        .prose-slot-inner{display:flex;flex-direction:column;align-items:center;gap:.7rem}
        .prose-slot-icon{width:44px;height:44px;border:1px solid var(--ash);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--ash)}
        .prose-slot-lbl{font-size:.52rem;letter-spacing:.25em;text-transform:uppercase;color:var(--dust)}
        .prose-slot-hint{font-size:.48rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ash);margin-top:.2rem}
        @media(max-width:900px){
          .r-nav{padding:.8rem 1.2rem}
          .r-hero-info{padding:2rem 1.5rem 2.5rem}
          .r-hero-blank{padding:3rem 1.5rem 2rem}
          .r-article{padding:2.5rem 1.2rem 7rem}
          .pq{margin:2rem -.5rem}
        }
      `}</style>

      <div className="reader" ref={ref} onScroll={onScroll}>
        <div className="r-progress" style={{ width: `${pct}%` }} />

        <nav className="r-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="r-back" onClick={() => router.back()}>← Back</button>
            <button className="r-back" onClick={() => router.push('/')}>⌂</button>
          </div>
          <span className="r-nav-title">{blog.title}</span>
          <div className="r-nav-right">
            <span className="r-pct-star">✦</span>
            {pct}% · {blog.readTime}
          </div>
        </nav>

        {blog.image ? (
          <div className="r-hero">
            <img src={blog.image} alt={blog.title} />
            <div className="r-hero-grad" />
            <div className="r-hero-info">
              <div className="r-hero-eye">{blog.tags?.[0]} · {fmtDate(blog.date || '')}</div>
              <h1 className="r-hero-h1">{blog.title}</h1>
            </div>
          </div>
        ) : (
          <div className="r-hero-blank">
            <div className="r-hero-eye">{blog.tags?.[0]} · {fmtDate(blog.date || '')}</div>
            <h1 className="r-hero-h1">{blog.title}</h1>
          </div>
        )}

        <div className="r-article">
          <div className="r-meta">
            <span className="r-author">{blog.author}</span>
            <span className="r-sep">·</span>
            <span>{fmtDate(blog.date || '')}</span>
            <span className="r-sep">·</span>
            <span>{blog.readTime}</span>
            <span className="r-sep">·</span>
            {blog.tags?.map(t => <span key={t}>#{t}</span>)}
          </div>
          <Prose content={blog.content} sectionImages={blog.sectionImages} />
        </div>
      </div>
    </>
  )
}