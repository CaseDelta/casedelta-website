"use client";

import { Stage, useScene } from "@/components/video/Stage";
import {
  DemoScene,
  DEMO_BACKGROUND,
  DEMO_DURATION_MS,
} from "@/components/video/scenes/DemoScene";

export default function DemoPage() {
  return (
    <Stage background="#FFFFFF" durationMs={DEMO_DURATION_MS}>
      <DemoFromClock />
    </Stage>
  );
}

function DemoFromClock() {
  const { elapsedMs } = useScene();
  return <DemoScene t={elapsedMs / 1000} />;
}
