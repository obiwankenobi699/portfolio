'use client';

import { Project } from '@/types/project'
import Link from "next/link";
import Image from "next/image";
import Video from "next-video";
import { useState } from 'react';
import { Github, Globe } from 'lucide-react';
import donezovideo from '../../videos/donezo.mp4';
import mindMentorVideo from '../../videos/mind-mentor.mp4';
import satyaCheckVideo from '../../videos/satya-check.mp4';
import fleethq from '../../videos/fleethq.mp4';
import rebatr from '../../videos/rebatr-short.mp4';
import lazycommitVideo from '../../videos/lazycommit-video.mp4';
import gocache from '../../videos/gocache.mp4';
import quotick from '../../videos/quotick.mp4'
import doable from '../../videos/doable.mp4';
import screenshot from '../../videos/screenshot-studio.mp4';
import readmelingo from '../../videos/readmelingo.mp4';
import foliox from '../../videos/foliox.mp4';
import mercurius from '../../videos/mercurius.mp4';
import oneurl from '../../videos/oneurl.mp4';
import bettershot from '../../videos/bettershot.mp4';
import linkpreview from '../../videos/linkpreview.mp4';

interface MasonryProjectCardProps {
  project: Project;
  className?: string;
}

const getVideoSource = (videoId: string) => {
  switch (videoId) {
    case 'donezo':
      return donezovideo;
    case 'mind-mentor':
      return mindMentorVideo;
    case 'satya-check':
      return satyaCheckVideo;
    case 'fleethq':
      return fleethq;
    case 'rebatr-short':
      return rebatr;
    case 'lazycommit-video':
      return lazycommitVideo;
    case 'gocache':
      return gocache;
    case 'quotick':
      return quotick;
    case 'doable':
      return doable;
    case 'screenshot':
      return screenshot;
    case 'readmelingo':
      return readmelingo;
    case 'foliox':
      return foliox;
    case 'mercurius':
      return mercurius;
    case 'oneurl':
      return oneurl;
    case 'bettershot':
      return bettershot;
    case 'linkpreview':
      return linkpreview;
    default:
      return null;
  }
};

export const MasonryProjectCard = ({ project, className = "" }: MasonryProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoSource = project.video ? getVideoSource(project.video) : null;
  const useContainFit = project.id === 'hawkwatch' || project.id === 'vakeel-ai';

  const handleOpen = (e: React.MouseEvent, url?: string) => {
    if (!url) return;
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group/item block w-full touch-manipulation"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100 group-has-hover:group-hover/item:border-black/20 group-has-hover:group-hover/item:dark:border-white/10 group-has-hover:group-hover/item:scale-[1.02] group-has-hover:group-hover/item:shadow-lg group-has-hover:group-hover/item:shadow-black/5 dark:group-has-hover:group-hover/item:shadow-black/20 ${className}`}
      >
        <div className="relative overflow-hidden rounded-md w-full aspect-4/3 bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 transition-all duration-300 group-has-hover:group-hover/item:border-black/10 dark:group-has-hover:group-hover/item:border-white/10">
          {videoSource && isHovered ? (
            <Video
              key={project.id}
              src={videoSource}
              poster={project.image}
              className="w-full h-full rounded-md object-cover transition-transform duration-300 group-has-hover:group-hover/item:scale-105"
              playsInline
              autoPlay
              muted
              loop
              controls={false}
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} project cover`}
              width={1200}
              height={900}
              className={`rounded-md w-full h-full transition-transform duration-300 group-has-hover:group-hover/item:scale-105 ${useContainFit ? 'object-contain bg-black/70 p-1.5' : 'object-cover'}`}
              style={{ color: 'transparent' }}
              sizes="(max-width: 640px) 384px, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 317px"
              quality={75}
              loading="lazy"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-md transition-transform duration-300 group-has-hover:group-hover/item:scale-105" />
          )}
        </div>

        <div className="w-full px-2 pb-2 sm:pb-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-[15px] leading-5 sm:leading-7 text-black/80 group-has-hover:hover:text-black dark:text-white/80 dark:group-has-hover:hover:text-white font-medium transition-colors duration-300">
              {project.title}
            </span>
            {(project.githubLink || project.liveLink) && (
              <span className="inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                {project.githubLink && (
                  <button
                    onClick={(e) => handleOpen(e, project.githubLink)}
                    aria-label="Open GitHub"
                    className="p-0 m-0 bg-transparent hover:opacity-80 transition-opacity"
                  >
                    <Github className="w-4 h-4" />
                  </button>
                )}
                {project.liveLink && (
                  <button
                    onClick={(e) => handleOpen(e, project.liveLink)}
                    aria-label="Open Live Site"
                    className="p-0 m-0 bg-transparent hover:opacity-80 transition-opacity"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
