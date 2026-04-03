'use client'
import BlogMagazineCarousel from './BlogMagazineCarousel'
import { useState, useEffect, useRef, useCallback } from 'react'
import { BlogPost } from '@/types/blog'
import FadeIn from './FadeIn'
import { useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────
   NOTE: BlogPost type needs `sectionImages?: string[]`
   Add this field to your @/types/blog if it isn't there yet.
───────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

:root{
  --ink:#0a0905;
  --gold:#b8975a;
  --gold-dim:#7a6038;
  --smoke:#161310;
  --ash:#2a2720;
  --dust:#6b6455;
  --fog:#9c9080;
  --cream:#e8e0d0;
  --serif:'Libre Baskerville',Georgia,serif;
  --sans:'Syne',sans-serif;
  --mono:'Fira Code',monospace;
}

.br{min-height:100vh;background:var(--ink);color:var(--cream);font-family:var(--sans);overflow-x:hidden;position:relative}
.br::before{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events:none;z-index:999;mix-blend-mode:overlay;
}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes revealDown{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0% 0)}}
@keyframes imgIn{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:scale(1)}}

/* ── MASTHEAD ── */
.mast{padding:3.5rem 4rem 0;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) both}
.mast-eye{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--dust);margin-bottom:1.5rem;display:flex;align-items:center;gap:.8rem}
.mast-eye::before{content:'';width:2.5rem;height:1px;background:var(--gold)}
.mast-title{font-family:var(--serif);font-size:clamp(4rem,9vw,8rem);font-weight:700;line-height:.9;color:var(--cream);letter-spacing:-.02em}
.mast-title em{font-style:italic;color:var(--gold)}
.mast-sub{margin-top:1.2rem;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--dust);line-height:1.8}
.divider{height:1px;background:linear-gradient(90deg,var(--gold),var(--ash) 60%,transparent);transform-origin:left;animation:scaleX .8s .3s cubic-bezier(.16,1,.3,1) both;margin:2.5rem 4rem 0}

/* ── TICKER ── */
.ticker-wrap{overflow:hidden;border-top:1px solid var(--ash);border-bottom:1px solid var(--ash);padding:.6rem 0;margin:1.8rem 0 0;background:var(--smoke)}
.ticker-track{display:flex;gap:2.5rem;white-space:nowrap;animation:ticker 30s linear infinite;width:max-content}
.ticker-track span{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dust)}
.ticker-track b{color:var(--gold);font-weight:500}
.ticker-track .tsep{color:var(--ash)}

/* ── FILTERS ── */
.filters{padding:2rem 4rem 1.5rem;display:flex;align-items:center;gap:.8rem;flex-wrap:wrap;animation:fadeUp .6s .15s cubic-bezier(.16,1,.3,1) both}
.f-label{font-size:.58rem;letter-spacing:.25em;text-transform:uppercase;color:var(--dust);margin-right:.4rem}
.f-btn{background:transparent;border:1px solid var(--ash);color:var(--dust);font-family:var(--sans);font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;padding:.38rem .85rem;cursor:pointer;transition:border-color .2s,color .2s,background .2s}
.f-btn:hover{border-color:var(--gold-dim);color:var(--cream)}
.f-btn.on{border-color:var(--gold);color:var(--gold);background:rgba(184,151,90,.07)}

/* ── GRID ── */
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:1px;background:var(--ash);margin:0 4rem 8rem;border:1px solid var(--ash)}
.c-hero  {grid-column:span 7;grid-row:span 2}
.c-tall  {grid-column:span 5;grid-row:span 2}
.c-wide  {grid-column:span 7}
.c-mid   {grid-column:span 5}
.c-third {grid-column:span 4}
.c-half  {grid-column:span 6}

/* ── CARD ── */
.card{background:var(--ink);position:relative;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;transition:background .3s}
.card:hover{background:var(--smoke)}
.c-tall{flex-direction:row}
.c-tall .card-img-wrap{width:50%;flex-shrink:0}
.c-tall .card-body{flex:1}
.card-img-wrap{width:100%;overflow:hidden;position:relative;flex-shrink:0}
.c-hero .card-img-wrap{aspect-ratio:16/9}
.c-tall .card-img-wrap{aspect-ratio:unset;height:100%;min-height:220px}
.c-wide .card-img-wrap,.c-mid .card-img-wrap{aspect-ratio:16/8}
.c-third .card-img-wrap,.c-half .card-img-wrap{aspect-ratio:16/9}
.card-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .5s;filter:grayscale(20%) brightness(.82)}
.card:hover .card-img-wrap img{transform:scale(1.05);filter:grayscale(0%) brightness(.95)}

