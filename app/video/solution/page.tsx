"use client";

import { Stage, useScene } from "@/components/video/Stage";
import {
  SolutionScene,
  SOLUTION_BACKGROUND,
  SOLUTION_DURATION_MS,
} from "@/components/video/scenes/SolutionScene";

export default function SolutionPage() {
  return (
    <Stage background="#FFFFFF" durationMs={SOLUTION_DURATION_MS}>
      <SolutionFromClock />
    </Stage>
  );
}

function SolutionFromClock() {
  const { elapsedMs } = useScene();
  return <SolutionScene t={elapsedMs / 1000} />;
}
