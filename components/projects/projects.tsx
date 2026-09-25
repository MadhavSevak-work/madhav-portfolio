import {
  ArrowRight,
  Bot,
  Compass,
  ExternalLink,
  Layers,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

export type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  beforeImage?: string;
  href?: string;
  videoSrc?: string;
};

const PROJECTS: Project[] = [
  {
    id: "framemind-ai",
    icon: Bot,
    iconLabel: "AI / Multimodal",
    title: "FrameMind AI — Intelligent Cinematography Expert System",
    description:
      "A Rule-Based Expert System acting as an artificial Director of Photography, advising on shot composition, lighting rules, and camera angles.",
    meta: "JavaScript, Expert Systems, AI • 2025",
    imageRatio: 16 / 10,
    image: "/framemind ai.png",
    imageAlt: "FrameMind AI Project Screenshot",
    href: "https://frame-mind-ai.vercel.app/",
  },
  {
    id: "hospital-management",
    icon: Layers,
    iconLabel: "C++ Systems",
    title: "Hospital Management System",
    description:
      "A high-performance terminal software focusing on clean OOP principles, secure medical records management, and DSA architecture.",
    meta: "C++17, OOP, DSA Architecture • 2024",
    imageRatio: 16 / 10,
    image: "/hospitalmaagement.png",
    imageAlt: "Hospital Management System Screenshot",
    href: "https://hms-project-ocofic7gj-madhav-sevaks-projects.vercel.app/",
  },
  {
    id: "photobooth",
    icon: Sparkles,
    iconLabel: "Web Experience",
    title: "Interactive Photobooth Platform",
    description:
      "An interactive web application featuring real-time photo filters, camera canvas integration, and instant digital print layouts.",
    meta: "HTML5, CSS3, JavaScript, Canvas API • 2024",
    imageRatio: 16 / 10,
    image: "/photobooth.png",
    imageAlt: "Photobooth Platform Screenshot",
    href: "https://photobooth-madhav.vercel.app",
  },
  {
    id: "schedule-manager",
    icon: Compass,
    iconLabel: "Productivity",
    title: "Schedule & Task Manager",
    description:
      "A responsive web application to seamlessly organize, track, and prioritize daily tasks and academic commitments.",
    meta: "HTML5, CSS3, JavaScript • 2024",
    imageRatio: 16 / 10,
    image: "/schedule manager.png",
    imageAlt: "Schedule Manager Screenshot",
    href: "https://schedule-manager-two.vercel.app",
  },
  {
    id: "headphones-3d",
    icon: Wand2,
    iconLabel: "3D Studio / Animation",
    title: "Headphones — Studio Lighting & Animation",
    description:
      "A 3D study in Blender focusing on product-style studio lighting, turntable camera animation, and cinematic physical material presentation.",
    meta: "Blender, Lighting, Camera Animation, Eevee/Cycles",
    imageRatio: 16 / 9,
    image: "/chesspawn_after.png",
    videoSrc: "/HEADPHONES.MP4",
    imageAlt: "Headphones 3D Animation Video",
    href: "https://madhav_sevak.artstation.com/",
  },
  {
    id: "chess-pawn",
    icon: Palette,
    iconLabel: "3D Comparison • Blender",
    title: "Chess Pawn Visualization",
    description:
      "Modeled a detailed chess pawn with precision bevels and custom PBR specular reflection shaders. Drag the slider to compare unrendered model vs final render.",
    meta: "Blender, Subdivision Surface, PBR Materials",
    imageRatio: 1320 / 701,
    image: "/chesspawn_after.png",
    beforeImage: "/chesspawn_before.png",
    imageAlt: "Chess Pawn 3D Render",
    href: "https://madhav_sevak.artstation.com/",
  },
  {
    id: "perfume-bottle",
    icon: Sparkles,
    iconLabel: "3D Comparison • Product",
    title: "Luxury Perfume Bottle",
    description:
      "Glass refraction, liquid caustics, and studio rim lighting. Drag slider to compare pre-render wireframe mesh with the finished raytraced composition.",
    meta: "Blender, Glass Caustics, Product Visualization",
    imageRatio: 769 / 584,
    image: "/perfumebottle_after.png",
    beforeImage: "/perfumebottle_before.png",
    imageAlt: "Perfume Bottle 3D Render",
    href: "https://madhav_sevak.artstation.com/",
  },
  {
    id: "cartoon-bird",
    icon: Wand2,
    iconLabel: "3D Comparison • Character",
    title: "Stylized Cartoon Bird",
    description:
      "Stylized 3D character design showcasing organic sculpting, vibrant materials, and cartoon cell rendering. Drag to compare clay model with final render.",
    meta: "Blender, Character Modeling, Stylized Materials",
    imageRatio: 1343 / 719,
    image: "/CARTOONBIRD_AFTER.png",
    beforeImage: "/CARTOONBIRD_BEFORE.png",
    imageAlt: "Cartoon Bird 3D Model",
    href: "https://madhav_sevak.artstation.com/",
  },
  {
    id: "lowpoly-car",
    icon: Compass,
    iconLabel: "3D Comparison • Environment",
    title: "Low Poly Car Environment",
    description:
      "Atmospheric low-poly 3D environment showcasing hard-surface vehicular modeling and ambient scene lighting. Drag to compare raw model with rendered lighting.",
    meta: "Blender, Low-Poly Hard Surface, Composition",
    imageRatio: 1122 / 597,
    image: "/LOWPOLY_AFTER.png",
    beforeImage: "/LOWPOLY_BEFORE.png",
    imageAlt: "Low Poly Car Environment",
    href: "https://madhav_sevak.artstation.com/",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 6) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Featured Projects & 3D Works
            </h2>
            <p className="max-w-[38ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Software applications, creative engineering systems, and interactive 3D before &amp; after renders.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 shadow-sm"
            >
              View all {PROJECTS.length} projects &amp; 3D renders
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5 transition-all duration-300 hover:border-foreground/20 hover:shadow-xl hover:-translate-y-1">
        <header className="flex items-center justify-between px-1 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground">
              {project.iconLabel}
            </span>
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/45 hover:text-foreground inline-flex items-center gap-1 text-xs font-medium transition-colors"
            >
              {project.beforeImage ? "ArtStation" : "View"} <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner h-full w-full">
            {project.beforeImage ? (
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.image}
                beforeAlt={`${project.title} (Before)`}
                afterAlt={`${project.title} (After)`}
                aspectRatio={project.imageRatio}
              />
            ) : project.videoSrc ? (
              <video
                src={project.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
                priority={index < 2}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-foreground/90 transition-colors"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