/* placeholder */
.img-ph{width:100%;height:100%;min-height:180px;background:linear-gradient(145deg,#121008,#1c1810,#0e0c08);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;position:relative;overflow:hidden}
.img-ph::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(184,151,90,.04),transparent);background-size:200% 100%;animation:shimmer 3s ease infinite}
.img-ph-num{font-family:var(--serif);font-size:5rem;font-weight:700;color:rgba(184,151,90,.07);line-height:1;user-select:none}
.img-ph-lbl{font-size:.5rem;letter-spacing:.3em;text-transform:uppercase;color:var(--ash)}
.img-ph-frame{position:absolute;inset:.6rem;border:1px solid rgba(184,151,90,.06);pointer-events:none}
.img-ph-frame::before,.img-ph-frame::after{content:'';position:absolute;width:.4rem;height:.4rem;border:1px solid var(--gold-dim)}
.img-ph-frame::before{top:-.5px;left:-.5px;border-right:none;border-bottom:none}
.img-ph-frame::after{bottom:-.5px;right:-.5px;border-left:none;border-top:none}

.card-num{position:absolute;top:.8rem;left:.8rem;z-index:2;font-size:.52rem;letter-spacing:.1em;background:rgba(10,9,5,.85);border:1px solid var(--ash);color:var(--dust);padding:.22rem .48rem;backdrop-filter:blur(8px)}
.card-badge{position:absolute;top:.8rem;right:.8rem;z-index:2;font-size:.52rem;letter-spacing:.15em;text-transform:uppercase;background:var(--gold);color:var(--ink);padding:.22rem .55rem;font-weight:600}
.card-body{padding:1.5rem 1.6rem 2.2rem;display:flex;flex-direction:column;gap:.7rem;flex:1;position:relative}
.c-hero .card-body{padding:2rem 2.2rem 2.5rem}
.card-meta{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;color:var(--dust)}
.mdot{width:3px;height:3px;background:var(--gold);border-radius:50%;flex-shrink:0}
.card-title{font-family:var(--serif);font-weight:700;line-height:1.15;color:var(--cream);transition:color .25s}
.c-hero .card-title{font-size:clamp(1.5rem,2.8vw,2.4rem)}
.c-tall .card-title{font-size:1.25rem}
.c-wide .card-title{font-size:1.15rem}
.c-mid .card-title,.c-third .card-title,.c-half .card-title{font-size:1rem}
.card:hover .card-title{color:var(--gold)}
.card-excerpt{font-family:var(--serif);font-style:italic;font-size:.88rem;line-height:1.7;color:var(--dust);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.c-hero .card-excerpt{-webkit-line-clamp:4;font-size:.93rem}
.card-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:auto;padding-top:.4rem}
.chip{font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--ash);color:var(--dust);padding:.18rem .5rem;transition:border-color .2s,color .2s}
.card:hover .chip{border-color:var(--gold-dim);color:var(--fog)}
.card-arrow{position:absolute;bottom:1.4rem;right:1.4rem;width:1.8rem;height:1.8rem;border:1px solid var(--ash);display:flex;align-items:center;justify-content:center;color:var(--dust);font-size:.85rem;transition:all .25s}
.card:hover .card-arrow{border-color:var(--gold);color:var(--gold);transform:translate(2px,-2px)}
.card-enter{opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .5s ease}
.card-enter.in{opacity:1;transform:translateY(0)}

