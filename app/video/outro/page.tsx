"use client";

import { Stage, useScene } from "@/components/video/Stage";
import {
  OutroScene,
  OUTRO_BACKGROUND,
  OUTRO_DURATION_MS,
} from "@/components/video/scenes/OutroScene";

export default function OutroPage() {
  return (
    <Stage background="#FFFFFF" durationMs={OUTRO_DURATION_MS}>
      <OutroFromClock />
    </Stage>
  );
}

function OutroFromClock() {
  const { elapsedMs } = useScene();
  return <OutroScene t={elapsedMs / 1000} />;
}
