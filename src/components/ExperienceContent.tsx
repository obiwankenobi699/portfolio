'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Globe, Linkedin } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements?: string[];
  href?: string;
  logoUrl?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  status?: 'Working' | 'Past' | 'Contract';
}

export default function ExperienceContent() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const experiences: ExperienceItem[] = [
    {
      company: "Stealth Startup",
      position: "Founding Engineer",
      duration: "September 2025 – January 2026",
      description: "Architected an AI-driven voice agent platform for financial advisory with real-time pipelines and secure, compliant workflows.",
      location: undefined,
      website: "",
      linkedin: "",
      status: "Past",
      achievements: [
        "Built real-time STT/TTS pipelines and RAG with vector DBs (Qdrant/Pinecone); designed multi‑agent workflows achieving sub‑second latency and 60% faster query resolution.",
        "Engineered Next.js + Tailwind dashboards with autonomous regulatory filters and end‑to‑end encryption to achieve 100% SEBI/RBI compliance.",
      ],
      href: "",
      logoUrl: "/stealth.png",
    },
  ]

  const abbreviateDuration = (duration: string) => {
    const map: Record<string, string> = {
      January: 'Jan',
      February: 'Feb',
      March: 'Mar',
      April: 'Apr',
      May: 'May',
      June: 'Jun',
      July: 'Jul',
      August: 'Aug',
      September: 'Sep',
      October: 'Oct',
      November: 'Nov',
      December: 'Dec',
    }
    return duration.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => map[m])
  }

  const toggleExpanded = (company: string) => {
    setExpanded(prev => ({
      ...prev,
      [company]: !prev[company]
    }))
  }

  return (
    <div className="space-y-3 dark:text-white/70 text-black/70 pb-1 sm:pb-2">
      {experiences.map((exp) => {
        const isExpanded = expanded[exp.company]

        return (
          <div key={exp.company} className="rounded-lg p-2.5 sm:p-3">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Logo (rounded square) */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-[10px] bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0 mt-0.5 ring-1 ring-neutral-300/50 dark:ring-neutral-700/60">
                {exp.logoUrl ? (
                  <Image
                    src={exp.logoUrl}
                    alt={exp.company}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[12px] sm:text-lg font-medium dark:text-white text-black">
                    {exp.company.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info block */}
              <div className="flex-1 min-w-0">
                {/* Top row: company + links + status (left)  and dates/location (right) */}
                <div className="flex items-baseline sm:items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium dark:text-white text-black text-[13px] sm:text-[15px] leading-none">
                        {exp.href ? (
                          <Link
                            href={exp.href}
                            target="_blank"
                            className="hover:text-[#0A84FF] transition-colors"
                          >
                            {exp.company}
                          </Link>
                        ) : (
                          exp.company
                        )}
                      </h3>
                      <div className="flex items-center gap-1">
                        {exp.website && (
                          <Link href={exp.website} target="_blank" aria-label={`${exp.company} website`} className="opacity-60 hover:opacity-100 transition-opacity">
                            <Globe className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {exp.linkedin && (
                          <Link href={exp.linkedin} target="_blank" aria-label={`${exp.company} LinkedIn`} className="opacity-60 hover:opacity-100 transition-opacity">
                            <Linkedin className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {exp.status === 'Working' && (
                          <span className={`ml-1 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium
                            ${exp.status === 'Working' ? 'bg-emerald-600/20 text-emerald-500 ring-1 ring-emerald-500/30' :
                              exp.status === 'Contract' ? 'bg-amber-600/20 text-amber-500 ring-1 ring-amber-500/30' :
                                'bg-neutral-500/20 text-neutral-400 ring-1 ring-neutral-500/30'}`}>
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                            {exp.status}
                          </span>
                        )}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => toggleExpanded(exp.company)}
                                className="ml-0.5 shrink-0 p-0.5 sm:p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                aria-expanded={isExpanded}
                                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                              >
                                <ChevronDown
                                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isExpanded ? 'Collapse details' : 'Expand details'}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    {/* Role below company */}
                    <p className="text-[10px] sm:text-sm opacity-70 mt-0.5 leading-none">
                      {exp.position}
                    </p>
                  </div>
                  <div className="shrink-0 text-right leading-none relative top-[2px] sm:top-0">
                    <div className="text-[10px] opacity-60 tabular-nums sm:hidden whitespace-nowrap">{abbreviateDuration(exp.duration)}</div>
                    <div className="hidden sm:block text-xs opacity-60 tabular-nums whitespace-nowrap">{exp.duration}</div>
                    {exp.location && (
                      <div className="text-[10px] sm:text-xs opacity-50 leading-tight">{exp.location}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chevron moved next to status pill */}
            </div>

            {exp.achievements && exp.achievements.length > 0 && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <ul className="space-y-2.5 text-xs sm:text-sm opacity-80">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#0A84FF] shrink-0 mt-1.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
