"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "motion/react";

export type DecryptedTextProps = {
  text?: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "click";
  clickMode?: "toggle" | "once";
};

export function DecryptedText({
  text = "MADHAV SEVAK",
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+0123456789",
  className = "",
  parentClassName = "inline-block whitespace-nowrap",
  encryptedClassName = "opacity-70 font-mono",
  animateOn = "view",
  clickMode = "once",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");

  const containerRef = useRef<HTMLSpanElement | null>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  const computeOrder = useCallback(
    (len: number) => {
      const order: number[] = [];
      if (len <= 0) return order;
      if (revealDirection === "start") {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === "end") {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set<number>();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAnimation = useCallback(
    (dir: "forward" | "reverse" = "forward") => {
      clearTimer();
      setIsAnimating(true);
      orderRef.current = computeOrder(text.length);

      if (dir === "forward") {
        pointerRef.current = 0;
        setRevealedIndices(new Set());
      } else {
        pointerRef.current = text.length;
        setRevealedIndices(fillAllIndices());
      }

      let iteration = 0;

      intervalRef.current = setInterval(() => {
        if (dir === "forward") {
          if (sequential) {
            setRevealedIndices((prev) => {
              const next = new Set(prev);
              if (pointerRef.current < orderRef.current.length) {
                next.add(orderRef.current[pointerRef.current]);
                pointerRef.current++;
              }
              setDisplayText(shuffleText(text, next));
              return next;
            });
            if (pointerRef.current >= text.length) {
              clearTimer();
              setIsAnimating(false);
              setDisplayText(text);
              setIsDecrypted(true);
              setHasAnimated(true);
            }
          } else {
            iteration++;
            setDisplayText(shuffleText(text, new Set()));
            if (iteration >= maxIterations) {
              clearTimer();
              setIsAnimating(false);
              setDisplayText(text);
              setIsDecrypted(true);
              setHasAnimated(true);
            }
          }
        }
      }, speed);
    },
    [computeOrder, text, fillAllIndices, sequential, shuffleText, maxIterations, speed]
  );

  useEffect(() => {
    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              startAnimation("forward");
            }
          });
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      return () => {
        observer.disconnect();
        clearTimer();
      };
    }
    return () => clearTimer();
  }, [animateOn, hasAnimated, startAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" || animateOn === "view") {
      startAnimation("forward");
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={parentClassName}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed =
            revealedIndices.has(index) ||
            (!isAnimating && isDecrypted) ||
            char === " ";
          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
