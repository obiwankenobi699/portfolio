'use client'
// src/components/VaultSection.tsx

import { useEffect, useState, useRef } from 'react'

const OWNER     = 'obiwankenobi699'
const REPO      = 'Quartz'
const VAULT_URL = 'https://neuralvaults.vercel.app'
const API       = `https://api.github.com/repos/${OWNER}/${REPO}/contents/content`

interface TreeNode {
  name:       string
  path:       string
  noteCount?: number
  children?:  { name: string; path: string }[]
}

interface VaultStats {
  totalNotes:   number
  totalFolders: number
  recentNotes:  { name: string; path: string }[]
  tree:         TreeNode[]
}

async function get(path: string): Promise<any[]> {
  const res = await fetch(
    path ? `${API}/${path}` : API,
    { headers: { Accept: 'application/vnd.github+json' } }
  )
  return res.ok ? res.json() : []
}

async function buildStats(): Promise<VaultStats> {
  const root  = await get('')
  const dirs  = root.filter((i: any) => i.type === 'dir'  && !i.name.startsWith('_') && !i.name.startsWith('.'))
  const files = root.filter((i: any) => i.type === 'file' && i.name.endsWith('.md') && !i.name.startsWith('_'))

  let totalNotes   = files.length
  let totalFolders = dirs.length
  const recentNotes: { name: string; path: string }[] = []
  const tree: TreeNode[] = []

  for (const dir of dirs) {
    const children = await get(dir.name)
    const mdFiles  = children.filter((c: any) => c.type === 'file' && c.name.endsWith('.md') && !c.name.startsWith('_'))
    const subDirs  = children.filter((c: any) => c.type === 'dir'  && !c.name.startsWith('_'))

    totalNotes += mdFiles.length
    mdFiles.slice(0, 2).forEach((f: any) => {
      if (recentNotes.length < 6)
        recentNotes.push({ name: f.name.replace(/\.md$/, ''), path: f.path })
    })

    tree.push({
      name:      dir.name,
      path:      dir.path,
      noteCount: mdFiles.length,
      children:  subDirs.slice(0, 4).map((s: any) => ({ name: s.name, path: s.path })),
    })
  }

  return { totalNotes, totalFolders, recentNotes, tree }
}

function label(raw: string) {
  return raw.replace(/^\d+_/, '').replace(/_/g, ' ')
}

function noteUrl(filePath: string) {
  return `${VAULT_URL}/${filePath.replace(/^content\//, '').replace(/\.md$/, '')}`
}

function FolderIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function Pulse({ w }: { w: string }) {
  return <div className="h-3 rounded bg-white/[0.04] animate-pulse" style={{ width: w }} />
}

