"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollCanvasSequenceProps {
  totalFrames?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollCanvasSequence({
  totalFrames = 150,
  containerRef,
}: ScrollCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `/frames/ezgif-frame-${frameNum}.png`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Prefers-reduced-motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    // DPR & High-Resolution Canvas Resizing
    const handleResize = () => {
      if (!canvas || isDisposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      drawFrame(Math.round(currentFrameRef.current));
    };

    // Calculate scroll progress from parent container
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetFrameRef.current = 0;
        return;
      }

      // Progress normalized from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    // Find nearest loaded frame to prevent any blank frames or flicker
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      const clamped = Math.max(0, Math.min(totalFrames - 1, targetIndex));
      if (imagesRef.current[clamped] && isLoadedRef.current[clamped]) {
        return imagesRef.current[clamped];
      }

      // Search outward for closest loaded neighbor
      for (let offset = 1; offset < totalFrames; offset++) {
        const left = clamped - offset;
        const right = clamped + offset;
        if (left >= 0 && imagesRef.current[left] && isLoadedRef.current[left]) {
          return imagesRef.current[left];
        }
        if (right < totalFrames && imagesRef.current[right] && isLoadedRef.current[right]) {
          return imagesRef.current[right];
        }
      }

      return lastDrawnImageRef.current;
    };

    // Render frame to canvas with object-fit: cover aspect ratio
    const drawFrame = (frameIndex: number) => {
      if (!ctx || !canvas) return;

      const img = getBestAvailableImage(frameIndex) || lastDrawnImageRef.current;
      if (!img || !img.naturalWidth || !img.naturalHeight) return;

      lastDrawnImageRef.current = img;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const hRatio = canvasWidth / imgWidth;
      const vRatio = canvasHeight / imgHeight;
      const ratio = Math.max(hRatio, vRatio);

      const renderW = imgWidth * ratio;
      const renderH = imgHeight * ratio;
      const offsetX = (canvasWidth - renderW) / 2;
      const offsetY = (canvasHeight - renderH) / 2;

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    // Continuous Animation Loop with Smooth Lerp Easing
    const renderLoop = () => {
      if (isDisposed) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
      } else {
        const delta = target - current;
        if (Math.abs(delta) > 0.001) {
          currentFrameRef.current += delta * 0.12;
        } else {
          currentFrameRef.current = target;
        }
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      drawFrame(frameToDraw);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Progressive Frame Preloader with Prioritized Keyframes
    const preloadFrames = () => {
      // 1. Immediately load frame 0
      const firstImg = new Image();
      firstImg.src = getFrameUrl(0);
      firstImg.onload = () => {
        if (isDisposed) return;
        imagesRef.current[0] = firstImg;
        isLoadedRef.current[0] = true;
        lastDrawnImageRef.current = firstImg;
        setFirstFrameLoaded(true);
        drawFrame(0);
      };

      // 2. Queue all frames prioritizing spaced keyframes
      const priorityIndices: number[] = [];
      const remainingIndices: number[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (i % 4 === 0) priorityIndices.push(i);
        else remainingIndices.push(i);
      }

      const queue = [...priorityIndices, ...remainingIndices];
      let queueIdx = 0;
      const batchSize = 10;

      const loadNext = () => {
        if (isDisposed || queueIdx >= queue.length) return;

        const idx = queue[queueIdx++];
        if (idx === 0 && isLoadedRef.current[0]) {
          loadNext();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (isDisposed) return;
          imagesRef.current[idx] = img;
          isLoadedRef.current[idx] = true;
          loadNext();
        };
        img.onerror = () => {
          if (isDisposed) return;
          loadNext();
        };
      };

      for (let b = 0; b < batchSize; b++) {
        loadNext();
      }
    };

    handleResize();
    handleScroll();
    preloadFrames();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, [totalFrames, containerRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {/* Instant fallback initial frame before canvas finishes mounting */}
      <img
        src="/frames/ezgif-frame-001.png"
        alt="Hero cinematic background"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          firstFrameLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          firstFrameLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Very subtle edge vignette only at top and bottom edges for seamless navigation and footer legibility */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060814]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060814]/40 to-transparent pointer-events-none" />
    </div>
  );
}
