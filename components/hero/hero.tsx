import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";
import { DecryptedText } from "@/components/ui/decrypted-text";

const PORTRAIT_SRC = "/profile.jpg";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block whitespace-nowrap">
                <DecryptedText
                  text="MADHAV SEVAK"
                  speed={45}
                  maxIterations={12}
                  sequential
                  revealDirection="start"
                  className="text-foreground font-semibold"
                  encryptedClassName="text-foreground/45 font-mono"
                  animateOn="view"
                />
              </span>
              <span className="block whitespace-nowrap text-foreground/80 text-[2rem] sm:text-[2.5rem] lg:text-[3rem]">
                Creative Engineer
              </span>
            </h1>

            <p className="max-w-[34ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
              Computer Science student at MIT-WPU bridging software engineering, 3D graphics, and responsive web systems.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_SRC}
                  alt="Madhav Sevak portrait"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