/* ═════════════════════
   READER
═════════════════════ */
.reader{position:fixed;inset:0;z-index:800;background:var(--ink);overflow-y:auto;overflow-x:hidden;animation:fadeIn .3s ease both}
.r-progress{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),#8c2020);z-index:810;transition:width .1s linear}
.r-nav{position:sticky;top:0;z-index:805;background:rgba(10,9,5,.93);backdrop-filter:blur(20px);border-bottom:1px solid var(--ash);padding:.9rem 3rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.r-back{background:none;border:1px solid var(--ash);color:var(--dust);font-family:var(--sans);font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;padding:.42rem .9rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:.5rem;flex-shrink:0}
.r-back:hover{border-color:var(--gold);color:var(--gold)}
.r-nav-title{font-family:var(--serif);font-size:.82rem;color:var(--fog);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:50%;font-style:italic}
.r-nav-right{font-size:.56rem;letter-spacing:.15em;text-transform:uppercase;color:var(--dust);flex-shrink:0;display:flex;align-items:center;gap:.6rem}
.r-pct-star{color:var(--gold);animation:pulse 2s ease infinite}

/* hero */
.r-hero{width:100%;position:relative;overflow:hidden}
.r-hero img{width:100%;max-height:70vh;object-fit:cover;display:block;filter:brightness(.52) grayscale(12%);animation:revealDown .8s cubic-bezier(.16,1,.3,1) both}
.r-hero-grad{position:absolute;inset:0;background:linear-gradient(to top,var(--ink) 0%,rgba(10,9,5,.2) 60%,transparent 100%)}
.r-hero-info{position:absolute;bottom:0;left:0;right:0;padding:3rem 4rem 3.5rem;animation:fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both}
.r-hero-eye{font-size:.58rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:flex;align-items:center;gap:.7rem}
.r-hero-eye::before{content:'';width:2rem;height:1px;background:var(--gold)}
.r-hero-h1{font-family:var(--serif);font-size:clamp(2rem,5vw,4.5rem);font-weight:700;line-height:1.0;color:var(--cream)}
.r-hero-blank{width:100%;padding:5rem 4rem 3.5rem;position:relative;overflow:hidden;border-bottom:1px solid var(--ash)}
.r-hero-blank-bg{position:absolute;right:3rem;top:50%;transform:translateY(-50%);font-family:var(--serif);font-size:14rem;font-weight:700;line-height:1;color:rgba(184,151,90,.04);user-select:none;pointer-events:none}

/* article */
.r-article{max-width:72ch;margin:0 auto;padding:4rem 2rem 10rem;animation:fadeUp .6s .15s cubic-bezier(.16,1,.3,1) both}
.r-meta{display:flex;flex-wrap:wrap;gap:1.2rem;align-items:center;padding-bottom:2rem;border-bottom:1px solid var(--ash);margin-bottom:3rem;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dust)}
.r-author{color:var(--gold);font-weight:600}
.r-sep{color:var(--ash)}

/* prose */
.prose-lead{font-family:var(--serif);font-size:1.2rem;line-height:1.8;color:var(--cream);font-style:italic;margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid var(--ash)}
.prose p{font-family:var(--serif);font-size:1.05rem;line-height:1.85;color:#bdb6a5;margin-bottom:1.6rem}
.prose h3{font-family:var(--sans);font-size:1rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--cream);margin:3.5rem 0 1.2rem;padding-left:1rem;border-left:3px solid var(--gold);line-height:1.3}
.prose hr{border:none;border-top:1px solid var(--ash);margin:2.5rem 0}
.prose pre{background:#0d0c08;border:1px solid var(--ash);border-left:3px solid var(--gold);padding:1.6rem;overflow-x:auto;font-family:var(--mono);font-size:.76rem;line-height:1.75;color:#9e9580;margin:2rem 0;position:relative;white-space:pre}
.prose pre::before{content:'CODE';position:absolute;top:.6rem;right:.8rem;font-size:.45rem;letter-spacing:.25em;color:var(--gold-dim);font-family:var(--sans)}
.prose code{font-family:var(--mono);font-size:.88em;color:var(--gold);background:rgba(184,151,90,.08);padding:.1em .4em}
.prose strong{color:var(--cream);font-weight:700}

/* pull-quote */
.pq{margin:2.5rem -1.5rem;padding:1.5rem 2rem 1.5rem 2.5rem;background:var(--smoke);border-left:4px solid var(--gold);position:relative}
.pq::before{content:'"';font-family:var(--serif);font-size:5rem;line-height:.8;color:rgba(184,151,90,.12);position:absolute;top:.5rem;left:.8rem;pointer-events:none}
.pq p{font-family:var(--serif)!important;font-style:italic;font-size:1.2rem!important;line-height:1.5!important;color:var(--cream)!important;margin:0!important;position:relative;z-index:1}

/* ── SECTION IMAGE — the real one ── */
.prose-img{
  width:100%;margin:2.5rem 0;
  position:relative;overflow:hidden;
  border:1px solid var(--ash);
}
.prose-img img{
  width:100%;display:block;
  object-fit:cover;
  max-height:460px;
  filter:brightness(.9) grayscale(8%);
  animation:imgIn .5s cubic-bezier(.16,1,.3,1) both;
  transition:filter .4s;
}
.prose-img:hover img{filter:brightness(1) grayscale(0%)}
.prose-img-cap{
  padding:.6rem .9rem;
  background:var(--smoke);
  font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--dust);border-top:1px solid var(--ash);
  display:flex;align-items:center;gap:.6rem;
}
.prose-img-cap::before{content:'Fig.';color:var(--gold)}

