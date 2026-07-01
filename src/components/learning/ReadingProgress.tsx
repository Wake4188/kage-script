"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const update = () => {
      const top = window.scrollY;
      const windowHeight = window.innerHeight;
      const { top: elTop, height } = element.getBoundingClientRect();
      const elementTop = top + elTop;
      const total = Math.max(height - windowHeight, 1);
      const percent = Math.min(100, Math.max(0, ((top - elementTop + windowHeight) / total) * 100));
      setProgress(percent);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return <Progress value={Math.round(progress)} className="mb-6" />;
}
