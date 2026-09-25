"use client";

import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

export type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspectRatio?: number;
  initialPosition?: number;
  className?: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before Render",
  afterAlt = "After Render",
  aspectRatio = 1,
  initialPosition = 50,
  className = "",
}: BeforeAfterSliderProps): ReactNode {
  const [sliderPos, setSliderPos] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`group/slider relative w-full overflow-hidden select-none cursor-ew-resize touch-none ${className}`}
      style={{ aspectRatio }}
    >
      {/* After Image (Background / Base) */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
          className="object-cover pointer-events-none"
          priority={false}
        />
      </div>

      {/* Before Image (Clipped Overlay) */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
          className="object-cover pointer-events-none"
          priority={false}
        />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 pointer-events-none z-10">
        <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md shadow-sm transition-opacity duration-200">
          Before
        </span>
      </div>
      <div className="absolute top-3 right-3 pointer-events-none z-10">
        <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md shadow-sm transition-opacity duration-200">
          After
        </span>
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.6)] pointer-events-none z-20"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/95 text-neutral-900 shadow-xl backdrop-blur-sm transition-transform duration-150 group-hover/slider:scale-110 active:scale-95">
          <ChevronsLeftRight className="h-4 w-4" strokeWidth={2.5} />
        </div>
      </div>

      {/* Drag Hint on Hover */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
        <span className="rounded-full border border-white/10 bg-black/65 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md shadow-md">
          Drag to compare
        </span>
      </div>
    </div>
  );
}
