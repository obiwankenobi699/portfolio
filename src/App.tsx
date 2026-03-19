import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import NewHeroSection from '@/components/HomeContent'
import BlogsListClient from '@/components/BlogsListClient'
import BlogPostClient from '@/components/BlogPostClient'
import BlogNotFoundClient from '@/components/BlogNotFoundClient'
import ProjectsListClient from '@/components/ProjectsListClient'
import ProjectDetailClient from '@/components/ProjectDetailClient'
import SponsorsListClient from '@/components/SponsorsListClient'
import ConditionalPageBlur from '@/components/ConditionalPageBlur'
import { ThemeProvider } from '@/components/theme-provider'
import { blogs, getBlogById } from '@/data/blogs'
import { projects, getAllProjects, getProjectById } from '@/data/projects'
import { sponsors } from '@/data/sponsors'

let hasShownHomepageLoader = false

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

const HomePage = () => {
  const [showLanding, setShowLanding] = useState(false)
  const [isLandingClosing, setIsLandingClosing] = useState(false)

  usePageTitle('Yuvraj Sharma')

  useEffect(() => {
    if (hasShownHomepageLoader) {
      return
    }
    hasShownHomepageLoader = true
    setShowLanding(true)
    const closeStartTimer = window.setTimeout(() => {
      setIsLandingClosing(true)
    }, 2250)
    const closeEndTimer = window.setTimeout(() => {
      setShowLanding(false)
      setIsLandingClosing(false)
    }, 2800)
    return () => {
      window.clearTimeout(closeStartTimer)
      window.clearTimeout(closeEndTimer)
    }
  }, [])

  return (
    <div>
      {showLanding && (
        <div
          className={`fixed inset-0 z-[2147483647] bg-black flex items-center justify-center transition-opacity duration-500 ease-out ${isLandingClosing ? 'opacity-0' : 'opacity-100'}`}
        >
          <div
            className={`flex flex-col items-center transition-all duration-500 ease-out ${isLandingClosing ? 'opacity-0 translate-y-2 scale-[0.985]' : 'opacity-100 translate-y-0 scale-100'}`}
          >
            <div className="w-screen aspect-[5120/1080] lg:aspect-[5120/540] overflow-hidden">
              <img src="/leaving.gif" alt="Landing intro" className="w-full h-full object-cover lg:object-[center_60%]" />
            </div>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot delay-1" />
              <span className="typing-dot delay-2" />
            </div>
          </div>
        </div>
      )}
      <NewHeroSection />
      <style>
        {`
          .typing-dot {
            width: 5px;
            height: 5px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.88);
            animation: typingPulse 1.2s ease-in-out infinite;
          }
          .delay-1 {
            animation-delay: 0.2s;
          }
          .delay-2 {
            animation-delay: 0.4s;
          }
          @keyframes typingPulse {
            0%,
            80%,
            100% {
              transform: translateY(0);
              opacity: 0.45;
            }
            40% {
              transform: translateY(-4px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

const BlogsPage = () => {
  usePageTitle('Blog | Yuvraj Sharma')
  return <BlogsListClient blogs={blogs} />
}

const BlogPostPage = () => {
  const { id } = useParams()
  const blog = id ? getBlogById(id) : undefined
  usePageTitle(blog ? `${blog.title} | Kartik Labhshetwar` : 'Blog Post Not Found')
  if (!blog) {
    return <BlogNotFoundClient />
  }
  return <BlogPostClient blog={blog} />
}

const ProjectsPage = () => {
  usePageTitle('Projects | Yuvraj Sharma')
  return <ProjectsListClient projects={projects} />
}

const ProjectPage = () => {
  const { id } = useParams()
  const project = id ? getProjectById(id) : undefined
  usePageTitle(project ? `${project.title} | Yuvraj Sharma` : 'Project Not Found')
  if (!project) {
    return <Navigate to="/projects" replace />
  }
  return <ProjectDetailClient project={project} allProjects={getAllProjects()} />
}

const SponsorsPage = () => {
  usePageTitle('Sponsors | Kartik Labhshetwar')
  return <SponsorsListClient sponsors={sponsors} />
}

function AppRoutes() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPostPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <ConditionalPageBlur />
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
