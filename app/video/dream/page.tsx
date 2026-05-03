"use client";

import { Stage, useScene } from "@/components/video/Stage";
import {
  DreamScene,
  DREAM_BACKGROUND,
  DREAM_DURATION_MS,
} from "@/components/video/scenes/DreamScene";

export default function DreamPage() {
  return (
    <Stage background="#FFFFFF" durationMs={DREAM_DURATION_MS}>
      <DreamFromClock />
    </Stage>
  );
}

function DreamFromClock() {
  const { elapsedMs } = useScene();
  return <DreamScene t={elapsedMs / 1000} />;
}
