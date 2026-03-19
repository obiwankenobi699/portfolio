'use client'

import Link from 'next/link'
import DiagonalPattern from './DiagonalPattern'
import BannerSection from './BannerSection'
import ProfileHeader from './ProfileHeader'
import { ModeToggle } from '@/components/theme-toggle'
import ContentSection from './ContentSection'
import ContentParagraph from './ContentParagraph'
import SectionBorder from './SectionBorder'
import ExperienceContent from './ExperienceContent'
// Reachout removed
import CallToAction from './CallToAction'
import ContributionsDisplay from './ContributionsDisplay'
import TechStackMarquee from './TechStackMarquee'
import { Reveal } from './Reveal'
import { projects } from '@/data/projects'
import { MasonryProjectCard } from './MasonryProjectCard'
import { blogs } from '@/data/blogs'
import NeumorphButton from './NeumorphButton'
import BlogMagazineCarousel from './BlogMagazineCarousel'
import FooterCredits from './FooterCredits'
import TechStackPills from './TechStackPills'

export default function NewHeroSection() {
  return (
    <div className="min-h-screen transition-colors duration-300 relative pb-24 sm:pb-28" style={{ fontFamily: 'var(--font-hk-grotesk)' }}>
      <div className="relative mx-auto max-w-4xl">
        {/* Diagonal Patterns */}
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />

        {/* Main Content */}
        <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl sm:px-0">
          {/* Banner Section */}
          <Reveal delay={0.1}>
            <BannerSection />
          </Reveal>

          {/* Profile Header */}
          <Reveal delay={0.2}>
            <ProfileHeader
              name="Yuvraj Sharma"
              age="21"
              title="research & opensource"
              profileImage="/pic8.jpeg"
              socialLinks={{
                twitter: "",
                github: "https://github.com/codewyuu",
                linkedin: "",
                resume: "/cvportfolio.pdf",
              }}
            />
          </Reveal>

          {/* Content Prose */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-base">
              {/* Current Role Section */}
              <Reveal delay={0.1}>
                <ContentSection
                  subtitle="AI Engineer | Full-stack Developer"
                  title=''
                  className="mt-3"
                >
                  <div></div>
                </ContentSection>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-3" />
              </Reveal>

              {/* About Section */}
              <Reveal delay={0.1}>
                <ContentSection className="pb-2 sm:pb-3 pt-2 sm:pt-3">
                  <ContentParagraph className="text-base sm:text-lg mb-0 text-justify">
                    Builder, specializing in full-stack architecture and AI integration. Driven by a love for clean code, minimalist design, and building the next generation of intelligent web applications.
                  </ContentParagraph>
                </ContentSection>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-3" />
              </Reveal>

              {/* Experience Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-8 px-4 py-0.5">
                  <h2 className="text-base sm:text-xl mb-1 opacity-20 mt-2 sm:mt-3 font-[family-name:var(--font-hk-grotesk)]">Experience</h2>
                  <div>
                    <ExperienceContent />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-2 sm:mt-3" />
              </Reveal>

              {/* Projects */}
              <Reveal delay={0.1}>
                <div className="sm:px-8 px-4 py-1.5">
                  <div className="mb-3 sm:mb-4 mt-3 sm:mt-4">
                    <h2 className="text-base sm:text-xl opacity-20 font-[family-name:var(--font-hk-grotesk)]">Projects</h2>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 group">
                      {projects.slice(0, 2).map((project) => (
                        <MasonryProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 sm:mt-5 mb-3 sm:mb-4">
                    <Link href="/projects">
                      <NeumorphButton className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white">
                        <span>View All</span>
                        <span>→</span>
                      </NeumorphButton>
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Thoughts Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-8 px-4 py-1.5">
                  <div className="mb-3 sm:mb-4 mt-3 sm:mt-4">
                    <h2 className="text-base sm:text-xl opacity-20 font-[family-name:var(--font-hk-grotesk)]">Blog Posts</h2>
                  </div>
                  <div>
                    <BlogMagazineCarousel blogs={blogs} />
                  </div>
                  <div className="flex justify-center mt-4 sm:mt-5 mb-3 sm:mb-4">
                    <Link href="/blogs">
                      <NeumorphButton className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white">
                        <span>View All</span>
                        <span>→</span>
                      </NeumorphButton>
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Sponsors section removed as requested */}

              {/* GitHub Contributions */}
              <Reveal delay={0.1}>
                <div className="sm:px-8 px-4 mt-3">
                  <h2 className="text-base font-[family-name:var(--font-hk-grotesk)] sm:text-xl leading-relaxed -tracking-[0.01em] mb-3">
                    <span className="opacity-20">GitHub Contributions</span>{" "}
                    <span className="text-emerald-400 animate-blink">●</span>{" "}
                    <span className="text-emerald-400">@codewyuu</span>
                  </h2>
                  <div className="mb-3 sm:mb-4">
                    <ContributionsDisplay
                      username="codewyuu"
                      variant="compact"
                      className="w-full"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* techstack */}
              <Reveal delay={0.1}>
                <div className="sm:px-8 px-4 mt-3 sm:mt-4 mb-3 sm:mb-4">
                  <TechStackPills />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* call to action*/}
              <Reveal delay={0.1}>
                <div className="sm:px-8 px-4 mb-3 sm:mb-4">
                  <CallToAction />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-1 sm:mt-2 pt-0" />
              </Reveal>

              {/* Footer Credits */}
              <Reveal delay={0.1}>
                <FooterCredits />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
