'use client';
import { FaLinkedin, FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import * as React from 'react';
import Image from "next/image";
import { createPortal } from "react-dom";
import { FileText } from "lucide-react";
import { Tooltip } from "./ui/tooltip-card";
import PortfolioStars from './PortfolioStars';
import { Pixelify_Sans } from 'next/font/google';
import { IoMdMail } from "react-icons/io";

const pixelify = Pixelify_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

interface ProfileHeaderProps {
  name?: string
  age?: string
  title?: string
  profileImage?: string
  socialLinks?: {
    twitter?: string
    resume?: string
    github?: string
    linkedin?: string
  }
}

export default function ProfileHeader({
  name = "Yuvraj Sharma",
  age = "",
  title = "research & opensource • full‑stack developer",
  profileImage = "/pfp.jpg",
  socialLinks = {
    twitter: "",
    github: "https://github.com/codewyuu",
    linkedin: "",
    resume: "/cvportfolio.pdf",
  }
}: ProfileHeaderProps) {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false)
  const [resumeViewerSrc, setResumeViewerSrc] = React.useState("")
  const [mounted, setMounted] = React.useState(false)
  const resumeUrl = socialLinks.resume || "/cvportfolio.pdf"
  const isDocFile = /\.(doc|docx)$/i.test(resumeUrl)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isResumeOpen) return
    if (!isDocFile) {
      const cleanUrl = resumeUrl.split("#")[0]
      setResumeViewerSrc(`${cleanUrl}#toolbar=0&navpanes=0&scrollbar=1`)
      return
    }
    if (typeof window === "undefined") return
    const absoluteUrl = resumeUrl.startsWith("http")
      ? resumeUrl
      : new URL(resumeUrl, window.location.origin).toString()
    setResumeViewerSrc(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`)
  }, [isResumeOpen, isDocFile, resumeUrl])

  React.useEffect(() => {
    if (!isResumeOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isResumeOpen])

  return (
    <div className="flex-col -mt-10">
      <div className="flex items-center justify-between mb-4 sm:ml-8 ml-4 sm:mr-8 mr-4">
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 rounded-full overflow-hidden bg-cover bg-center shrink-0"
          role="img"
          aria-label={name}
          style={{ backgroundImage: `url("${profileImage}")` }}
        />
        <PortfolioStars />
      </div>
      <div className="text-left sm:flex sm:justify-between sm:items-center w-full sm:px-8 px-4 flex-col sm:flex-row">
        <div className="px-0">
          <h1 className="font-[family-name:var(--font-instrument-serif)] italic text-2xl sm:text-4xl tracking-[0.01em] font-medium mb-0">
            {name.split('').map((ch, idx) => {
              const baseFont = 'var(--font-instrument-serif)';
              const char = ch === ' ' ? '\u00A0' : ch;
              return (
                <span key={idx} className="relative inline-block align-baseline group">
                  <span 
                    className="transition-opacity duration-200 group-hover:opacity-0"
                    style={{ fontFamily: baseFont }}
                  >
                    {char}
                  </span>
                  <span 
                    className={`${pixelify.className} absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                  >
                    {char}
                  </span>
                </span>
              )
            })}
          </h1>
          <p className="opacity-40 text-xs sm:text-sm">
            {age ? `${age} • ` : ''}{title}
          </p>
          <div className="flex items-center gap-3 mt-2 sm:hidden">
            <button
              type="button"
              aria-label="Resume"
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center justify-center leading-none text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              <FileText className="w-[18px] h-[18px] relative top-0" />
            </button>
            <a href={socialLinks.twitter || '#'} target={socialLinks.twitter ? "_blank" : undefined} aria-label="X (Twitter)" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaXTwitter className="w-[18px] h-[18px]" />
            </a>
            <a href={socialLinks.linkedin || '#'} target={socialLinks.linkedin ? "_blank" : undefined} aria-label="LinkedIn" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaLinkedin className="w-[18px] h-[18px]" />
            </a>
            <a href={socialLinks.github || '#'} target={socialLinks.github ? "_blank" : undefined} aria-label="GitHub" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaGithub className="w-[18px] h-[18px]" />
            </a>
            <a href="#" aria-label="Medium" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaMedium className="w-[18px] h-[18px]" />
            </a>
            <a href="mailto:codewyuu@gmail.com" aria-label="Email" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <IoMdMail className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-0">
          <Tooltip content="View resume" padded>
            <button
              type="button"
              aria-label="Resume"
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center justify-center leading-none text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              <FileText className="w-[18px] h-[18px] relative top-[3px]" />
            </button>
          </Tooltip>
          <Tooltip
            content={
              <Image
                width={1206}
                height={1220}
                src="/twitter.png"
                alt="Twitter"
                className="rounded-sm max-w-full h-auto"
                unoptimized
              />
            }
          >
            <a href={socialLinks.twitter || '#'} target={socialLinks.twitter ? "_blank" : undefined} aria-label="X (Twitter)" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaXTwitter className="w-[18px] h-[18px]" />
            </a>
          </Tooltip>
          <Tooltip
            content={
              <Image
                width={1596}
                height={1108}
                src="/linkedin.png"
                alt="LinkedIn"
                className="rounded-sm max-w-full h-auto"
                unoptimized
              />
            }
          >
            <a href={socialLinks.linkedin || '#'} target={socialLinks.linkedin ? "_blank" : undefined} aria-label="LinkedIn" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaLinkedin className="w-[18px] h-[18px]" />
            </a>
          </Tooltip>
          <Tooltip
            content={
              <div className="w-[300px] sm:w-[340px]">
                <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/pic8.jpeg"
                      alt="Yuvraj Sharma"
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                        Yuvraj Sharma
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        @codewyuu
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-neutral-700 dark:text-neutral-300">
                    Build, ship, grow.
                  </p>
                </div>
              </div>
            }
          >
            <a href={socialLinks.github || '#'} target={socialLinks.github ? "_blank" : undefined} aria-label="GitHub" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaGithub className="w-[18px] h-[18px]" />
            </a>
          </Tooltip>
          <Tooltip content="Medium" padded>
            <a href="#" aria-label="Medium" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <FaMedium className="w-[18px] h-[18px]" />
            </a>
          </Tooltip>
          <Tooltip content="codewyuu@gmail.com" padded>
            <a href="mailto:codewyuu@gmail.com" aria-label="Email" className="text-neutral-500 hover:text-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
              <IoMdMail className="w-[18px] h-[18px]" />
            </a>
          </Tooltip>
        </div>
      </div>
      {mounted && isResumeOpen && createPortal(
        <div className="fixed inset-0 z-[2147483647] bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-3">
          <div className="absolute inset-0" onClick={() => setIsResumeOpen(false)} />
          <div className="relative w-[94vw] h-[86dvh] sm:w-[96vw] sm:h-[94dvh] rounded-2xl overflow-hidden border border-white/20 bg-white dark:bg-neutral-900 shadow-2xl">
            <div className="h-12 px-3 sm:px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-800 dark:text-neutral-200">Resume / CV</p>
              <button
                type="button"
                onClick={() => setIsResumeOpen(false)}
                className="text-sm px-2.5 py-1 rounded-md bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                Close
              </button>
            </div>
            <iframe
              src={resumeViewerSrc || resumeUrl}
              className="w-full h-[calc(100dvh-48px)] sm:h-[calc(94dvh-48px)]"
              title="Resume Viewer"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