/* ── SECTION IMAGE — placeholder ── */
.prose-slot{width:100%;aspect-ratio:16/9;background:var(--smoke);border:1px solid var(--ash);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;margin:2.5rem 0;position:relative;overflow:hidden}
.prose-slot-corner{position:absolute;width:.5rem;height:.5rem;border:1px solid var(--gold-dim)}
.prose-slot-corner.tl{top:.5rem;left:.5rem;border-right:none;border-bottom:none}
.prose-slot-corner.br{bottom:.5rem;right:.5rem;border-left:none;border-top:none}
.prose-slot-inner{display:flex;flex-direction:column;align-items:center;gap:.7rem}
.prose-slot-icon{width:44px;height:44px;border:1px solid var(--ash);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--ash)}
.prose-slot-lbl{font-size:.52rem;letter-spacing:.25em;text-transform:uppercase;color:var(--dust)}
.prose-slot-hint{font-size:.48rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ash);margin-top:.2rem}

/* ── responsive ── */
@media(max-width:900px){
  .mast{padding:2.5rem 1.5rem 0}
  .divider{margin:2rem 1.5rem 0}
  .filters{padding:1.5rem 1.5rem 1rem}
  .grid{margin:0 1.5rem 5rem}
  .c-hero,.c-tall,.c-wide,.c-mid,.c-third,.c-half{grid-column:span 12;grid-row:auto}
  .c-tall{flex-direction:column}
  .c-tall .card-img-wrap{width:100%;min-height:0;aspect-ratio:16/9;height:auto}
  .r-nav{padding:.8rem 1.2rem}
  .r-hero-info{padding:2rem 1.5rem 2.5rem}
  .r-hero-blank{padding:3rem 1.5rem 2rem}
  .r-hero-blank-bg{font-size:7rem;right:1.5rem}
  .r-article{padding:2.5rem 1.2rem 7rem}
  .pq{margin:2rem -.5rem}
}
`

/* ─── helpers ─── */
function excerpt(c: string, len = 190) {
  return c.replace(/#{1,6}\s.*/g,'').replace(/`{1,3}[\s\S]*?`{1,3}/g,'').replace(/---/g,'').replace(/\n+/g,' ').trim().slice(0,len) + '…'
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})
}
const PATTERNS = [
  ['c-hero','c-tall'],
  ['c-wide','c-mid'],
  ['c-third','c-third','c-third'],
  ['c-half','c-half'],
]
function cardClass(idx: number) {
  let i = idx, row = 0
  while (true) {
    const p = PATTERNS[row % PATTERNS.length]
    if (i < p.length) return p[i]
    i -= p.length; row++
  }
}

/* ─── Card image box ─── */
function ImgBox({ src, alt, n }: { src?: string; alt?: string; n: number }) {
  if (src) return <div className="card-img-wrap"><img src={src} alt={alt ?? ''} loading="lazy" /></div>
  return (
    <div className="card-img-wrap">
      <div className="img-ph">
        <div className="img-ph-num">{String(n).padStart(2,'0')}</div>
        <div className="img-ph-lbl">Add cover image via blogs.ts</div>
        <div className="img-ph-frame" />
      </div>
    </div>
  )
}

/* ─── Card ─── */
function Card({ blog, idx, onClick }: { blog: BlogPost; idx: number; onClick(): void }) {
  const ref = useRef<HTMLDivElement>(null)
  const cls = cardClass(idx)
  const showExcerpt = cls === 'c-hero' || cls === 'c-tall' || cls === 'c-wide'
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); ob.disconnect() }
    }, { threshold: .08 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <article
      ref={ref}
      className={`card ${cls} card-enter`}
      style={{ transitionDelay: `${(idx % 3) * .07}s` }}
      onClick={onClick}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <span className="card-num">{String(idx + 1).padStart(2,'0')}</span>
      {blog.tags?.[0] && <span className="card-badge">{blog.tags[0]}</span>}
      <ImgBox src={blog.image || ''} alt={blog.title} n={idx + 1} />
      <div className="card-body">
        <div className="card-meta">
          <span>{fmtDate(blog.date || '')}</span>
          <span className="mdot" />
          <span>{blog.readTime}</span>
          <span className="mdot" />
          <span>{blog.author}</span>
        </div>
        <h2 className="card-title">{blog.title}</h2>
        {showExcerpt && <p className="card-excerpt">{excerpt(blog.content)}</p>}
        <div className="card-chips">
          {blog.tags?.slice(0,3).map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <div className="card-arrow">→</div>
      </div>
    </article>
  )
}

/* ─── Prose renderer ─── */
function inlineJSX(t: string): React.ReactNode {
  return t.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((p,i) => {
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1,-1)}</code>
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2,-2)}</strong>
    return p
  })
}

const PQ_STARTERS = [
  'A project answers','The hook is','Three layers',
  'Most teams arrive','This is the clearest',
  'The real reason','What made it work',
  'False positives are','Semantic search is not',
  'Pixel reconstruction teaches',
]

interface ProseProps {
  content: string
  sectionImages?: string[]
}

function Prose({ content, sectionImages = [] }: ProseProps) {
  const elems: React.ReactNode[] = []
  const lines = content.split('\n')
  let code: string[] = [], inCode = false
  let slotIdx = 0   // which sectionImages entry to use next
  let figN = 0      // figure number for captions
  let isFirst = true
  let pqCount = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // code fence
    if (line.startsWith('```')) {
      inCode = !inCode
      if (!inCode && code.length) {
        elems.push(<pre key={`c${i}`}>{code.join('\n')}</pre>)
        code = []
      }
      continue
    }
    if (inCode) { code.push(line); continue }

    // section heading → inject image slot or real image BEFORE the heading
    if (line.startsWith('### ')) {
      const imgSrc = sectionImages[slotIdx] || ''
      figN++

      if (imgSrc) {
        // Real image provided — render it
        elems.push(
          <div key={`img${i}`} className="prose-img">
            <img src={imgSrc} alt={line.replace('### ','')} loading="lazy" />
            <div className="prose-img-cap">
              {String(figN).padStart(2,'0')} — {line.replace('### ','')}
            </div>
          </div>
        )
      } else {
        // Placeholder — shows path hint from blogs.ts position
        elems.push(
          <div key={`slot${i}`} className="prose-slot">
            <div className="prose-slot-corner tl" />
            <div className="prose-slot-corner br" />
            <div className="prose-slot-inner">
              <div className="prose-slot-icon">◻</div>
              <span className="prose-slot-lbl">Fig. {String(figN).padStart(2,'0')} — Image slot</span>
              <span className="prose-slot-hint">
                Add path to sectionImages[{slotIdx}] in blogs.ts
              </span>
            </div>
          </div>
        )
      }

      slotIdx++
      elems.push(<h3 key={`h${i}`}>{line.replace('### ','')}</h3>)
      continue
    }

    if (line === '---') { elems.push(<hr key={`hr${i}`} />); continue }
    if (!line.trim()) continue

    // first real paragraph → lead style
    if (isFirst && line.length > 40) {
      elems.push(<p key={`lead${i}`} className="prose-lead">{inlineJSX(line)}</p>)
      isFirst = false; continue
    }

    // pull quote detection
    if (pqCount < 3 && line.length < 160 && PQ_STARTERS.some(s => line.startsWith(s))) {
      elems.push(<div key={`pq${i}`} className="pq"><p>{inlineJSX(line)}</p></div>)
      pqCount++; continue
    }

    elems.push(<p key={`p${i}`}>{inlineJSX(line)}</p>)
  }

  return <div className="prose">{elems}</div>
}