function TreeRow({ node }: { node: TreeNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-1.5 py-[3px] px-2 rounded
          hover:bg-white/[0.05] transition-colors group text-left"
      >
        <span className="text-[#fe8019]/60 group-hover:text-[#fe8019] transition-colors shrink-0">
          <FolderIcon />
        </span>
        <span className="text-[#bdae93] text-[11px] font-mono truncate flex-1
          group-hover:text-[#ebdbb2] transition-colors">
          {label(node.name)}
        </span>
        {(node.noteCount ?? 0) > 0 && (
          <span className="text-[10px] text-[#504945] font-mono shrink-0
            opacity-0 group-hover:opacity-100 transition-opacity">
            {node.noteCount}
          </span>
        )}
      </button>
      {open && node.children && node.children.length > 0 && (
        <div className="pl-4">
          {node.children.map((c: any) => (
            <div key={c.path}
              className="flex items-center gap-1.5 py-[3px] px-2 rounded
                text-[#665c54] hover:text-[#bdae93] transition-colors">
              <FolderIcon />
              <span className="text-[11px] font-mono">{label(c.name)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function VaultSection() {
  const [stats,   setStats]   = useState<VaultStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true
    buildStats()
      .then(s  => { setStats(s); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <section className="w-full py-14 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <p className="text-[10px] font-mono text-[#504945] uppercase tracking-[0.2em] mb-1">
          knowledge base
        </p>
        <h2 className="text-xl font-mono font-semibold text-[#ebdbb2]">
          Neural Vault
        </h2>
        <p className="text-sm text-[#7c6f64] mt-1">
          Notes on engineering, ML, systems and ideas — written while building.
        </p>
      </div>

      <div
        className="max-w-4xl mx-auto rounded-xl border border-white/[0.07]
          overflow-hidden bg-[#1d2021]"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 24px 48px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#181818]
          border-b border-white/[0.05]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#cc241d]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#d79921]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#98971a]/70" />
          <span className="ml-3 text-[11px] font-mono text-[#504945] select-none">
            neural-vault — obsidian
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8bb26]/70 animate-pulse" />
            <span className="text-[10px] font-mono text-[#504945]">live sync</span>
          </div>
        </div>

        <div className="flex" style={{ minHeight: '340px' }}>
          <div className="w-52 shrink-0 border-r border-white/[0.05]
            bg-[#191a1b] py-3 overflow-y-auto">
            <p className="px-2 text-[10px] font-mono text-[#504945]
              uppercase tracking-widest mb-2">Vault</p>

            {loading && (
              <div className="px-2 space-y-2.5 mt-1">
                {['65%','50%','78%','55%','42%','68%'].map((w, i) => <Pulse key={i} w={w} />)}
              </div>
            )}
            {error && (
              <p className="px-2 text-[11px] font-mono text-[#cc241d]/60 mt-2">
                Could not reach GitHub
              </p>
            )}
            {stats && stats.tree.map(n => <TreeRow key={n.path} node={n} />)}
          </div>

          <div className="flex-1 flex flex-col p-5 gap-5 min-w-0">
            <div className="flex gap-2">
              {loading
                ? [1,2,3].map(i => (
                    <div key={i} className="flex-1 h-14 rounded-lg bg-white/[0.03] animate-pulse" />
                  ))
                : [
                    { val: stats!.totalNotes,   lbl: 'notes'   },
                    { val: stats!.totalFolders, lbl: 'folders' },
                    { val: '∞',                 lbl: 'links'   },
                  ].map(({ val, lbl }) => (
                    <div key={lbl}
                      className="flex-1 flex flex-col items-center gap-0.5 py-2.5
                        bg-white/[0.03] border border-white/[0.05] rounded-lg">
                      <span className="text-[#fe8019] font-mono text-base font-semibold leading-none">
                        {val}
                      </span>
                      <span className="text-[#504945] text-[10px] font-mono uppercase tracking-widest mt-1">
                        {lbl}
                      </span>
                    </div>
                  ))
              }
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-[#504945] uppercase tracking-widest mb-2">
                Recent Notes
              </p>
              <div className="space-y-0.5">
                {loading && [1,2,3,4,5].map(i => (
                  <div key={i} className="h-7 rounded bg-white/[0.03] animate-pulse" />
                ))}
                {stats && stats.recentNotes.map(note => (
                  <a
                    key={note.path}
                    href={noteUrl(note.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-1.5 rounded
                      hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="text-[#504945] shrink-0 group-hover:text-[#fe8019]/70 transition-colors">
                      <FileIcon />
                    </span>
                    <span className="text-[#bdae93] text-[11px] font-mono truncate flex-1
                      group-hover:text-[#ebdbb2] transition-colors">
                      {note.name}
                    </span>
                    <span className="text-[#504945] opacity-0 shrink-0 group-hover:opacity-100 transition-opacity">
                      <Arrow />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-[#3c3836]">
                Quartz · auto-deploys on git push
              </span>
              <a
                href={VAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-[#fe8019]/10 border border-[#fe8019]/20 text-[#fe8019]
                  text-[11px] font-mono shrink-0
                  hover:bg-[#fe8019]/20 hover:border-[#fe8019]/40 transition-all duration-200"
              >
                Open Vault
                <span className="group-hover:translate-x-0.5 transition-transform inline-flex">
                  <Arrow />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
