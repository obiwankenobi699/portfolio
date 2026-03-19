'use client'
import Image from "next/image";
import { FaGithub, FaLinkedin, FaPaperclip, FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import NeumorphButton from "./NeumorphButton";
import { VisitorCount } from "./VisitorCount";
import { Tooltip } from "./ui/tooltip-card";

interface ReachoutProps {
  title?: string
  subtitle?: string
  socialLinks?: {
    twitter?: string
    resume?: string
    github?: string
    linkedin?: string
    mail?: string
  }
}

export default function Reachout({
  title = "Let's connect",
  subtitle = "Find me on these platforms",
  socialLinks = {
    twitter: "",
    github: "https://github.com/codewyuu",
    linkedin: "",
    resume: "",
    mail: "mailto:codewyuu@gmail.com"
  }
}: ReachoutProps) {
  return (
    <div className="sm:px-12 px-4 pb-12 sm:pb-14">
      <div className="text-center sm:text-left w-full">
        <div className="mb-3 sm:mb-4">
          <h2 className="font-[family-name:var(--font-hk-grotesk)] text-lg sm:text-xl mb-2 opacity-20 mt-3 sm:mt-4">
            {title}
          </h2>
          <p className="opacity-20 text-md sm:text-lg mb-2 sm:mb-3">
           {subtitle}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
          {socialLinks.github && (
            <Tooltip
              content={
                <div className="w-[300px] sm:w-[340px]">
                  <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/pfp.jpg"
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
                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        0
                      </span>{" "}
                      followers ·{" "}
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        0
                      </span>{" "}
                      following
                    </p>
                  </div>
                </div>
              }
            >
              <a
                className="touch-manipulation active:opacity-75"
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <NeumorphButton className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3 sm:py-2">
                  <FaGithub className="text-[20px] sm:text-[18px] text-neutral-800 dark:text-white/80 shrink-0" />
                  <span className="hidden sm:inline text-sm font-medium text-neutral-800 dark:text-white/80">
                    GitHub
                  </span>
                </NeumorphButton>
              </a>
            </Tooltip>
          )}
          
          {socialLinks.twitter && (
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
              <a
                className="touch-manipulation active:opacity-75"
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <NeumorphButton className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3 sm:py-2">
                  <FaXTwitter className="text-[20px] sm:text-[18px] text-neutral-800 dark:text-white/80 shrink-0" />
                  <span className="hidden sm:inline text-sm font-medium text-neutral-800 dark:text-white/80">
                    Twitter
                  </span>
                </NeumorphButton>
              </a>
            </Tooltip>
          )}
          
          {socialLinks.linkedin && (
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
              <a
                className="touch-manipulation active:opacity-75"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <NeumorphButton className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3 sm:py-2">
                  <FaLinkedin className="text-[20px] sm:text-[18px] text-neutral-800 dark:text-white/80 shrink-0" />
                  <span className="hidden sm:inline text-sm font-medium text-neutral-800 dark:text-white/80">
                    LinkedIn
                  </span>
                </NeumorphButton>
              </a>
            </Tooltip>
          )}

          {socialLinks.mail && (
            <Tooltip content="codewyuu@gmail.com" padded>
              <a
                className="touch-manipulation active:opacity-75"
                href={socialLinks.mail}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <NeumorphButton className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3 sm:py-2">
                  <IoMdMail className="text-[20px] sm:text-[18px] text-neutral-800 dark:text-white/80 shrink-0" />
                  <span className="hidden sm:inline text-sm font-medium text-neutral-800 dark:text-white/80">
                    Mail
                  </span>
                </NeumorphButton>
              </a>
            </Tooltip>
          )}
          
          {socialLinks.resume && (
            <Tooltip content="View my resume" padded>
              <a
                className="touch-manipulation active:opacity-75"
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <NeumorphButton className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3 sm:py-2">
                  <FaPaperclip className="text-[20px] sm:text-[18px] text-neutral-800 dark:text-white/80 shrink-0" />
                  <span className="hidden sm:inline text-sm font-medium text-neutral-800 dark:text-white/80">
                    Resume
                  </span>
                </NeumorphButton>
              </a>
            </Tooltip>
          )}
        </div>
        
        {/* Footer Section */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 text-center sm:text-left">
            <div className="text-sm sm:text-md dark:text-white/40 text-black/40">
              © {new Date().getFullYear()} Yuvraj Sharma.
            </div>
            <VisitorCount className="text-sm sm:text-md dark:text-white/40 text-black/40" />
          </div>
        </div>
      </div>
    </div>
  )
}