/* ─── Reader ─── */
function Reader({ blog, onClose }: { blog: BlogPost & { sectionImages?: string[] }; onClose(): void }) {
  const [pct, setPct] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    const el = ref.current; if (!el) return
    setPct(Math.min(100, Math.round(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100)))
  }, [])

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="reader" ref={ref} onScroll={onScroll}>
      <div className="r-progress" style={{ width: `${pct}%` }} />

      <nav className="r-nav">
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <button className="r-back" onClick={onClose}>
      ← Back
    </button>

    <button
      className="r-back"
      onClick={() => window.location.href = '/'}
    >
      ⌂
    </button>
  </div>

  <span className="r-nav-title">{blog.title}</span>

  <div className="r-nav-right">
    <span className="r-pct-star">✦</span>
    {pct}% · {blog.readTime}
  </div>
</nav>

      {blog.image ? (
        <div className="r-hero">
          <img src={blog.image || ''} alt={blog.title} />
          <div className="r-hero-grad" />
          <div className="r-hero-info">
            <div className="r-hero-eye">{blog.tags?.[0] || ''} · {fmtDate(blog.date || '')}</div>
            <h1 className="r-hero-h1">{blog.title}</h1>
          </div>
        </div>
      ) : (
        <div className="r-hero-blank">
          <div className="r-hero-blank-bg">01</div>
          <div style={{fontSize:'.58rem',letterSpacing:'.25em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'.7rem'}}>
            <span style={{display:'inline-block',width:'2rem',height:'1px',background:'var(--gold)'}} />
            {blog.tags?.[0] || ''} · {fmtDate(blog.date || '')}
          </div>
          <h1 style={{fontFamily:'var(--serif)',fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:700,lineHeight:1.05,color:'var(--cream)'}}>
            {blog.title}
          </h1>
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
        <Prose content={blog.content} sectionImages={blog.sectionImages || []} />
      </div>
    </div>
  )
}

/* ─── Ticker ─── */
function Ticker({ blogs }: { blogs: BlogPost[] }) {
  const items = blogs.flatMap(b => [
    <span key={b.id}><b>{b.title}</b></span>,
    <span key={b.id+'s'} className="tsep">·</span>,
    <span key={b.id+'r'}>{b.readTime}</span>,
    <span key={b.id+'d'} className="tsep">✦</span>,
  ])
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">{items}{items}</div>
    </div>
  )
}


/* ─── Main ─── */
export default function BlogsListClient({ blogs }: { blogs: BlogPost[] }) {
  const navigate = useNavigate()
  const [active, setActive] = useState<(BlogPost & { sectionImages?: string[] }) | null>(null)
  const [filter, setFilter] = useState('All')

  const allTags = ['All', ...Array.from(new Set(blogs.flatMap(b => b.tags ?? [])))]
  const shown = filter === 'All' ? blogs : blogs.filter(b => b.tags?.includes(filter))

return (
  <>
    <style dangerouslySetInnerHTML={{ __html: CSS }} />

    <div className="br">
      
      <header className="mast" style={{ position: 'relative' }}>
        
        {/* ✅ HOME BUTTON (FadeIn + Vite navigation) */}
        <FadeIn delay={0.2}>
          <button
            className="r-back"
            style={{
              position: 'absolute',
              top: '10px',
              left: '4rem',
              zIndex: 10
            }}
            onClick={() => navigate('/')}
          >
            ⌂ Home
          </button>
        </FadeIn>

        <div className="mast-eye">Field Notes & Build Logs</div>
        <h1 className="mast-title">
          Written<br /><em>Works</em>
        </h1>
        <p className="mast-sub">
          Technical writings, project post-mortems,<br />
          and lessons from building real things.
        </p>
      </header>

      <div className="divider" />

      <Ticker blogs={blogs} />

      <div className="filters">
        <span className="f-label">Filter</span>
        {allTags.map(t => (
          <button
            key={t}
            className={`f-btn${filter === t ? ' on' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid">
        {shown.map((blog, i) => (
          <Card
            key={blog.id}
            blog={blog}
            idx={i}
            onClick={() => setActive(blog as any)}
          />
        ))}
      </div>
    </div>

    {active && <Reader blog={active} onClose={() => setActive(null)} />}
  </>
)
}